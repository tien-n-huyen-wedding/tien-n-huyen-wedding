/**
 * @deprecated This component is no longer used.
 * Album viewing is now handled by the page at src/app/gallery/[albumId]/page.tsx
 *
 * This file is kept for reference but can be safely deleted.
 * The gallery now uses page-based routing instead of modal dialogs.
 */

'use client';

import { useState } from 'react';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Album } from '@/lib/galleryAlbums';

interface AlbumViewerProps {
  album: Album;
  onClose: () => void;
}

export default function AlbumViewer({ album, onClose }: AlbumViewerProps) {
  const [index, setIndex] = useState(-1);

  return (
    <div className="album-viewer-modal">
      <div className="album-viewer-overlay" onClick={onClose} />
      <div className="album-viewer-content">
        <div className="album-viewer-header">
          <div>
            <h2>{album.title}</h2>
            <p>{album.description}</p>
            <span className="photo-count">{album.photoCount} Photos</span>
          </div>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close album"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="album-viewer-body">
          {album.photos.length > 0 ? (
            <PhotoAlbum
              layout="masonry"
              photos={album.photos}
              onClick={({ index: current }) => setIndex(current)}
            />
          ) : (
            <div className="empty-album">
              <p>No photos available in this album yet.</p>
            </div>
          )}
        </div>

        <Lightbox
          slides={album.photos}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
        />
      </div>

      <style jsx>{`
        .album-viewer-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .album-viewer-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
        }

        .album-viewer-content {
          position: relative;
          background: white;
          border-radius: 12px;
          max-width: 1400px;
          max-height: 90vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .album-viewer-header {
          padding: 24px 32px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          background: #f9fafb;
        }

        .album-viewer-header h2 {
          margin: 0 0 8px 0;
          font-size: 28px;
          color: #111827;
          font-weight: 600;
        }

        .album-viewer-header p {
          margin: 0 0 8px 0;
          color: #6b7280;
          font-size: 16px;
        }

        .photo-count {
          display: inline-block;
          padding: 4px 12px;
          background: #f3e8ff;
          color: #7c3aed;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 500;
        }

        .close-button {
          background: transparent;
          border: none;
          padding: 8px;
          cursor: pointer;
          color: #6b7280;
          transition: all 0.2s;
          border-radius: 8px;
        }

        .close-button:hover {
          background: #e5e7eb;
          color: #111827;
        }

        .album-viewer-body {
          flex: 1;
          overflow-y: auto;
          padding: 32px;
        }

        .empty-album {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          color: #9ca3af;
          font-size: 18px;
        }

        @media (max-width: 768px) {
          .album-viewer-content {
            max-height: 95vh;
            border-radius: 8px;
          }

          .album-viewer-header {
            padding: 16px 20px;
          }

          .album-viewer-header h2 {
            font-size: 22px;
          }

          .album-viewer-body {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
