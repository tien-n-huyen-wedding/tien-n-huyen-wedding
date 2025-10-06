import { ImageMetadata } from "@/types/images";

/**
 * Generate optimized image props for Next.js Image component
 */
export const getOptimizedImageProps = (
  image: ImageMetadata,
  additionalProps?: Record<string, unknown>
) => {
  return {
    src: image.src,
    alt: image.alt,
    width: image.width || 800,
    height: image.height || 600,
    ...additionalProps,
  };
};

/**
 * Generate background image style object
 */
export const getBackgroundImageStyle = (
  image: ImageMetadata,
  additionalStyles?: Record<string, unknown>
) => {
  return {
    backgroundImage: `url(${image.src})`,
    ...additionalStyles,
  };
};

/**
 * Generate CSS class for image with proper alt text
 */
export const getImageClassName = (image: ImageMetadata, baseClass?: string) => {
  return baseClass ? `${baseClass} ${image.category}` : image.category;
};

/**
 * Validate if image exists (client-side only)
 */
export const validateImageExists = async (src: string): Promise<boolean> => {
  if (typeof window === "undefined") return true; // Skip validation on server

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
};

/**
 * Preload images for better performance
 */
export const preloadImages = async (images: ImageMetadata[]): Promise<void> => {
  if (typeof window === "undefined") return; // Skip preloading on server

  const preloadPromises = images.map((image) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Continue even if image fails to load
      img.src = image.src;
    });
  });

  await Promise.all(preloadPromises);
};

/**
 * Get responsive image sizes for different breakpoints
 */
export const getResponsiveImageSizes = (
  baseWidth: number,
  baseHeight: number
) => {
  return {
    sm: {
      width: Math.round(baseWidth * 0.5),
      height: Math.round(baseHeight * 0.5),
    },
    md: {
      width: Math.round(baseWidth * 0.75),
      height: Math.round(baseHeight * 0.75),
    },
    lg: { width: baseWidth, height: baseHeight },
    xl: {
      width: Math.round(baseWidth * 1.25),
      height: Math.round(baseHeight * 1.25),
    },
  };
};

/**
 * Generate placeholder image data URL
 */
export const generatePlaceholder = (
  width: number,
  height: number,
  color: string = "#f0f0f0"
): string => {
  const canvas =
    typeof document !== "undefined" ? document.createElement("canvas") : null;
  if (!canvas) return "";

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  }
  return canvas.toDataURL();
};

/**
 * Format image for web (optimize file size)
 */
export const optimizeImageForWeb = (
  src: string,
  _quality: number = 0.8
): string => {
  // This would typically involve image processing
  // For now, return the original src
  return src;
};

/**
 * Get image dimensions from file (client-side only)
 */
export const getImageDimensions = (
  src: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(
        new Error("getImageDimensions can only be called on the client side")
      );
      return;
    }

    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      reject(new Error(`Failed to load image: ${src}`));
    };
    img.src = src;
  });
};
