// Gallery Albums Configuration
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

// COFFEE Album
const coffeePhotos: Photo[] = [
  {
    src: '/images/gallery/COFFEE/thumbnail.jpg',
    width: 4528,
    height: 3024,
    alt: 'COFFEE - thumbnail.jpg'
  },
  {
    src: '/images/gallery/COFFEE/NOR_6068.JPG',
    width: 3024,
    height: 4528,
    alt: 'COFFEE - NOR_6068.JPG'
  },
  {
    src: '/images/gallery/COFFEE/NOR_6094.JPG',
    width: 3024,
    height: 4528,
    alt: 'COFFEE - NOR_6094.JPG'
  },
  {
    src: '/images/gallery/COFFEE/NOR_6149.JPG',
    width: 3024,
    height: 4528,
    alt: 'COFFEE - NOR_6149.JPG'
  },
  {
    src: '/images/gallery/COFFEE/NOR_6166.JPG',
    width: 3024,
    height: 4528,
    alt: 'COFFEE - NOR_6166.JPG'
  },
  {
    src: '/images/gallery/COFFEE/NOR_6198.JPG',
    width: 3024,
    height: 4528,
    alt: 'COFFEE - NOR_6198.JPG'
  },
  {
    src: '/images/gallery/COFFEE/NOR_6392.JPG',
    width: 3024,
    height: 4528,
    alt: 'COFFEE - NOR_6392.JPG'
  },
  {
    src: '/images/gallery/COFFEE/NOR_6397.JPG',
    width: 4528,
    height: 3024,
    alt: 'COFFEE - NOR_6397.JPG'
  },
  {
    src: '/images/gallery/COFFEE/NOR_6463.JPG',
    width: 3024,
    height: 4528,
    alt: 'COFFEE - NOR_6463.JPG'
  },
  {
    src: '/images/gallery/COFFEE/NOR_6478.JPG',
    width: 3024,
    height: 4528,
    alt: 'COFFEE - NOR_6478.JPG'
  },
  {
    src: '/images/gallery/COFFEE/NOR_6522.JPG',
    width: 3024,
    height: 4528,
    alt: 'COFFEE - NOR_6522.JPG'
  },
  {
    src: '/images/gallery/COFFEE/NOR_6545.JPG',
    width: 3024,
    height: 4528,
    alt: 'COFFEE - NOR_6545.JPG'
  },
  {
    src: '/images/gallery/COFFEE/NOR_6564.JPG',
    width: 3024,
    height: 4528,
    alt: 'COFFEE - NOR_6564.JPG'
  },
  {
    src: '/images/gallery/COFFEE/NOR_6569.JPG',
    width: 3024,
    height: 4528,
    alt: 'COFFEE - NOR_6569.JPG'
  },
  {
    src: '/images/gallery/COFFEE/NOR_6660.JPG',
    width: 3024,
    height: 4528,
    alt: 'COFFEE - NOR_6660.JPG'
  },
  {
    src: '/images/gallery/COFFEE/NOR_6829.JPG',
    width: 4528,
    height: 3024,
    alt: 'COFFEE - NOR_6829.JPG'
  },
  {
    src: '/images/gallery/COFFEE/NOR_6933.JPG',
    width: 3024,
    height: 4528,
    alt: 'COFFEE - NOR_6933.JPG'
  }
];

