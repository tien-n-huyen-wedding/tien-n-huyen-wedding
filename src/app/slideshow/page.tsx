'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { albums } from '@/lib/galleryAlbums';
import { Photo } from '@/lib/galleryAlbums';

// Random transition effects
const transitionEffects = [
  'fade',
  'slide-left',
  'slide-right',
  'zoom-in',
  'zoom-out',
  'slide-up',
  'slide-down',
];

export default function SlideshowPage() {
  const router = useRouter();
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [transitionEffect, setTransitionEffect] = useState('fade');
  const [showControls, setShowControls] = useState(true);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [isLoadingBatch, setIsLoadingBatch] = useState(false);
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(true);
  const BATCH_SIZE = 5;

  // Collect all photos from all albums (excluding thumbnails)
  useEffect(() => {
    const photos: Photo[] = [];
    albums.forEach(album => {
      album.photos.forEach(photo => {
        // Skip thumbnail images
        if (!photo.src.includes('thumbnail')) {
          photos.push(photo);
        }
      });
    });
    setAllPhotos(photos);
  }, []);

  // Load images in batches of 5
  useEffect(() => {
    if (allPhotos.length === 0) return;

    const loadBatch = async (batchIndex: number) => {
      setIsLoadingBatch(true);
      const startIndex = batchIndex * BATCH_SIZE;
      const endIndex = Math.min(startIndex + BATCH_SIZE, allPhotos.length);

      if (startIndex >= allPhotos.length) {
        setIsLoadingBatch(false);
        setIsLoaded(true);
        return;
      }

      const batchPromises = [];
      for (let i = startIndex; i < endIndex; i++) {
        const promise = new Promise<boolean>((resolve) => {
          const img = new Image();
          // Use high quality original images (not optimized)
          img.src = allPhotos[i].src;

          img.onload = () => {
            setLoadedImages((prev) => new Set([...prev, i]));
            resolve(true);
          };

          img.onerror = () => {
            resolve(false);
          };
        });
        batchPromises.push(promise);
      }

      await Promise.all(batchPromises);

      // Update progress
      const totalLoaded = Math.min(endIndex, allPhotos.length);
      setLoadingProgress(Math.round((totalLoaded / allPhotos.length) * 100));

      setIsLoadingBatch(false);

      // Auto-start slideshow after first batch is loaded
      if (batchIndex === 0 && totalLoaded > 0) {
        setIsPlaying(true);
        setShowLoadingOverlay(false); // Hide loading overlay to start slideshow
      }

      // Continue loading next batch after a short delay
      if (endIndex < allPhotos.length) {
        setTimeout(() => {
          setCurrentBatch(batchIndex + 1);
        }, 500);
      } else {
        setIsLoaded(true);
        setShowLoadingOverlay(false); // Hide overlay when all images are loaded
      }
    };

    loadBatch(currentBatch);
  }, [allPhotos, currentBatch]);

  // Auto-advance slideshow - only advance to loaded images
  useEffect(() => {
    if (!isPlaying || allPhotos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        // Find next loaded image
        let nextIndex = (prevIndex + 1) % allPhotos.length;
        let attempts = 0;
        const maxAttempts = allPhotos.length;

        // Skip unloaded images
        while (!loadedImages.has(nextIndex) && attempts < maxAttempts) {
          nextIndex = (nextIndex + 1) % allPhotos.length;
          attempts++;
        }

        // If we found a loaded image, advance
        if (loadedImages.has(nextIndex)) {
          const randomEffect = transitionEffects[Math.floor(Math.random() * transitionEffects.length)];
          setTransitionEffect(randomEffect);
          return nextIndex;
        }

        // If no loaded images found, stay on current
        return prevIndex;
      });
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isPlaying, allPhotos.length, loadedImages]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => {
      // Find next loaded image
      let nextIndex = (prev + 1) % allPhotos.length;
      let attempts = 0;
      const maxAttempts = allPhotos.length;

      while (!loadedImages.has(nextIndex) && attempts < maxAttempts) {
        nextIndex = (nextIndex + 1) % allPhotos.length;
        attempts++;
      }

      if (loadedImages.has(nextIndex)) {
        const randomEffect = transitionEffects[Math.floor(Math.random() * transitionEffects.length)];
        setTransitionEffect(randomEffect);
        return nextIndex;
      }
      return prev;
    });
  }, [allPhotos.length, loadedImages]);

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) => {
      // Find previous loaded image
      let prevIndex = (prev - 1 + allPhotos.length) % allPhotos.length;
      let attempts = 0;
      const maxAttempts = allPhotos.length;

      while (!loadedImages.has(prevIndex) && attempts < maxAttempts) {
        prevIndex = (prevIndex - 1 + allPhotos.length) % allPhotos.length;
        attempts++;
      }

      if (loadedImages.has(prevIndex)) {
        const randomEffect = transitionEffects[Math.floor(Math.random() * transitionEffects.length)];
        setTransitionEffect(randomEffect);
        return prevIndex;
      }
      return prev;
    });
  }, [allPhotos.length, loadedImages]);

  const togglePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index);
    const randomEffect = transitionEffects[Math.floor(Math.random() * transitionEffects.length)];
    setTransitionEffect(randomEffect);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === 'Escape') {
        router.back();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToNext, goToPrevious, togglePlayPause, router]);

  if (allPhotos.length === 0) {
    return (
      <div className="slideshow-container">
        <div className="loading-screen">
          <div className="spinner"></div>
          <p>Loading gallery...</p>
        </div>
      </div>
    );
  }

  const currentPhoto = allPhotos[currentImageIndex];

  return (
    <div
      className="slideshow-container"
      onMouseMove={() => setShowControls(true)}
      onMouseLeave={() => setTimeout(() => setShowControls(false), 3000)}
    >
      {/* Loading Screen - Show only until first batch is loaded */}
      {showLoadingOverlay && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeDasharray="60" strokeDashoffset="15" opacity="0.3"/>
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeDasharray="60" strokeDashoffset="15" className="spinner-circle"/>
              </svg>
            </div>
            <div className="loading-text">
              <h2>Loading High Quality Images</h2>
              <p className="loading-percentage">{loadingProgress}%</p>
              <div className="loading-bar">
                <div className="loading-bar-fill" style={{ width: `${loadingProgress}%` }}></div>
              </div>
              <p className="loading-count">
                {loadedImages.size} / {allPhotos.length} images loaded
              </p>
              {isLoadingBatch && (
                <p className="loading-batch">
                  Loading batch {Math.floor(currentBatch) + 1} ({Math.min((currentBatch + 1) * BATCH_SIZE, allPhotos.length)} / {allPhotos.length})
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Slideshow Images */}
      <div className="slideshow-images">
        {allPhotos.map((photo, index) => (
          <div
            key={index}
            className={`slideshow-image ${index === currentImageIndex ? 'active' : ''} effect-${transitionEffect}`}
            style={{
              backgroundImage: `url(${photo.src})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#000',
            }}
          />
        ))}
      </div>

      {/* Controls Overlay - Top and Center */}
      <div className={`controls-overlay ${showControls ? 'visible' : ''}`}>
        {/* Top Bar */}
        <div className="top-bar">
          <button
            className="close-button"
            onClick={() => router.back()}
            aria-label="Close slideshow"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="image-counter">
            {currentImageIndex + 1} / {allPhotos.length}
          </div>
        </div>

        {/* Center Controls */}
        <div className="center-controls">
          <button
            className="nav-button prev-button"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="play-pause-button"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="5" width="4" height="14" fill="white" rx="1"/>
                <rect x="14" y="5" width="4" height="14" fill="white" rx="1"/>
              </svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M8 5v14l11-7z" fill="white"/>
              </svg>
            )}
          </button>
          <button
            className="nav-button next-button"
            onClick={goToNext}
            aria-label="Next image"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Bar - Thumbnail Strip - Always Visible */}
      <div className="bottom-bar always-visible">
        <div className="thumbnail-strip">
          {allPhotos.map((photo, index) => (
            <button
              key={index}
              className={`thumbnail ${index === currentImageIndex ? 'active' : ''} ${!loadedImages.has(index) ? 'loading' : ''}`}
              onClick={() => goToImage(index)}
              style={{
                backgroundImage: `url(${photo.src})`,
              }}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .slideshow-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #000;
          overflow: hidden;
          z-index: 9999;
        }

        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }

        .loading-content {
          text-align: center;
          color: white;
        }

        .loading-spinner {
          margin-bottom: 30px;
        }

        .spinner-circle {
          animation: spin 1s linear infinite;
          transform-origin: center;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .loading-text h2 {
          font-size: 24px;
          margin-bottom: 20px;
          font-weight: 300;
          letter-spacing: 2px;
        }

        .loading-percentage {
          font-size: 48px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .loading-bar {
          width: 400px;
          max-width: 80vw;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
          margin: 0 auto 15px;
        }

        .loading-bar-fill {
          height: 100%;
          background: white;
          transition: width 0.3s ease;
        }

        .loading-count {
          font-size: 14px;
          opacity: 0.7;
        }

        .slideshow-images {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .slideshow-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          will-change: transform, opacity;
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        .slideshow-image.active {
          opacity: 1;
          z-index: 1;
        }

        /* Transition Effects */
        .slideshow-image.effect-fade {
          transition: opacity 1.5s ease-in-out;
        }

        .slideshow-image.effect-slide-left {
          transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(100%);
        }

        .slideshow-image.effect-slide-left.active {
          transform: translateX(0);
        }

        .slideshow-image.effect-slide-right {
          transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-100%);
        }

        .slideshow-image.effect-slide-right.active {
          transform: translateX(0);
        }

        .slideshow-image.effect-zoom-in {
          transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale(1.3);
        }

        .slideshow-image.effect-zoom-in.active {
          transform: scale(1);
        }

        .slideshow-image.effect-zoom-out {
          transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale(0.7);
        }

        .slideshow-image.effect-zoom-out.active {
          transform: scale(1);
        }

        .slideshow-image.effect-slide-up {
          transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(100%);
        }

        .slideshow-image.effect-slide-up.active {
          transform: translateY(0);
        }

        .slideshow-image.effect-slide-down {
          transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(-100%);
        }

        .slideshow-image.effect-slide-down.active {
          transform: translateY(0);
        }

        /* Controls */
        .controls-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 100;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .controls-overlay.visible {
          opacity: 1;
        }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 40px;
          pointer-events: auto;
        }

        .close-button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.5);
          border: 2px solid rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .close-button:hover {
          background: rgba(0, 0, 0, 0.7);
          border-color: white;
          transform: scale(1.1);
        }

        .image-counter {
          color: white;
          font-size: 16px;
          font-weight: 500;
          background: rgba(0, 0, 0, 0.5);
          padding: 8px 16px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        .center-controls {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          gap: 30px;
          pointer-events: auto;
        }

        .nav-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.5);
          border: 2px solid rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .nav-button:hover {
          background: rgba(0, 0, 0, 0.7);
          border-color: white;
          transform: scale(1.1);
        }

        .play-pause-button {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.6);
          border: 3px solid rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .play-pause-button:hover {
          background: rgba(0, 0, 0, 0.8);
          border-color: white;
          transform: scale(1.1);
        }

        .bottom-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 20px;
          pointer-events: auto;
          z-index: 200;
        }

        .bottom-bar.always-visible {
          opacity: 1 !important;
          visibility: visible !important;
        }

        .thumbnail-strip {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          padding: 10px;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 10px;
          backdrop-filter: blur(10px);
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }

        .thumbnail-strip::-webkit-scrollbar {
          height: 6px;
        }

        .thumbnail-strip::-webkit-scrollbar-track {
          background: transparent;
        }

        .thumbnail-strip::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }

        .thumbnail {
          min-width: 80px;
          width: 80px;
          height: 80px;
          border-radius: 6px;
          border: 2px solid transparent;
          background-size: cover;
          background-position: center;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0.6;
        }

        .thumbnail:hover {
          opacity: 1;
          transform: scale(1.1);
        }

        .thumbnail.active {
          border-color: white;
          opacity: 1;
          transform: scale(1.15);
        }

        .thumbnail.loading {
          opacity: 0.3;
          cursor: wait;
        }

        @media screen and (max-width: 768px) {
          .top-bar {
            padding: 15px 20px;
          }

          .center-controls {
            gap: 20px;
          }

          .nav-button {
            width: 50px;
            height: 50px;
          }

          .play-pause-button {
            width: 70px;
            height: 70px;
          }

          .thumbnail {
            min-width: 60px;
            width: 60px;
            height: 60px;
          }

          .loading-bar {
            width: 300px;
          }

          .loading-percentage {
            font-size: 36px;
          }
        }
      `}</style>
    </div>
  );
}

