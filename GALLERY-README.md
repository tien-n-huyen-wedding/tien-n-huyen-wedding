# Wedding Gallery System

This document explains how the gallery system works and how to manage your wedding photo albums.

## Overview

The wedding website features a dynamic gallery system with 4 photo albums:
- **Coffee Shop** - Cozy moments at your favorite coffee spot (16 photos)
- **Outdoor Adventures** - Beautiful outdoor photography sessions (15 photos)
- **Studio Sessions** - Professional studio photography moments (16 photos)
- **Couple Moments** - Special moments captured together (empty, ready for photos)

## Features

✨ **Modern Photo Viewing**
- Responsive photo grid layout using `react-photo-album`
- Full-screen lightbox viewer with `yet-another-react-lightbox`
- Mobile-friendly design
- Smooth animations

🎨 **User Experience**
- Click on any album card to view all photos
- Navigate through photos with keyboard arrows or mouse clicks
- Close lightbox with ESC key or close button
- Beautiful modal overlay

## File Structure

```
wedding/
├── public/images/gallery/
│   ├── COFFEE/
│   │   ├── thumbnail.jpg     # Album cover image
│   │   └── *.JPG             # Individual photos
│   ├── OUTDOOR/
│   │   ├── thumbnail.jpg
│   │   └── *.jpg
│   ├── STUDIO/
│   │   ├── thumbnail.jpg
│   │   └── *.jpg
│   └── COUPLE/
│       └── thumbnail.jpg
├── src/
│   ├── components/
│   │   ├── AlbumViewer.tsx              # Modal viewer component
│   │   └── main_page_sections/
│   │       └── GallerySection.tsx       # Main gallery section
│   └── lib/
│       └── galleryAlbums.ts             # Album data configuration
└── scripts/
    └── update-gallery-albums.js         # Helper script
```

## How to Add Photos

### Method 1: Manual Update

1. Add your photos to the appropriate folder:
   ```bash
   # Example: Adding photos to COUPLE album
   cp my-photo.jpg public/images/gallery/COUPLE/
   ```

2. Update `src/lib/galleryAlbums.ts`:
   ```typescript
   const couplePhotos: string[] = [
     'my-photo.jpg',
     'another-photo.jpg',
     // ... more photos
   ];
   ```

### Method 2: Using the Helper Script

1. Add your photos to any gallery folder
2. Run the helper script:
   ```bash
   node scripts/update-gallery-albums.js
   ```
3. The script will display all photo arrays - copy and paste them into `galleryAlbums.ts`

## Album Configuration

Each album in `src/lib/galleryAlbums.ts` has the following properties:

```typescript
{
  id: 'coffee',                    // Unique identifier
  title: 'Coffee Shop',            // Display name
  description: 'Cozy moments...',  // Short description
  thumbnail: '/images/gallery/COFFEE/thumbnail.jpg',  // Cover image
  photoCount: 16,                  // Number of photos (auto-calculated)
  photos: [...],                   // Array of photo objects
  colorClass: 'color-1'           // CSS color theme
}
```

## Customizing Albums

### Change Album Title or Description

Edit `src/lib/galleryAlbums.ts`:

```typescript
export const albums: Album[] = [
  {
    id: 'coffee',
    title: 'Your Custom Title',
    description: 'Your custom description',
    // ...
  }
];
```

### Change Album Thumbnail

Replace the `thumbnail.jpg` in the respective folder:

```bash
cp your-thumbnail.jpg public/images/gallery/COFFEE/thumbnail.jpg
```

### Add a New Album

1. Create a new folder:
   ```bash
   mkdir public/images/gallery/NEW_ALBUM
   ```

2. Add photos and thumbnail:
   ```bash
   cp thumbnail.jpg public/images/gallery/NEW_ALBUM/
   cp photo1.jpg photo2.jpg public/images/gallery/NEW_ALBUM/
   ```

3. Update `src/lib/galleryAlbums.ts`:
   ```typescript
   const newAlbumPhotos: string[] = [
     'photo1.jpg',
     'photo2.jpg'
   ];

   export const albums: Album[] = [
     // ... existing albums
     {
       id: 'new-album',
       title: 'New Album',
       description: 'Description here',
       thumbnail: '/images/gallery/NEW_ALBUM/thumbnail.jpg',
       photoCount: newAlbumPhotos.length,
       photos: getGalleryPhotos('NEW_ALBUM', newAlbumPhotos),
       colorClass: 'color-5'
     }
   ];
   ```

## Photo Optimization Tips

For best performance:

1. **Image Size**: Resize images to reasonable dimensions (1920px wide max)
2. **File Format**: Use JPEG for photos, PNG for graphics
3. **Compression**: Compress images to reduce file size
4. **Naming**: Use consistent naming (e.g., `photo-001.jpg`, `photo-002.jpg`)

### Quick Resize with ImageMagick

```bash
# Resize all images to 1920px wide
cd public/images/gallery/COUPLE
mogrify -resize 1920x\> -quality 85 *.jpg
```

## Troubleshooting

### Photos not showing up?

1. Check file paths in `galleryAlbums.ts` match actual files
2. Ensure file extensions match (`.jpg` vs `.JPG`)
3. Run the helper script to verify all files are detected

### Album count is wrong?

The `photoCount` is auto-calculated from the `photos` array length. Make sure all photos in your folder are listed in the array.

### Lightbox not working?

1. Check browser console for errors
2. Ensure `react-photo-album` and `yet-another-react-lightbox` are installed:
   ```bash
   npm install react-photo-album yet-another-react-lightbox
   ```

## Development

### Testing Gallery Changes

```bash
npm run dev
```

Navigate to `http://localhost:3000` and scroll to the Gallery section.

### Building for Production

```bash
npm run build
```

## Dependencies

- `react-photo-album` - Responsive photo gallery component
- `yet-another-react-lightbox` - Full-screen image viewer

## Support

For issues or questions, please refer to:
- [React Photo Album Docs](https://react-photo-album.com/)
- [Yet Another React Lightbox Docs](https://yet-another-react-lightbox.com/)

