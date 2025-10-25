# Gallery Album URLs

Your wedding gallery is accessible through clean, SEO-friendly URLs:

## Available Albums

### Coffee Shop Album
- **URL**: `/gallery/coffee`
- **Photos**: 16
- **Description**: Cozy moments at your favorite coffee spot

### Outdoor Adventures Album
- **URL**: `/gallery/outdoor`
- **Photos**: 15
- **Description**: Beautiful outdoor photography sessions

### Studio Sessions Album
- **URL**: `/gallery/studio`
- **Photos**: 16
- **Description**: Professional studio photography moments

### Couple Moments Album
- **URL**: `/gallery/couple`
- **Photos**: 0 (ready to add!)
- **Description**: Special moments captured together

## How It Works

1. **Homepage Gallery Section**: Displays all album thumbnails at `/#fh5co-gallery`
2. **Click Album**: Navigates to dedicated album page
3. **View Photos**: Browse photos in beautiful masonry layout (inspired by [React Photo Album examples](https://react-photo-album.com/examples/lightbox))
4. **Lightbox**: Click any photo to view full-screen
5. **Navigate**: Use keyboard arrows or mouse to browse
6. **Return**: Click "Back to Gallery" button or use browser back button

## Example URLs in Production

When deployed, your gallery will be accessible at:

```
https://yourdomain.com/gallery/coffee
https://yourdomain.com/gallery/outdoor
https://yourdomain.com/gallery/studio
https://yourdomain.com/gallery/couple
```

## Features

- ✅ **SEO Friendly**: Each album has its own URL that can be shared
- ✅ **Shareable**: Send album links directly to friends and family
- ✅ **Browser History**: Back button works as expected
- ✅ **Deep Linking**: Users can bookmark specific albums
- ✅ **404 Handling**: Invalid album IDs show a friendly error page

## Adding New Albums

If you add a new album with ID `ceremony`, it will automatically be accessible at `/gallery/ceremony`.

Just add it to `src/lib/galleryAlbums.ts`:

```typescript
{
  id: 'ceremony',  // This becomes the URL
  title: 'Ceremony',
  // ... other properties
}
```

