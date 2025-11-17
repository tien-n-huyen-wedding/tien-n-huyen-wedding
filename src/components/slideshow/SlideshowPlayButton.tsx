'use client';

import React from 'react';

interface SlideshowPlayButtonProps {
  isPlaying: boolean;
  onToggle: () => void;
  visible: boolean;
}

export default function SlideshowPlayButton({
  isPlaying,
  onToggle,
  visible,
}: SlideshowPlayButtonProps) {
  return (
    <button
      className={`bottom-play-button ${visible ? 'visible' : 'hidden'}`}
      onClick={onToggle}
      aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
    >
      {isPlaying ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="6" y="5" width="4" height="14" fill="white" rx="1"/>
          <rect x="14" y="5" width="4" height="14" fill="white" rx="1"/>
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M8 5v14l11-7z" fill="white"/>
        </svg>
      )}
    </button>
  );
}

