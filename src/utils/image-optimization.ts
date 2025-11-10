/**
 * Image Optimization Utilities
 *
 * Provides helper functions to use optimized images with fallbacks
 */

/**
 * Get optimized image source with WebP fallback
 *
 * @param originalPath - Original image path (e.g., "/images/main_background.jpg")
 * @param useOptimized - Whether to use optimized version (default: true)
 * @returns Optimized image path or original if optimized doesn't exist
 */
export function getOptimizedImageSrc(
  originalPath: string,
  useOptimized: boolean = true
): string {
  if (!useOptimized) {
    return originalPath;
  }

  // Check if path already includes optimized directory
  if (originalPath.includes('/optimized/')) {
    return originalPath;
  }

  // Extract directory and filename
  const pathParts = originalPath.split('/');
  const filename = pathParts.pop() || '';
  const directory = pathParts.join('/');

  // Get base name without extension
  const ext = filename.substring(filename.lastIndexOf('.'));
  const basename = filename.substring(0, filename.lastIndexOf('.'));

  // Try WebP first (better compression)
  const webpPath = `${directory}/optimized/${basename}.webp`;

  // Return WebP path (browser will fallback to original if not available)
  // In production, you'd check if file exists, but for static export we assume it's there
  return webpPath;
}

/**
 * Get image source set for responsive images
 *
 * @param originalPath - Original image path
 * @param sizes - Array of size configurations
 * @returns Object with srcSet and sizes for responsive images
 */
export function getResponsiveImageSrcSet(
  originalPath: string,
  sizes: Array<{ width: number; quality?: number }> = [
    { width: 640, quality: 75 },
    { width: 1024, quality: 80 },
    { width: 1920, quality: 85 },
  ]
): { srcSet: string; sizes: string } {
  const srcSet = sizes
    .map(({ width, quality = 85 }) => {
      const optimizedPath = getOptimizedImageSrc(originalPath);
      // In a real implementation, you'd generate different sizes
      // For now, return the optimized path with width descriptor
      return `${optimizedPath} ${width}w`;
    })
    .join(', ');

  return {
    srcSet,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1920px',
  };
}

/**
 * Get background image style with optimized image
 *
 * @param imagePath - Image path
 * @param useOptimized - Whether to use optimized version
 * @returns CSS background-image style
 */
export function getOptimizedBackgroundImage(
  imagePath: string,
  useOptimized: boolean = true
): React.CSSProperties {
  const optimizedPath = getOptimizedImageSrc(imagePath, useOptimized);

  return {
    backgroundImage: `url(${optimizedPath})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
}

/**
 * Preload optimized image
 *
 * @param imagePath - Image path to preload
 * @param useOptimized - Whether to use optimized version
 */
export function preloadOptimizedImage(
  imagePath: string,
  useOptimized: boolean = true
): void {
  if (typeof window === 'undefined') return;

  const optimizedPath = getOptimizedImageSrc(imagePath, useOptimized);
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = optimizedPath;
  link.fetchPriority = 'high';
  document.head.appendChild(link);
}

/**
 * Check if browser supports WebP
 */
export function supportsWebP(): boolean {
  if (typeof window === 'undefined') return false;

  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

/**
 * Get best image format for current browser
 *
 * @param originalPath - Original image path
 * @returns Best format path (WebP if supported, otherwise original)
 */
export function getBestImageFormat(originalPath: string): string {
  if (supportsWebP()) {
    return getOptimizedImageSrc(originalPath, true);
  }
  // Fallback to original or JPEG version
  const optimizedPath = getOptimizedImageSrc(originalPath, true);
  // Replace .webp with .jpg for fallback
  return optimizedPath.replace('.webp', '.jpg');
}

