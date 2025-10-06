import Image from 'next/image';
import { backgroundImages, coupleImages, galleryImages } from '@/lib/images';
import { getBackgroundImageStyle, getOptimizedImageProps } from '@/lib/images/utils';

/**
 * Example component showing how to use the centralized image system
 */
export default function ImageExample() {
  return (
    <div className="image-example">
      <h2>Image Management System Example</h2>

      {/* Using background images */}
      <div
        className="hero-section"
        style={getBackgroundImageStyle(backgroundImages.hero)}
      >
        <h3>Hero Background</h3>
      </div>

      {/* Using couple images with Next.js Image component */}
      <div className="couple-section">
        <Image
          {...getOptimizedImageProps(coupleImages.bride)}
          className="bride-image"
        />
        <Image
          {...getOptimizedImageProps(coupleImages.groom)}
          className="groom-image"
        />
      </div>

      {/* Using gallery images */}
      <div className="gallery-section">
        <div
          className="gallery-item"
          style={getBackgroundImageStyle(galleryImages.gallery1)}
        >
          <span>Gallery Item 1</span>
        </div>
        <div
          className="gallery-item"
          style={getBackgroundImageStyle(galleryImages.gallery2)}
        >
          <span>Gallery Item 2</span>
        </div>
      </div>
    </div>
  );
}
