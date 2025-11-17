'use client';

import React from 'react';
import { Photo } from '@/lib/galleryAlbums';

interface SlideshowImageLayerProps {
  photos: Photo[];
  currentIndex: number;
  transitionEffect: string;
  loadedImages: Set<number>;
}

export default function SlideshowImageLayer({
  photos,
  currentIndex,
  transitionEffect,
  loadedImages,
}: SlideshowImageLayerProps) {
  return (
    <div className="slideshow-images">
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`slideshow-image ${index === currentIndex ? 'active' : ''} effect-${transitionEffect} ${loadedImages.has(index) ? '' : 'loading'}`}
          style={
            loadedImages.has(index)
              ? {
                  backgroundImage: `url(${photo.src})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: '#000',
                }
              : { backgroundColor: '#000' }
          }
        >
          {!loadedImages.has(index) && (
            <div className="image-loading-indicator">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeDasharray="60" strokeDashoffset="15" opacity="0.2" />
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeDasharray="60" strokeDashoffset="15" className="spinner-circle" />
              </svg>
              <span>Loading...</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

