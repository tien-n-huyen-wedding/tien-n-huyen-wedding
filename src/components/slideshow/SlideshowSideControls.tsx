'use client';

import React from 'react';

interface SlideshowSideControlsProps {
  onPrevious: () => void;
  onNext: () => void;
}

export default function SlideshowSideControls({ onPrevious, onNext }: SlideshowSideControlsProps) {
  return (
    <div className="side-controls">
      <button
        className="nav-button side prev-button"
        onClick={onPrevious}
        aria-label="Previous image"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button
        className="nav-button side next-button"
        onClick={onNext}
        aria-label="Next image"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

