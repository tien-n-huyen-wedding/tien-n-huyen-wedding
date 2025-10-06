'use client';

import { useState, useEffect } from 'react';
import { ImageMetadata } from '@/types/images';
import { validateImageExists, preloadImages } from './utils';

/**
 * Hook for managing image loading states and validation
 */
export const useImages = (images: ImageMetadata[]) => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [errorStates, setErrorStates] = useState<Record<string, boolean>>({});
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const validateImages = async () => {
      const newLoadingStates: Record<string, boolean> = {};
      const newErrorStates: Record<string, boolean> = {};

      // Initialize loading states
      images.forEach(img => {
        newLoadingStates[img.src] = true;
        newErrorStates[img.src] = false;
      });

      setLoadingStates(newLoadingStates);
      setErrorStates(newErrorStates);

      // Validate each image
      for (const image of images) {
        try {
          const exists = await validateImageExists(image.src);
          if (exists) {
            setLoadedImages(prev => new Set([...prev, image.src]));
          } else {
            newErrorStates[image.src] = true;
          }
        } catch (error) {
          console.error(`Error validating image ${image.src}:`, error);
          newErrorStates[image.src] = true;
        } finally {
          newLoadingStates[image.src] = false;
        }
      }

      setLoadingStates(newLoadingStates);
      setErrorStates(newErrorStates);
    };

    validateImages();
  }, [images]);

  const isImageLoaded = (src: string) => loadedImages.has(src);
  const isImageLoading = (src: string) => loadingStates[src] || false;
  const hasImageError = (src: string) => errorStates[src] || false;

  return {
    isImageLoaded,
    isImageLoading,
    hasImageError,
    loadedImages: Array.from(loadedImages),
  };
};

/**
 * Hook for preloading images
 */
export const useImagePreloader = (images: ImageMetadata[]) => {
  const [isPreloading, setIsPreloading] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const preload = async () => {
      setIsPreloading(true);
      try {
        await preloadImages(images);
        setPreloadedImages(new Set(images.map(img => img.src)));
      } catch (error) {
        console.error('Error preloading images:', error);
      } finally {
        setIsPreloading(false);
      }
    };

    preload();
  }, [images]);

  const isImagePreloaded = (src: string) => preloadedImages.has(src);

  return {
    isPreloading,
    isImagePreloaded,
    preloadedImages: Array.from(preloadedImages),
  };
};

/**
 * Hook for image optimization
 */
export const useImageOptimization = () => {
  const [optimizedImages, setOptimizedImages] = useState<Record<string, string>>({});

  const optimizeImage = async (src: string, _quality: number = 0.8) => {
    if (optimizedImages[src]) {
      return optimizedImages[src];
    }

    try {
      // In a real implementation, you would use an image optimization service
      // For now, return the original src
      const optimizedSrc = src; // This would be the optimized version
      setOptimizedImages(prev => ({ ...prev, [src]: optimizedSrc }));
      return optimizedSrc;
    } catch (error) {
      console.error(`Error optimizing image ${src}:`, error);
      return src;
    }
  };

  return {
    optimizeImage,
    optimizedImages,
  };
};
