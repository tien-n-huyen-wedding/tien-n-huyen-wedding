import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wedding Gallery Album',
  description: 'View our beautiful wedding photo album',
};

export default function AlbumLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