// OUTDOOR Album
const outdoorPhotos: Photo[] = [
  {
    src: '/images/gallery/OUTDOOR/thumbnail.jpg',
    width: 7008,
    height: 4672,
    alt: 'OUTDOOR - thumbnail.jpg'
  },
  {
    src: '/images/gallery/OUTDOOR/TMN_9496-14.jpg',
    width: 4024,
    height: 6036,
    alt: 'OUTDOOR - TMN_9496-14.jpg'
  },
  {
    src: '/images/gallery/OUTDOOR/TMN_9571-15.jpg',
    width: 6036,
    height: 4024,
    alt: 'OUTDOOR - TMN_9571-15.jpg'
  },
  {
    src: '/images/gallery/OUTDOOR/TMN_9783-17.jpg',
    width: 6036,
    height: 4024,
    alt: 'OUTDOOR - TMN_9783-17.jpg'
  },
  {
    src: '/images/gallery/OUTDOOR/TMN_9911-18.jpg',
    width: 6036,
    height: 4024,
    alt: 'OUTDOOR - TMN_9911-18.jpg'
  },
  {
    src: '/images/gallery/OUTDOOR/TOM04374-2.jpg',
    width: 7008,
    height: 4672,
    alt: 'OUTDOOR - TOM04374-2.jpg'
  },
  {
    src: '/images/gallery/OUTDOOR/TOM04399-3.jpg',
    width: 7008,
    height: 4672,
    alt: 'OUTDOOR - TOM04399-3.jpg'
  },
  {
    src: '/images/gallery/OUTDOOR/TOM04630-4.jpg',
    width: 7008,
    height: 4672,
    alt: 'OUTDOOR - TOM04630-4.jpg'
  },
  {
    src: '/images/gallery/OUTDOOR/TOM04667-5.jpg',
    width: 7008,
    height: 4672,
    alt: 'OUTDOOR - TOM04667-5.jpg'
  },
  {
    src: '/images/gallery/OUTDOOR/TOM04678-6.jpg',
    width: 4672,
    height: 7008,
    alt: 'OUTDOOR - TOM04678-6.jpg'
  },
  {
    src: '/images/gallery/OUTDOOR/TOM04692-7.jpg',
    width: 7008,
    height: 4672,
    alt: 'OUTDOOR - TOM04692-7.jpg'
  },
  {
    src: '/images/gallery/OUTDOOR/TOM04827-9.jpg',
    width: 4672,
    height: 7008,
    alt: 'OUTDOOR - TOM04827-9.jpg'
  },
  {
    src: '/images/gallery/OUTDOOR/TOM04928-10.jpg',
    width: 7008,
    height: 4672,
    alt: 'OUTDOOR - TOM04928-10.jpg'
  },
  {
    src: '/images/gallery/OUTDOOR/TOM05063-11.jpg',
    width: 4672,
    height: 7008,
    alt: 'OUTDOOR - TOM05063-11.jpg'
  },
  {
    src: '/images/gallery/OUTDOOR/TOM05074-12.jpg',
    width: 4672,
    height: 7008,
    alt: 'OUTDOOR - TOM05074-12.jpg'
  },
  {
    src: '/images/gallery/OUTDOOR/TOM05129-13.jpg',
    width: 7008,
    height: 4672,
    alt: 'OUTDOOR - TOM05129-13.jpg'
  }
];

