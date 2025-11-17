'use client';

import React from 'react';

interface SlideshowTopBarProps {
  onClose: () => void;
  current: number;
  total: number;
}

export default function SlideshowTopBar({ onClose, current, total }: SlideshowTopBarProps) {
  return (
    <div className="top-bar">
      <button className="close-button" onClick={onClose} aria-label="Close slideshow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
      <div className="image-counter">
        {current} / {total}
      </div>
    </div>
  );
}

