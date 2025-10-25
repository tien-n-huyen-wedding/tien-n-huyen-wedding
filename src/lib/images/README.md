# Image Management System

This directory contains a centralized image management system for the wedding website. It provides a structured way to manage all images, making it easy to replace, update, and maintain images across the application.

## Structure

```
src/lib/images/
├── index.ts          # Main image definitions and exports
├── utils.ts          # Utility functions for image handling
├── useImages.ts      # React hooks for image management
└── README.md         # This documentation
```

## Features

- **Centralized Image Definitions**: All images are defined in one place
- **TypeScript Support**: Full type safety for all image operations
- **Easy Replacement**: Change images by updating the index file
- **Optimization Utilities**: Built-in functions for image optimization
- **React Hooks**: Custom hooks for image loading states
- **Background Image Support**: Easy background image styling
- **Next.js Integration**: Optimized for Next.js Image component

## Usage

### Basic Image Usage

```tsx
import { coupleImages, backgroundImages } from '@/lib/images';
import { getOptimizedImageProps, getBackgroundImageStyle } from '@/lib/images/utils';
import Image from 'next/image';

// Using Next.js Image component
<Image {...getOptimizedImageProps(coupleImages.bride)} />

// Using background images
<div style={getBackgroundImageStyle(backgroundImages.hero)}>
  Content here
</div>
```

### Using React Hooks

```tsx
import { useImages, useImagePreloader } from '@/lib/images/useImages';
import { coupleImages } from '@/lib/images';

function MyComponent() {
  const images = [coupleImages.bride, coupleImages.groom];
  const { isImageLoaded, isImageLoading, hasImageError } = useImages(images);
  const { isPreloading } = useImagePreloader(images);

  return (
    <div>
      {isPreloading && <p>Loading images...</p>}
      {hasImageError(coupleImages.bride.src) && <p>Failed to load image</p>}
    </div>
  );
}
```

## Image Categories

### Background Images
- `backgroundImages.hero` - Main hero section background
- `backgroundImages.event` - Wedding events section background
- `backgroundImages.story` - Couple story section background
- `backgroundImages.started` - RSVP section background
- `backgroundImages.contact` - Contact section background

### Couple Images
- `coupleImages.bride` - Bride portrait
- `coupleImages.groom` - Groom portrait
- `coupleImages.couple1` - First meeting photo
- `coupleImages.couple2` - First date photo
- `coupleImages.couple3` - Relationship photo

### Gallery Images
- `galleryImages.gallery1` through `galleryImages.gallery9` - Wedding gallery photos

### Icon Images
- `iconImages.loader` - Loading animation
- `iconImages.location` - Location pin icon

## Replacing Images

To replace an image:

1. **Add the new image file** to `public/images/`
2. **Update the image definition** in `src/lib/images/index.ts`:

```typescript
bride: {
  src: `${IMAGE_BASE_PATH}/new-bride-photo.jpg`, // Update this path
  alt: 'Beautiful bride',
  category: 'couple',
  description: 'Portrait of the bride',
  width: 300,
  height: 400,
},
```

3. **The change will automatically apply** to all components using that image

## Adding New Images

1. **Add the image file** to `public/images/`
2. **Add the image definition** to the appropriate category in `index.ts`
3. **Update the TypeScript interfaces** in `src/types/images.ts` if needed
4. **Use the image** in your components

## Utility Functions

### `getOptimizedImageProps(image)`
Returns optimized props for Next.js Image component.

### `getBackgroundImageStyle(image)`
Returns CSS style object for background images.

### `getImageByPath(path)`
Finds an image by its source path.

### `getImagesByCategory(category)`
Gets all images in a specific category.

### `validateImageExists(src)`
Validates if an image exists (client-side only).

### `preloadImages(images)`
Preloads multiple images for better performance.

## Best Practices

1. **Use TypeScript**: Always use the provided types for better development experience
2. **Optimize Images**: Use the utility functions for image optimization
3. **Preload Important Images**: Use the preloading hooks for critical images
4. **Consistent Naming**: Follow the established naming conventions
5. **Alt Text**: Always provide meaningful alt text for accessibility
6. **Responsive Images**: Use the responsive image utilities for different screen sizes


This system makes it easy to manage all your wedding website images in one place! 🎉
