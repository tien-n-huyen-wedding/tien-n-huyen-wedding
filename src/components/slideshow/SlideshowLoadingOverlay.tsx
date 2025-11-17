'use client';

import React from 'react';

interface SlideshowLoadingOverlayProps {
  visible: boolean;
  loadingProgress: number;
  loadedCount: number;
  totalCount: number;
}

export default function SlideshowLoadingOverlay({
  visible,
  loadingProgress,
  loadedCount,
  totalCount,
}: SlideshowLoadingOverlayProps) {
  if (!visible) {
    return null;
  }

  return (
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
            {loadedCount} / {totalCount} images loaded
          </p>
        </div>
      </div>
    </div>
  );
}

