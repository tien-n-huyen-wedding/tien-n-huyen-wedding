'use client';

import React from 'react';

interface SlideshowBottomBarToggleProps {
  showBottomBar: boolean;
  onToggle: () => void;
}

export default function SlideshowBottomBarToggle({
  showBottomBar,
  onToggle,
}: SlideshowBottomBarToggleProps) {
  return (
    <button
      className="bottom-bar-toggle"
      onClick={onToggle}
      aria-label={showBottomBar ? "Hide thumbnails" : "Show thumbnails"}
    >
      {showBottomBar ? 'Hide Thumbnails' : 'Show Thumbnails'}
    </button>
  );
}

