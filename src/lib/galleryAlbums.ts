// Gallery Albums Configuration
// Photo data is stored in separate JSON files for easier management

import coffeePhotosData from './gallery-data/coffee-photos.json';
import outdoorPhotosData from './gallery-data/outdoor-photos.json';
import studioPhotosData from './gallery-data/studio-photos.json';
import couplePhotosData from './gallery-data/couple-photos.json';

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt?: string;
}

export interface Album {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  photoCount: number;
  photos: Photo[];
  colorClass?: string;
}

// Import photo data from JSON files
const coffeePhotos: Photo[] = coffeePhotosData;
const outdoorPhotos: Photo[] = outdoorPhotosData;
const studioPhotos: Photo[] = studioPhotosData;
const couplePhotos: Photo[] = couplePhotosData;

// Export all albums
export const albums: Album[] = [
  {
    id: 'coffee',
    title: 'Coffee Shop',
    description: 'Cozy moments at our favorite coffee spot',
    thumbnail: '/images/gallery/COFFEE/thumbnail.jpg',
    photoCount: coffeePhotos.length,
    photos: coffeePhotos,
    colorClass: 'color-1'
  },
  {
    id: 'outdoor',
    title: 'Outdoor Adventures',
    description: 'Beautiful outdoor photography sessions',
    thumbnail: '/images/gallery/OUTDOOR/thumbnail.jpg',
    photoCount: outdoorPhotos.length,
    photos: outdoorPhotos,
    colorClass: 'color-2'
  },
  {
    id: 'studio',
    title: 'Studio Sessions',
    description: 'Professional studio photography moments',
    thumbnail: '/images/gallery/STUDIO/thumbnail.jpg',
    photoCount: studioPhotos.length,
    photos: studioPhotos,
    colorClass: 'color-3'
  },
  {
    id: 'couple',
    title: 'Couple Moments',
    description: 'Special moments captured together',
    thumbnail: '/images/gallery/COUPLE/thumbnail.jpg',
    photoCount: couplePhotos.length,
    photos: couplePhotos,
    colorClass: 'color-4'
  },
  {
    id: 'all',
    title: 'All Photos',
    description: 'All photos from our special day',
    thumbnail: '/images/gallery/COFFEE/thumbnail.jpg',
    photoCount: coffeePhotos.length + outdoorPhotos.length + studioPhotos.length + couplePhotos.length,
    photos: [...coffeePhotos, ...outdoorPhotos, ...studioPhotos, ...couplePhotos],
    colorClass: 'color-5'
  }
];

// Helper to get album by id
export const getAlbumById = (id: string): Album | undefined => {
  return albums.find(album => album.id === id);
};
