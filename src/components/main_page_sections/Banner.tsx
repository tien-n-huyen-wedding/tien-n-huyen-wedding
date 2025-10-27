import { getBackgroundImageStyle } from "@/lib/images/utils";
import Countdown from "../Countdown";
import { backgroundImages } from "@/lib/images";
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
  "/images/gallery/COFFEE/NOR_6392.JPG",
  "/images/main_background.jpg",
];

export default function Banner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(slideshowImages.length - 1); // Start with main_background.jpg
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = slideshowImages.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        setIsLoaded(true); // Continue anyway
      }
    };

    preloadImages();
  }, []);

  // Auto-advance slideshow only when playing
  useEffect(() => {
    if (!isLoaded || !isPlaying) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % slideshowImages.length
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isLoaded, isPlaying]);

  const togglePlayPause = () => {
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
      {/* Slideshow backgrounds */}
      <div className="slideshow-container">
        {slideshowImages.map((image, index) => (
          <div
            key={index}
            className={`slideshow-image ${index === currentImageIndex ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        ))}
      </div>

      <div className="overlay"></div>

      {/* Slideshow indicators */}
      <div className="slideshow-indicators">
        {slideshowImages.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
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
            <div className={`display-t ${isPlaying ? 'playing-mode' : ''}`}>
              <div className={`display-tc animate-box ${isPlaying ? 'compact-mode' : ''}`} data-animate-effect="fadeIn">
                {/* Decorative top element */}
                <div className="banner-decoration-top">
                </div>

                {/* Save the Date Badge */}
                <div className="save-date-badge">
                  <span className="save-date-text">Save The Date</span>
                </div>

                {/* Names with elegant styling */}
                <div className="names-container">
                  <h1 className="tp-lacosta-font groom-name">Quang Tiến</h1>
                  <div className="ampersand-container">
                    <h3 className="tp-lacosta-font ampersand heart-divider">♥</h3>
                  </div>
                  <h1 className="tp-lacosta-font bride-name">Lệ Huyền</h1>
                </div>

                {/* Subtitle with animation */}
                <h2 className="wedding-subtitle">
                  <span className="subtitle-line"></span>
                  <span className="subtitle-text">We Are Getting Married</span>
                  <span className="subtitle-line"></span>
                </h2>

                {/* Wedding Date */}
                <div className="wedding-date">
                  <p className="date-text">{MAIN_WEDDING_PARTY_INFO.atStr}</p>
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

      {/* Play/Pause Button */}
      <button
        className="play-pause-button"
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isPlaying ? (
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

        .slideshow-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 1.5s ease-in-out;
          will-change: opacity;
        }

        .slideshow-image.active {
          opacity: 1;
          z-index: 1;
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
          transition: opacity 0.5s ease;
        }

        .compact-mode .banner-decoration-top {
          opacity: 0;
        }

        .save-date-badge {
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        .compact-mode .save-date-badge {
          opacity: 0;
          transform: translateY(-20px);
        }

        /* Animated elements with staggered delays */
        .names-container {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .compact-mode .names-container {
          margin: 10px 0;
        }

        .groom-name,
        .bride-name {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
        }

        .compact-mode .groom-name,
        .compact-mode .bride-name {
          font-size: 60px !important;
        }

        .heart-divider {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.15s;
        }

        .compact-mode .heart-divider {
          font-size: 24px;
        }

        .ampersand-container {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.15s;
        }

        .compact-mode .ampersand-container {
          gap: 15px;
          margin: 5px 0;
        }

        .wedding-subtitle {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
        }

        .compact-mode .wedding-subtitle {
          margin: 10px 0 !important;
          font-size: 14px;
        }

        .subtitle-text {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
        }

        .subtitle-line {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
        }

        .compact-mode .subtitle-line {
          width: 40px;
        }

        .wedding-date {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.25s;
        }

        .compact-mode .wedding-date {
          margin: 10px 0;
        }

        .date-text {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.25s;
        }

        .compact-mode .date-text {
          font-size: 16px;
        }

        .countdown-wrapper {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
        }

        .compact-mode .countdown-wrapper {
          margin: 15px 0;
        }

        .banner-actions {
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .compact-mode .banner-actions {
          opacity: 0;
          transform: translateY(20px);
          pointer-events: none;
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
          animation: pulse 2s ease-in-out infinite;
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

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        /* Names styling */
        .names-container {
          margin: 30px 0;
        }

        .groom-name,
        .bride-name {
          animation: fadeInScale 1s ease-out;
        }

        .bride-name {
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }

        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
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
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(1);
          }
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
        }

        .subtitle-line {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, white, transparent);
          animation: expandLine 2s ease-in-out infinite;
        }

        @keyframes expandLine {
          0%, 100% {
            width: 60px;
          }
          50% {
            width: 80px;
          }
        }

        .subtitle-text {
          font-style: italic;
          letter-spacing: 2px;
        }

        /* Wedding Date */
        .wedding-date {
          margin: 25px 0;
        }

        .date-text {
          color: white;
          font-size: 22px;
          font-weight: 400;
          letter-spacing: 1px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          margin: 0;
        }

        /* Countdown wrapper */
        .countdown-wrapper {
          margin: 35px 0;
        }

        /* Banner actions */
        .banner-actions {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin: 35px 0 20px 0;
          flex-wrap: wrap;
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