// STUDIO Album
const studioPhotos: Photo[] = [
  {
    src: '/images/gallery/STUDIO/thumbnail.jpg',
    width: 4672,
    height: 7008,
    alt: 'STUDIO - thumbnail.jpg'
  },
  {
    src: '/images/gallery/STUDIO/TMN_8809-32.jpg',
    width: 4024,
    height: 6036,
    alt: 'STUDIO - TMN_8809-32.jpg'
  },
  {
    src: '/images/gallery/STUDIO/TMN_8885-33.jpg',
    width: 4024,
    height: 6036,
    alt: 'STUDIO - TMN_8885-33.jpg'
  },
  {
    src: '/images/gallery/STUDIO/TMN_9000-34.jpg',
    width: 6036,
    height: 4024,
    alt: 'STUDIO - TMN_9000-34.jpg'
  },
  {
    src: '/images/gallery/STUDIO/TMN_9030-35.jpg',
    width: 6036,
    height: 4024,
    alt: 'STUDIO - TMN_9030-35.jpg'
  },
  {
    src: '/images/gallery/STUDIO/TMN_9041-36.jpg',
    width: 6036,
    height: 4024,
    alt: 'STUDIO - TMN_9041-36.jpg'
  },
  {
    src: '/images/gallery/STUDIO/TMN_9098-38.jpg',
    width: 4024,
    height: 6036,
    alt: 'STUDIO - TMN_9098-38.jpg'
  },
  {
    src: '/images/gallery/STUDIO/TMN_9385-40.jpg',
    width: 4024,
    height: 6036,
    alt: 'STUDIO - TMN_9385-40.jpg'
  },
  {
    src: '/images/gallery/STUDIO/TOM03566-4.jpg',
    width: 4672,
    height: 7008,
    alt: 'STUDIO - TOM03566-4.jpg'
  },
  {
    src: '/images/gallery/STUDIO/TOM03707.JPG',
    width: 4608,
    height: 3072,
    alt: 'STUDIO - TOM03707.JPG'
  },
  {
    src: '/images/gallery/STUDIO/TOM03737-7.jpg',
    width: 4672,
    height: 7008,
    alt: 'STUDIO - TOM03737-7.jpg'
  },
  {
    src: '/images/gallery/STUDIO/TOM03826-8.jpg',
    width: 7008,
    height: 4672,
    alt: 'STUDIO - TOM03826-8.jpg'
  },
  {
    src: '/images/gallery/STUDIO/TOM03867-10.jpg',
    width: 4672,
    height: 7008,
    alt: 'STUDIO - TOM03867-10.jpg'
  },
  {
    src: '/images/gallery/STUDIO/TOM03900-12.jpg',
    width: 4672,
    height: 7008,
    alt: 'STUDIO - TOM03900-12.jpg'
  },
  {
    src: '/images/gallery/STUDIO/TOM03951-13.jpg',
    width: 4672,
    height: 7008,
    alt: 'STUDIO - TOM03951-13.jpg'
  },
  {
    src: '/images/gallery/STUDIO/TOM04136-16.jpg',
    width: 4672,
    height: 7008,
    alt: 'STUDIO - TOM04136-16.jpg'
  },
  {
    src: '/images/gallery/STUDIO/TOM04181-17.jpg',
    width: 4672,
    height: 7008,
    alt: 'STUDIO - TOM04181-17.jpg'
  }
];

// COUPLE Album
const couplePhotos: Photo[] = [
  {
    src: '/images/gallery/COUPLE/thumbnail.jpg',
    width: 2560,
    height: 1920,
    alt: 'COUPLE - thumbnail.jpg'
  }
];
// Export all albums
export const albums: Album[] = [
  {
    id: 'coffee',
    title: 'Coffee Shop',
    description: 'Cozy moments at our favorite coffee spot',
    thumbnail: '/images/gallery/COFFEE/thumbnail.jpg',
    photoCount: 17,
    photos: coffeePhotos,
    colorClass: 'color-1'
  },
  {
    id: 'outdoor',
    title: 'Outdoor Adventures',
    description: 'Beautiful outdoor photography sessions',
    thumbnail: '/images/gallery/OUTDOOR/thumbnail.jpg',
    photoCount: 16,
    photos: outdoorPhotos,
    colorClass: 'color-2'
  },
  {
    id: 'studio',
    title: 'Studio Sessions',
    description: 'Professional studio photography moments',
    thumbnail: '/images/gallery/STUDIO/thumbnail.jpg',
    photoCount: 17,
    photos: studioPhotos,
    colorClass: 'color-3'
  },
  {
    id: 'couple',
    title: 'Couple Moments',
    description: 'Special moments captured together',
    thumbnail: '/images/gallery/COUPLE/thumbnail.jpg',
    photoCount: 1,
    photos: couplePhotos,
    colorClass: 'color-4'
  },
  {
    id: 'all',
    title: 'All Photos',
    description: 'All photos from our special day',
    thumbnail: '/images/gallery/COFFEE/thumbnail.jpg',
    photoCount: 51,
    photos: [...coffeePhotos, ...outdoorPhotos, ...studioPhotos, ...couplePhotos],
    colorClass: 'color-5'
  }
];

// Helper to get album by id
export const getAlbumById = (id: string): Album | undefined => {
  return albums.find(album => album.id === id);
};
