// Image categories for better organization
export type ImageCategory =
  | 'backgrounds'
  | 'couple'
  | 'gallery'
  | 'icons'
  | 'other';

// Image metadata interface
export interface ImageMetadata {
  src: string;
  alt: string;
  category: ImageCategory;
  description?: string;
  width?: number;
  height?: number;
}

// Background images
export interface BackgroundImages {
  hero: ImageMetadata;
  event: ImageMetadata;
  story: ImageMetadata;
  started: ImageMetadata;
  contact: ImageMetadata;
}

// Couple images
export interface CoupleImages {
  bride: ImageMetadata;
  groom: ImageMetadata;
  couple1: ImageMetadata;
  couple2: ImageMetadata;
  couple3: ImageMetadata;
}

// Gallery images
export interface GalleryImages {
  gallery1: ImageMetadata;
  gallery2: ImageMetadata;
  gallery3: ImageMetadata;
  gallery4: ImageMetadata;
  gallery5: ImageMetadata;
  gallery6: ImageMetadata;
  gallery7: ImageMetadata;
  gallery8: ImageMetadata;
  gallery9: ImageMetadata;
}

// Icon images
export interface IconImages {
  loader: ImageMetadata;
  location: ImageMetadata;
}

// All images interface
export interface AllImages {
  backgrounds: BackgroundImages;
  couple: CoupleImages;
  gallery: GalleryImages;
  icons: IconImages;
}
