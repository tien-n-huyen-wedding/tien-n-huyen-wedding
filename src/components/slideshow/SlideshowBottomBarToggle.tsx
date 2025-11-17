'use client';

import React from 'react';

interface SlideshowBottomBarToggleProps {
  showBottomBar: boolean;
  onToggle: () => void;
  visible: boolean;
}

export default function SlideshowBottomBarToggle({
  showBottomBar,
  onToggle,
  visible,
}: SlideshowBottomBarToggleProps) {
  return (
    <button
      className={`bottom-bar-toggle ${visible ? 'visible' : 'hidden'}`}
      onClick={onToggle}
      aria-label={showBottomBar ? "Hide thumbnails" : "Show thumbnails"}
    >
      {showBottomBar ? 'Hide Thumbnails' : 'Show Thumbnails'}
    </button>
  );
}

