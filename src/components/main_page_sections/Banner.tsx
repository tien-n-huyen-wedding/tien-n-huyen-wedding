import Countdown from "../Countdown";
import { MAIN_WEDDING_PARTY_INFO } from "@/utils/constants";
import { useState, useEffect } from "react";

// Slideshow images - selecting beautiful photos from gallery
const slideshowImages = [
  "/images/gallery/OUTDOOR/TOM04374-2.jpg",
  "/images/gallery/OUTDOOR/TOM04399-3.jpg",
  "/images/gallery/OUTDOOR/TOM04630-4.jpg",
  "/images/gallery/OUTDOOR/TOM04827-9.jpg",
  "/images/gallery/STUDIO/TMN_8809-32.jpg",
  "/images/gallery/STUDIO/TMN_9000-34.jpg",
  "/images/gallery/STUDIO/TOM03826-8.jpg",
  "/images/gallery/COFFEE/NOR_6068.JPG",
  "/images/gallery/COFFEE/NOR_6149.JPG",
  "/images/gallery/COFFEE/NOR_6392.JPG",
  "/images/gallery/COFFEE/NOR_6397.JPG",
  "/images/gallery/COFFEE/NOR_6463.JPG",
  "/images/gallery/COFFEE/NOR_6522.JPG",
  "/images/gallery/COFFEE/NOR_6660.JPG",
  "/images/gallery/COFFEE/NOR_6829.JPG",
  "/images/main_background.jpg",
];

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

