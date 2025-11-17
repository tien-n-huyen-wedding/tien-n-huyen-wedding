'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { albums } from '@/lib/galleryAlbums';
import { Photo } from '@/lib/galleryAlbums';
import SlideshowLoadingOverlay from '@/components/slideshow/SlideshowLoadingOverlay';
import SlideshowImageLayer from '@/components/slideshow/SlideshowImageLayer';
import SlideshowTopBar from '@/components/slideshow/SlideshowTopBar';
import SlideshowSideControls from '@/components/slideshow/SlideshowSideControls';
import SlideshowPlayButton from '@/components/slideshow/SlideshowPlayButton';
import SlideshowBottomBarToggle from '@/components/slideshow/SlideshowBottomBarToggle';
import SlideshowThumbnailStrip from '@/components/slideshow/SlideshowThumbnailStrip';

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
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(true);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const hideControlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideControlsTimeout = useCallback(() => {
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
      hideControlsTimeoutRef.current = null;
    }
  }, []);

  const scheduleHideControls = useCallback(() => {
    clearHideControlsTimeout();
    hideControlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  }, [clearHideControlsTimeout]);

  const handleUserInteraction = useCallback(() => {
    setShowControls(true);
    scheduleHideControls();
  }, [scheduleHideControls]);

  const handleMouseLeave = useCallback(() => {
    clearHideControlsTimeout();
    setShowControls(false);
  }, [clearHideControlsTimeout]);

  useEffect(() => {
    scheduleHideControls();
    return () => {
      clearHideControlsTimeout();
    };
  }, [scheduleHideControls, clearHideControlsTimeout]);

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

  // Load all images with progress tracking
  useEffect(() => {
    if (allPhotos.length === 0) return;

    setLoadedImages(new Set());
    setLoadingProgress(0);
    setShowLoadingOverlay(true);
    setIsLoaded(false);
    setIsPlaying(false);

    let loadedCount = 0;
    const totalImages = allPhotos.length;
    const minVisibleCount = Math.min(5, totalImages);
    let hasStartedPlayback = false;
    let cancelled = false;

    const imagePromises = allPhotos.map((photo, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = photo.src;

        img.onload = () => {
          if (cancelled) return;
          loadedCount++;
          setLoadedImages((prev) => new Set([...prev, index]));
          setLoadingProgress(Math.round((loadedCount / totalImages) * 100));

          if (!hasStartedPlayback && loadedCount >= minVisibleCount) {
            hasStartedPlayback = true;
            setShowLoadingOverlay(false);
            setIsPlaying(true);
          }
          resolve(true);
        };

        img.onerror = () => {
          if (cancelled) return;
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalImages) * 100));

          if (!hasStartedPlayback && loadedCount >= minVisibleCount) {
            hasStartedPlayback = true;
            setShowLoadingOverlay(false);
            setIsPlaying(true);
          }
          resolve(false);
        };
      });
    });

    Promise.all(imagePromises).then(() => {
      if (cancelled) return;
      setIsLoaded(true);
      setShowLoadingOverlay(false);
      if (!hasStartedPlayback) {
        setIsPlaying(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [allPhotos]);

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
    handleUserInteraction();
  }, [isPlaying, handleUserInteraction]);

  const goToImage = useCallback((index: number) => {
    setCurrentImageIndex(index);
    const randomEffect = transitionEffects[Math.floor(Math.random() * transitionEffects.length)];
    setTransitionEffect(randomEffect);
    handleUserInteraction();
  }, [handleUserInteraction]);

  const toggleBottomBar = useCallback(() => {
    setShowBottomBar((prev) => !prev);
    handleUserInteraction();
  }, [handleUserInteraction]);

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

  return (
    <div
      className="slideshow-container"
      onMouseMove={handleUserInteraction}
      onMouseLeave={handleMouseLeave}
    >
      <SlideshowLoadingOverlay
        visible={showLoadingOverlay}
        loadingProgress={loadingProgress}
        loadedCount={loadedImages.size}
        totalCount={allPhotos.length}
      />

      <SlideshowImageLayer
        photos={allPhotos}
        currentIndex={currentImageIndex}
        transitionEffect={transitionEffect}
        loadedImages={loadedImages}
      />

      {/* Controls Overlay - Top and Center */}
      <div className={`controls-overlay ${showControls ? 'visible' : ''}`}>
        <SlideshowTopBar
          onClose={() => router.back()}
          current={currentImageIndex + 1}
          total={allPhotos.length}
        />

        <SlideshowSideControls
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      </div>

      <SlideshowPlayButton
        isPlaying={isPlaying}
        onToggle={togglePlayPause}
        visible={showControls}
      />

      <SlideshowBottomBarToggle
        showBottomBar={showBottomBar}
        onToggle={toggleBottomBar}
        visible={showControls}
      />

      <SlideshowThumbnailStrip
        photos={allPhotos}
        currentIndex={currentImageIndex}
        loadedImages={loadedImages}
        showBottomBar={showBottomBar}
        onSelect={goToImage}
      />

      <style jsx global>{`
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

        .side-controls {
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          transform: translateY(-50%);
          display: flex;
          justify-content: space-between;
          padding: 0 40px;
          pointer-events: none;
        }

        .nav-button.side {
          pointer-events: auto;
          background: rgba(0, 0, 0, 0.5);
          border: 2px solid rgba(255, 255, 255, 0.6);
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
          transition: opacity 0.3s ease, transform 0.3s ease;
        }

        .bottom-bar.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .bottom-bar.hidden {
          opacity: 0;
          visibility: hidden;
          transform: translateY(40px);
          pointer-events: none;
        }

        .bottom-play-button {
          position: absolute;
          bottom: 100px;
          left: 50%;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.7);
          background: rgba(0, 0, 0, 0.6);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 250;
          opacity: 0;
          pointer-events: none;
          transform: translate(-50%, 20px);
          transition:
            opacity 0.3s ease,
            transform 0.3s ease,
            background 0.3s ease,
            border 0.3s ease;
        }

        .bottom-play-button.visible {
          opacity: 1;
          pointer-events: auto;
          transform: translate(-50%, 0);
        }

        .bottom-play-button.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .bottom-play-button.visible:hover {
          background: rgba(0, 0, 0, 0.8);
          border-color: white;
        }

        .bottom-bar-toggle {
          position: absolute;
          bottom: 30px;
          right: 30px;
          padding: 12px 18px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          background: rgba(0, 0, 0, 0.5);
          color: white;
          font-size: 14px;
          letter-spacing: 0.5px;
          cursor: pointer;
          z-index: 250;
          opacity: 0;
          pointer-events: none;
          transform: translateY(20px);
          transition:
            opacity 0.3s ease,
            transform 0.3s ease,
            background 0.3s ease,
            border 0.3s ease;
        }

        .bottom-bar-toggle.visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }

        .bottom-bar-toggle.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .bottom-bar-toggle.visible:hover {
          background: rgba(0, 0, 0, 0.7);
          border-color: white;
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
          position: relative;
          overflow: hidden;
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

        .image-loading-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: white;
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .image-loading-indicator span {
          font-size: 11px;
          opacity: 0.8;
        }

        .thumbnail-loader {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.4);
        }

        @media screen and (max-width: 768px) {
          .top-bar {
            padding: 15px 20px;
          }

          .side-controls {
            padding: 0 15px;
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

