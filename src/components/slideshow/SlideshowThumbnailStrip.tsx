'use client';

import React from 'react';
import { Photo } from '@/lib/galleryAlbums';

interface SlideshowThumbnailStripProps {
  photos: Photo[];
  currentIndex: number;
  loadedImages: Set<number>;
  showBottomBar: boolean;
  onSelect: (index: number) => void;
}

export default function SlideshowThumbnailStrip({
  photos,
  currentIndex,
  loadedImages,
  showBottomBar,
  onSelect,
}: SlideshowThumbnailStripProps) {
  return (
    <div className={`bottom-bar ${showBottomBar ? 'visible' : 'hidden'}`}>
      <div className="thumbnail-strip">
        {photos.map((photo, index) => (
          <button
            key={index}
            className={`thumbnail ${index === currentIndex ? 'active' : ''} ${!loadedImages.has(index) ? 'loading' : ''}`}
            onClick={() => onSelect(index)}
            style={{ backgroundImage: `url(${photo.src})` }}
            aria-label={`Go to image ${index + 1}`}
          >
            {!loadedImages.has(index) && (
              <span className="thumbnail-loader">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeDasharray="60" strokeDashoffset="15" opacity="0.2" />
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeDasharray="60" strokeDashoffset="15" className="spinner-circle" />
                </svg>
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

