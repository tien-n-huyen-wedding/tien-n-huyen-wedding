import { AllImages, BackgroundImages, CoupleImages, GalleryImages, IconImages, ImageMetadata } from '@/types/images';

// Base path for all images
const IMAGE_BASE_PATH = '/images';

// Background images configuration
export const backgroundImages: BackgroundImages = {
  hero: {
    src: `${IMAGE_BASE_PATH}/img_bg_2.jpg`,
    alt: 'Wedding hero background',
    category: 'backgrounds',
    description: 'Beautiful background for the main hero section',
  },
  event: {
    src: `${IMAGE_BASE_PATH}/img_bg_3.jpg`,
    alt: 'Wedding event background',
    category: 'backgrounds',
    description: 'Background for the wedding events section',
  },
  story: {
    src: `${IMAGE_BASE_PATH}/img_bg_1.jpg`,
    alt: 'Couple story background',
    category: 'backgrounds',
    description: 'Background for the couple story section',
  },
  started: {
    src: `${IMAGE_BASE_PATH}/img_bg_4.jpg`,
    alt: 'RSVP section background',
    category: 'backgrounds',
    description: 'Background for the RSVP section',
  },
  contact: {
    src: `${IMAGE_BASE_PATH}/img_bg_5.jpg`,
    alt: 'Contact section background',
    category: 'backgrounds',
    description: 'Background for the contact section',
  },
};

// Couple images configuration
export const coupleImages: CoupleImages = {
  bride: {
    src: `${IMAGE_BASE_PATH}/bride.jpg`,
    alt: 'Beautiful bride',
    category: 'couple',
    description: 'Portrait of the bride',
    width: 300,
    height: 400,
  },
  groom: {
    src: `${IMAGE_BASE_PATH}/groom.jpg`,
    alt: 'Handsome groom',
    category: 'couple',
    description: 'Portrait of the groom',
    width: 300,
    height: 400,
  },
  couple1: {
    src: `${IMAGE_BASE_PATH}/couple-1.jpg`,
    alt: 'Couple together - first meeting',
    category: 'couple',
    description: 'Photo from when we first met',
  },
  couple2: {
    src: `${IMAGE_BASE_PATH}/couple-2.jpg`,
    alt: 'Couple together - first date',
    category: 'couple',
    description: 'Photo from our first date',
  },
  couple3: {
    src: `${IMAGE_BASE_PATH}/couple-3.jpg`,
    alt: 'Couple together - relationship',
    category: 'couple',
    description: 'Photo from our relationship',
  },
};

// Gallery images configuration
export const galleryImages: GalleryImages = {
  gallery1: {
    src: `${IMAGE_BASE_PATH}/gallery-1.jpg`,
    alt: 'Wedding gallery photo 1',
    category: 'gallery',
    description: 'Beautiful wedding moment',
  },
  gallery2: {
    src: `${IMAGE_BASE_PATH}/gallery-2.jpg`,
    alt: 'Wedding gallery photo 2',
    category: 'gallery',
    description: 'Special wedding moment',
  },
  gallery3: {
    src: `${IMAGE_BASE_PATH}/gallery-3.jpg`,
    alt: 'Wedding gallery photo 3',
    category: 'gallery',
    description: 'Memorable wedding moment',
  },
  gallery4: {
    src: `${IMAGE_BASE_PATH}/gallery-4.jpg`,
    alt: 'Wedding gallery photo 4',
    category: 'gallery',
    description: 'Cherished wedding moment',
  },
  gallery5: {
    src: `${IMAGE_BASE_PATH}/gallery-5.jpg`,
    alt: 'Wedding gallery photo 5',
    category: 'gallery',
    description: 'Precious wedding moment',
  },
  gallery6: {
    src: `${IMAGE_BASE_PATH}/gallery-6.jpg`,
    alt: 'Wedding gallery photo 6',
    category: 'gallery',
    description: 'Wonderful wedding moment',
  },
  gallery7: {
    src: `${IMAGE_BASE_PATH}/gallery-7.jpg`,
    alt: 'Wedding gallery photo 7',
    category: 'gallery',
    description: 'Amazing wedding moment',
  },
  gallery8: {
    src: `${IMAGE_BASE_PATH}/gallery-8.jpg`,
    alt: 'Wedding gallery photo 8',
    category: 'gallery',
    description: 'Fantastic wedding moment',
  },
  gallery9: {
    src: `${IMAGE_BASE_PATH}/gallery-9.jpg`,
    alt: 'Wedding gallery photo 9',
    category: 'gallery',
    description: 'Incredible wedding moment',
  },
};

// Icon images configuration
export const iconImages: IconImages = {
  loader: {
    src: `${IMAGE_BASE_PATH}/loader.gif`,
    alt: 'Loading animation',
    category: 'icons',
    description: 'Loading spinner animation',
  },
  location: {
    src: `${IMAGE_BASE_PATH}/loc.png`,
    alt: 'Location pin icon',
    category: 'icons',
    description: 'Location marker icon',
  },
};

// All images combined
export const allImages: AllImages = {
  backgrounds: backgroundImages,
  couple: coupleImages,
  gallery: galleryImages,
  icons: iconImages,
};

// Helper function to get image by path
export const getImageByPath = (path: string): ImageMetadata | undefined => {
  const allImageEntries = Object.values(allImages).flatMap(category =>
    Object.values(category)
  ) as ImageMetadata[];
  return allImageEntries.find(img => img.src === path);
};

// Helper function to get images by category
export const getImagesByCategory = (category: string): ImageMetadata[] => {
  const allImageEntries = Object.values(allImages).flatMap(categoryObj =>
    Object.values(categoryObj)
  ) as ImageMetadata[];
  return allImageEntries.filter(img => img.category === category);
};

// Helper function to get all image paths
export const getAllImagePaths = (): string[] => {
  const allImageEntries = Object.values(allImages).flatMap(category =>
    Object.values(category)
  ) as ImageMetadata[];
  return allImageEntries.map(img => img.src);
};

// Individual categories are already exported above