export default function Banner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(slideshowImages.length - 1); // Start with main_background.jpg
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transitionEffect, setTransitionEffect] = useState('fade');
  const [isMounted, setIsMounted] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [loadingProgress, setLoadingProgress] = useState(0);
  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Preload all images with progress tracking
  useEffect(() => {
    const preloadImages = () => {
      // Create preload links in document head for high priority loading
      slideshowImages.forEach((src, index) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        // First 3 images get highest priority
        if (index < 3) {
          link.fetchPriority = 'high';
        }
        document.head.appendChild(link);
      });

      // Track loading progress with Image objects
      let loadedCount = 0;
      const totalImages = slideshowImages.length;

      const imagePromises = slideshowImages.map((src, index) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;

          img.onload = () => {
            loadedCount++;
            setLoadedImages((prev) => new Set([...prev, index]));
            setLoadingProgress(Math.round((loadedCount / totalImages) * 100));
            resolve(true);
          };

          img.onerror = () => {
            loadedCount++;
            setLoadingProgress(Math.round((loadedCount / totalImages) * 100));
            resolve(false);
          };
        });
      });

      Promise.all(imagePromises).then(() => {
        setIsLoaded(true);
      });
    };

    // Start preloading immediately
    preloadImages();
  }, []);

  // Auto-advance slideshow only when playing, skip unloaded images
  useEffect(() => {
    if (!isLoaded || !isPlaying) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        // Find next loaded image
        let nextIndex = (prevIndex + 1) % slideshowImages.length;
        let attempts = 0;
        const maxAttempts = slideshowImages.length;

        // Skip unloaded images
        while (!loadedImages.has(nextIndex) && attempts < maxAttempts) {
          nextIndex = (nextIndex + 1) % slideshowImages.length;
          attempts++;
        }

        // If we found a loaded image, apply random transition effect
        if (loadedImages.has(nextIndex)) {
          const randomEffect = transitionEffects[Math.floor(Math.random() * transitionEffects.length)];
          setTransitionEffect(randomEffect);
          return nextIndex;
        }

        // If no images are loaded, stay on current
        return prevIndex;
      });
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isLoaded, isPlaying, loadedImages]);

  const togglePlayPause = () => {
    if (!isLoaded) {
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const scrollToInvitation = () => {
    const invitationSection = document.getElementById('fh5co-event');
    if (invitationSection) {
      invitationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="fh5co-header" className="fh5co-cover banner-slideshow" role="banner" data-stellar-background-ratio="0.5">
      {/* Hidden preload images for browser caching */}
      <div style={{ display: 'none' }} aria-hidden="true">
        {slideshowImages.map((src, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={`preload-${index}`} src={src} alt="" />
        ))}
      </div>

      {/* Slideshow backgrounds */}
      <div className="slideshow-container">
        {slideshowImages.map((image, index) => (
          <div
            key={index}
            className={`slideshow-image ${index === currentImageIndex ? 'active' : ''} effect-${transitionEffect}`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        ))}
      </div>

      <div className={`overlay ${isPlaying ? 'overlay-hidden' : ''}`}></div>

      {/* Slideshow indicators */}
      <div className="slideshow-indicators">
        {slideshowImages.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentImageIndex ? 'active' : ''} ${!loadedImages.has(index) ? 'not-loaded' : ''}`}
            onClick={() => {
              if (!loadedImages.has(index)) {
                return;
              }
              const randomEffect = transitionEffects[Math.floor(Math.random() * transitionEffects.length)];
              setTransitionEffect(randomEffect);
              setCurrentImageIndex(index);
            }}
            aria-label={`Go to slide ${index + 1}${!loadedImages.has(index) ? ' (loading...)' : ''}`}
            title={!loadedImages.has(index) ? 'Loading...' : ''}
            disabled={!loadedImages.has(index)}
          />
        ))}
      </div>

      {/* Floating hearts decoration */}
      <div className="floating-hearts">
        <span className="heart heart-1">❤</span>
        <span className="heart heart-2">❤</span>
        <span className="heart heart-3">❤</span>
        <span className="heart heart-4">❤</span>
        <span className="heart heart-5">❤</span>
        <span className="heart heart-6">❤</span>
        <span className="heart heart-7">❤</span>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center">
            <div className={`display-t ${isPlaying ? 'playing-mode' : ''} ${isMounted ? 'mounted' : ''}`}>
              <div className={`display-tc ${isPlaying ? 'compact-mode' : ''} content-visible`}>
                {/* Decorative top element */}
                <div className="banner-decoration-top">
                </div>

                {/* We Are Getting Married */}
                <div className="save-date-badge">
                  <span className="save-date-text">We Are Getting Married</span>
                </div>

                {/* Names with elegant styling */}
                <div className="names-container">
                  <h1 className="tp-lacosta-font groom-name">Quang Tiến</h1>
                  <div className="ampersand-container">
                    <h3 className="tp-lacosta-font ampersand heart-divider">♥</h3>
                  </div>
                  <h1 className="tp-lacosta-font bride-name">Lệ Huyền</h1>
                </div>

                {/* Wedding Date */}
                <div className="wedding-date">
                  <p className="date-text">{MAIN_WEDDING_PARTY_INFO.atStrEng}</p>
                </div>

                {/* Countdown */}
                <div className="countdown-wrapper">
                  <Countdown />
                </div>

                {/* Call to action buttons */}
                <div className="banner-actions">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Play/Pause Button with Loading Indicator */}
      <button
        className={`play-pause-button ${!isLoaded ? 'loading' : ''}`}
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        title={!isLoaded ? `Loading images... ${loadingProgress}%` : ''}
      >
        {!isLoaded ? (
          // Loading Spinner
          <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="spinner">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeDasharray="60" strokeDashoffset="15" opacity="0.3"/>
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeDasharray="60" strokeDashoffset="15" className="spinner-circle"/>
            </svg>
            <span className="loading-text">{loadingProgress}%</span>
          </>
        ) : isPlaying ? (
          // Pause Icon
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="6" y="5" width="4" height="14" fill="white" rx="1"/>
            <rect x="14" y="5" width="4" height="14" fill="white" rx="1"/>
          </svg>
        ) : (
          // Play Icon
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8 5v14l11-7z" fill="white"/>
          </svg>
        )}
      </button>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <p className="scroll-text">Scroll Down</p>
      </div>

      <style jsx>{`
        /* Ensure content is always visible on initial render */
        .display-tc {
          visibility: visible !important;
        }

        .names-container,
        .groom-name,
        .bride-name,
        .wedding-subtitle,
        .wedding-date,
        .date-text,
        .countdown-wrapper {
          visibility: visible !important;
        }

        /* Only override opacity when NOT in compact mode */
        .display-tc:not(.compact-mode) .groom-name,
        .display-tc:not(.compact-mode) .bride-name,
        .display-tc:not(.compact-mode) .wedding-subtitle,
        .display-tc:not(.compact-mode) .date-text,
        .display-tc:not(.compact-mode) .countdown-wrapper {
          opacity: 1 !important;
        }

        /* Countdown specific fixes */
        .countdown-wrapper,
        .countdown-wrapper *,
        :global(.simply-countdown),
        :global(.simply-countdown *),
        :global(.simply-section) {
          visibility: visible !important;
        }

        :global(.simply-amount),
        :global(.simply-word) {
          opacity: 1 !important;
          visibility: visible !important;
        }

        /* Extra specificity for seconds section text */
        :global(.simply-seconds-section) :global(.simply-amount),
        :global(.simply-seconds-section) :global(.simply-word) {
          opacity: 1 !important;
          visibility: visible !important;
        }

        /* Slideshow styles */
        .banner-slideshow {
          position: relative;
          overflow: hidden;
        }

        .slideshow-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }

        /* Overlay transition */
        :global(.overlay) {
          transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        :global(.overlay-hidden) {
          opacity: 0 !important;
        }

        .slideshow-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          will-change: transform, opacity;
          /* GPU acceleration for smooth transitions */
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        .slideshow-image.active {
          opacity: 1;
          z-index: 1;
        }

        /* Fade effect */
        .slideshow-image.effect-fade {
          transition: opacity 1.5s ease-in-out;
        }

        /* Slide left effect */
        .slideshow-image.effect-slide-left {
          transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(100%);
        }

        .slideshow-image.effect-slide-left.active {
          transform: translateX(0);
        }

        /* Slide right effect */
        .slideshow-image.effect-slide-right {
          transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateX(-100%);
        }

        .slideshow-image.effect-slide-right.active {
          transform: translateX(0);
        }

        /* Zoom in effect */
        .slideshow-image.effect-zoom-in {
          transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale(1.3);
        }

        .slideshow-image.effect-zoom-in.active {
          transform: scale(1);
        }

        /* Zoom out effect */
        .slideshow-image.effect-zoom-out {
          transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale(0.7);
        }

        .slideshow-image.effect-zoom-out.active {
          transform: scale(1);
        }

        /* Slide up effect */
        .slideshow-image.effect-slide-up {
          transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(100%);
        }

        .slideshow-image.effect-slide-up.active {
          transform: translateY(0);
        }

        /* Slide down effect */
        .slideshow-image.effect-slide-down {
          transition: all 1.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(-100%);
        }

        .slideshow-image.effect-slide-down.active {
          transform: translateY(0);
        }

        /* Playing mode styles */
        .display-t {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .playing-mode {
          height: 900px !important;
        }

        .compact-mode {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale(0.7);
          transform-origin: bottom center;
          vertical-align: bottom !important;
          padding-bottom: 120px;
        }

        .banner-decoration-top {
          transition: none !important;
        }

        .compact-mode .banner-decoration-top {
          opacity: 0;
          transition: opacity 0.5s ease !important;
        }

        .save-date-badge {
          transition: none !important;
        }

        .compact-mode .save-date-badge {
          opacity: 0;
          transform: translateY(-20px);
          transition: opacity 0.5s ease, transform 0.5s ease !important;
        }

        /* Animated elements with staggered delays */
        .names-container,
        .groom-name,
        .bride-name,
        .heart-divider,
        .ampersand-container,
        .wedding-subtitle,
        .subtitle-text,
        .subtitle-line,
        .wedding-date,
        .date-text,
        .countdown-wrapper,
        .banner-actions {
          transition: none !important;
          animation: none !important;
        }

        /* Remove number animations */
        :global(.simply-amount),
        :global(.simply-word) {
          transition: none !important;
          animation: none !important;
        }

        /* Ensure seconds text is always fully visible */
        :global(.simply-seconds-section .simply-amount),
        :global(.simply-seconds-section .simply-word) {
          opacity: 1 !important;
        }

        .compact-mode .names-container {
          margin: 10px 0;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .compact-mode .groom-name,
        .compact-mode .bride-name {
          font-size: 60px !important;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s !important;
        }

        .compact-mode .heart-divider {
          font-size: 24px;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.15s !important;
        }

        .compact-mode .ampersand-container {
          gap: 15px;
          margin: 5px 0;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.15s !important;
        }

        .compact-mode .wedding-subtitle {
          margin: 10px 0 !important;
          font-size: 14px;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s !important;
        }

        .compact-mode .subtitle-text {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s !important;
        }

        .compact-mode .subtitle-line {
          width: 40px;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s !important;
        }

        .compact-mode .wedding-date {
          margin: 10px 0;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.25s !important;
        }

        .compact-mode .date-text {
          font-size: 16px;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.25s !important;
        }

        .compact-mode .countdown-wrapper {
          margin: 15px 0;
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s !important;
        }

        /* Keep countdown visible in compact mode */
        .compact-mode :global(.simply-amount),
        .compact-mode :global(.simply-word) {
          opacity: 1 !important;
          visibility: visible !important;
          transition: none !important;
        }

        /* Ensure seconds text stays visible in compact mode */
        .compact-mode :global(.simply-seconds-section .simply-amount),
        .compact-mode :global(.simply-seconds-section .simply-word) {
          opacity: 1 !important;
          visibility: visible !important;
        }

        .compact-mode .banner-actions {
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
          transition: opacity 0.4s ease, transform 0.4s ease !important;
        }

        /* Slideshow indicators */
        .slideshow-indicators {
          position: absolute;
          bottom: 80px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 15;
          background: rgba(0, 0, 0, 0.3);
          padding: 6px 12px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        .indicator {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.6);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .indicator:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: scale(1.2);
        }

        .indicator.active {
          background: white;
          border-color: white;
          width: 18px;
          border-radius: 6px;
        }

        /* Not loaded indicator */
        .indicator.not-loaded {
          opacity: 0.3;
          cursor: not-allowed;
          border-color: rgba(255, 255, 255, 0.3);
        }

        .indicator.not-loaded:hover {
          transform: none;
          background: transparent;
        }

        /* Play/Pause Button */
        .play-pause-button {
          position: absolute;
          bottom: 30px;
          left: 40px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.4);
          border: 2px solid rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 15;
          backdrop-filter: blur(10px);
          padding: 0;
        }

        .play-pause-button:hover {
          background: rgba(0, 0, 0, 0.6);
          border-color: white;
          transform: scale(1.1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .play-pause-button:active {
          transform: scale(0.95);
        }

        .play-pause-button svg {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
          transition: all 0.3s ease;
        }

        .play-pause-button:hover svg {
          transform: scale(1.1);
        }

        /* Loading state */
        .play-pause-button.loading {
          cursor: wait;
          background: rgba(0, 0, 0, 0.6);
        }

        .play-pause-button.loading:hover {
          transform: scale(1);
        }

        /* Spinner animation */
        .spinner {
          position: absolute;
        }

        .spinner-circle {
          animation: spin 1s linear infinite;
          transform-origin: center;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Loading percentage text */
        .loading-text {
          position: absolute;
          font-size: 12px;
          font-weight: bold;
          color: white;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        /* Floating hearts animation */
        .floating-hearts {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .heart {
          position: absolute;
          color: rgba(255, 255, 255, 0.3);
          font-size: 20px;
          animation: float-up linear infinite;
        }

        .heart-1 { left: 10%; animation-duration: 15s; animation-delay: 0s; }
        .heart-2 { left: 25%; animation-duration: 18s; animation-delay: 3s; }
        .heart-3 { left: 50%; animation-duration: 20s; animation-delay: 6s; }
        .heart-4 { left: 75%; animation-duration: 16s; animation-delay: 9s; }
        .heart-5 { left: 90%; animation-duration: 22s; animation-delay: 12s; }
        .heart-6 { left: 40%; animation-duration: 19s; animation-delay: 5s; }
        .heart-7 { left: 65%; animation-duration: 17s; animation-delay: 8s; }

        @keyframes float-up {
          0% {
            bottom: -10%;
            opacity: 0;
            transform: translateX(0) rotate(0deg);
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            bottom: 110%;
            opacity: 0;
            transform: translateX(20px) rotate(360deg);
          }
        }

        /* Decorative elements */
        .banner-decoration-top,
        .banner-decoration-bottom {
          margin: 20px auto;
        }

        .decorative-flourish {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        /* Save the Date Badge */
        .save-date-badge {
          margin-bottom: 30px;
        }

        .save-date-text {
          display: inline-block;
          padding: 8px 25px;
          background: transparent;
          // border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 30px;
          color: white;
          font-size: 14px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 500;
          font-family: var(--font-work-sans);
          // backdrop-filter: blur(10px);
        }

        /* Names styling */
        .names-container {
          margin: 30px 0;
        }

        .groom-name,
        .bride-name {
          opacity: 1;
        }

        /* Ampersand with hearts */
        .ampersand-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin: 10px 0;
        }

        .heart-divider {
          font-size: 30px;
          color: rgba(255, 255, 255, 0.8);
        }

        .ampersand {
          margin: 0 !important;
          opacity: 0.9;
        }

        /* Subtitle with lines */
        .wedding-subtitle {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin: 30px 0 !important;
          opacity: 1;
        }

        .subtitle-line {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, white, transparent);
        }

        .subtitle-text {
          font-style: italic;
          letter-spacing: 2px;
          opacity: 1;
        }

        /* Wedding Date */
        .wedding-date {
          margin: 25px 0;
          opacity: 1;
        }

        .date-text {
          color: white;
          font-size: 22px;
          font-weight: 400;
          letter-spacing: 1px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          margin: 0;
          opacity: 1;
        }

        /* Countdown wrapper */
        .countdown-wrapper {
          margin: 35px 0;
          opacity: 1;
        }

        /* Banner actions */
        .banner-actions {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin: 35px 0 20px 0;
          flex-wrap: wrap;
          opacity: 1;
        }

        .btn-elegant {
          padding: 15px 35px !important;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          border: 2px solid white;
          text-decoration: none;
          display: inline-block;
          cursor: pointer;
        }

        .btn-primary {
          background: white !important;
          color: #2E8B57 !important;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .btn-primary:hover {
          background: rgba(255, 255, 255, 0.95) !important;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3) !important;
        }

        .btn-secondary {
          background: transparent !important;
          color: white !important;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2) !important;
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.2) !important;
        }

        /* Scroll indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 30px;
          right: 40px;
          text-align: center;
          animation: bounce 2s ease-in-out infinite;
          z-index: 10;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .mouse {
          width: 26px;
          height: 40px;
          border: 2px solid rgba(255, 255, 255, 0.7);
          border-radius: 13px;
          margin: 0 auto 10px;
          position: relative;
        }

        .wheel {
          width: 4px;
          height: 8px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 2px;
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          animation: scroll 2s ease-in-out infinite;
        }

        @keyframes scroll {
          0% {
            top: 8px;
            opacity: 1;
          }
          100% {
            top: 24px;
            opacity: 0;
          }
        }

        .scroll-text {
          color: rgba(255, 255, 255, 0.8);
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 0;
        }

        /* Responsive adjustments */
        @media screen and (max-width: 768px) {
          .playing-mode {
            height: 600px !important;
          }

          .compact-mode {
            transform: scale(0.6);
            padding-bottom: 100px;
          }

          .compact-mode .groom-name,
          .compact-mode .bride-name {
            font-size: 40px !important;
          }

          .compact-mode .heart-divider {
            font-size: 18px;
          }

          .compact-mode .wedding-subtitle {
            font-size: 12px;
          }

          .compact-mode .date-text {
            font-size: 14px;
          }

          .slideshow-indicators {
            bottom: 70px;
            padding: 5px 10px;
            gap: 5px;
          }

          .indicator {
            width: 5px;
            height: 5px;
          }

          .indicator.active {
            width: 15px;
          }

          .play-pause-button {
            bottom: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
          }

          .play-pause-button svg {
            width: 20px;
            height: 20px;
          }

          .heart {
            font-size: 15px;
          }

          .save-date-text {
            font-size: 11px;
            padding: 6px 20px;
            letter-spacing: 2px;
          }

          .heart-divider {
            font-size: 20px;
            gap: 10px;
          }

          .ampersand-container {
            gap: 10px;
          }

          .wedding-subtitle {
            gap: 15px;
          }

          .subtitle-line {
            width: 40px;
          }

          .date-text {
            font-size: 16px;
          }

          .banner-actions {
            gap: 10px;
          }

          .btn-elegant {
            padding: 12px 25px !important;
            font-size: 12px;
          }

          .scroll-indicator {
            bottom: 20px;
            right: 20px;
          }
        }

        @media screen and (max-width: 480px) {
          .playing-mode {
            height: 600px !important;
          }

          .compact-mode {
            transform: scale(0.5);
            padding-bottom: 80px;
          }

          .compact-mode .groom-name,
          .compact-mode .bride-name {
            font-size: 30px !important;
          }

          .compact-mode .heart-divider {
            font-size: 16px;
          }

          .compact-mode .wedding-subtitle {
            font-size: 10px;
          }

          .compact-mode .date-text {
            font-size: 12px;
          }

          .slideshow-indicators {
            bottom: 60px;
            padding: 4px 8px;
            gap: 4px;
          }

          .indicator {
            width: 4px;
            height: 4px;
          }

          .indicator.active {
            width: 12px;
          }

          .play-pause-button {
            bottom: 15px;
            left: 15px;
            width: 45px;
            height: 45px;
          }

          .play-pause-button svg {
            width: 18px;
            height: 18px;
          }

          .save-date-badge {
            margin-bottom: 20px;
          }

          .heart-divider {
            font-size: 18px;
          }

          .subtitle-line {
            width: 30px;
          }

          .date-text {
            font-size: 14px;
          }

          .banner-actions {
            flex-direction: column;
            gap: 10px;
          }

          .btn-elegant {
            width: 80%;
            max-width: 250px;
          }

          .scroll-indicator {
            right: 15px;
            bottom: 15px;
          }

          .mouse {
            width: 22px;
            height: 35px;
          }

          .scroll-text {
            font-size: 10px;
          }
        }
      `}</style>
    </header>
  );
}
