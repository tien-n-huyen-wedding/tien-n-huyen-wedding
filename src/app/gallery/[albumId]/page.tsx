import { notFound } from 'next/navigation';
import { getAlbumById, albums } from '@/lib/galleryAlbums';
import AlbumPageContent from '@/components/AlbumPageContent';

interface AlbumPageProps {
  params: Promise<{
    albumId: string;
  }>;
}

// Generate static paths for all albums (required for static export)
export function generateStaticParams() {
  return albums.map((album) => ({
    albumId: album.id,
  }));
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { albumId } = await params;
  const album = getAlbumById(albumId);

  if (!album) {
    notFound();
  }

  return <AlbumPageContent album={album} />;
}

