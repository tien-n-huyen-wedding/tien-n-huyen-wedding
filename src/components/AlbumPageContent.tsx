'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RowsPhotoAlbum, MasonryPhotoAlbum } from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import "react-photo-album/masonry.css";
import "react-photo-album/rows.css";
import { Album } from '@/lib/galleryAlbums';
import { Fullscreen, Slideshow, Thumbnails, Zoom } from 'yet-another-react-lightbox/plugins';

interface AlbumPageContentProps {
  album: Album;
}

export default function AlbumPageContent({ album }: AlbumPageContentProps) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <div id="page">
        {/* Header */}
        <header
          id="fh5co-header"
          className="fh5co-cover"
          role="banner"
          style={{
            backgroundImage: `url(${album.thumbnail})`,
            height: '900px',
            backgroundSize: 'auto',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            width: '100%'
          }}
        >
          <div className="overlay" style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0
          }}></div>
          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <div className="row">
              <div className="col-md-8 col-md-offset-2 text-center">
                <div className="display-t" style={{ height: '900px', display: 'table', width: '100%' }}>
                  <div className="display-tc" style={{ display: 'table-cell', verticalAlign: 'middle', opacity: 1, visibility: 'visible' }}>
                    <h1 style={{ color: 'white', margin: 0, padding: 0, fontSize: '100px', lineHeight: '1.5' }}>{album.title}</h1>
                    <h2 style={{ color: 'white', margin: 0, padding: 0, fontSize: '20px', lineHeight: '1.5', marginTop: '20px' }}>{album.description}</h2>
                    <p style={{ color: 'white', fontSize: '18px', marginTop: '30px' }}>
                      <span style={{ marginRight: '8px' }}>📸</span>
                      {album.photoCount} Photos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Back Button */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '30px 20px 20px'
        }}>
          <Link
            href="/#fh5co-gallery"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '10px 20px',
              background: '#f5f5f5',
              color: '#333',
              textDecoration: 'none',
              borderRadius: '6px',
              border: '1px solid #ddd',
              fontSize: '15px',
              transition: 'all 0.3s ease'
            }}
            className="back-button"
          >
            <span style={{ marginRight: '8px' }}>←</span> Back to Gallery
          </Link>
        </div>

        {/* Photo Album */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '20px',
          marginBottom: '60px'
        }}>
          <MasonryPhotoAlbum photos={album.photos} onClick={({ index }) => setIndex(index)} />
        </div>

        {/* Lightbox */}
        <Lightbox
          slides={album.photos}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          styles={{
            container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' }
          }}
          plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        />

        {/* Footer */}
        <footer style={{
          background: '#f8f9fa',
          padding: '30px 0',
          marginTop: '40px',
          borderTop: '1px solid #e9ecef'
        }}>
          <div style={{
            maxWidth: '1400px',
            margin: '0 auto',
            textAlign: 'center',
            color: '#6c757d'
          }}>
            <p style={{ margin: 0, fontSize: '14px' }}>
              &copy; 2025 Wedding. All Rights Reserved.
            </p>
          </div>
        </footer>

        <style jsx>{`
          :global(body) {
            margin: 0;
            padding: 0;
          }

          :global(#fh5co-header.fh5co-cover) {
            height: 900px !important;
          }

          :global(#fh5co-header .display-t),
          :global(#fh5co-header .display-tc) {
            height: 900px !important;
          }

          :global(.react-photo-album) {
            background: transparent;
          }

          :global(.react-photo-album img) {
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-radius: 8px;
            display: block;
          }

          :global(.react-photo-album img:hover) {
            transform: scale(1.02);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          }

          .back-button:hover {
            background: #e5e5e5 !important;
            border-color: #ccc !important;
          }

          @media (max-width: 768px) {
            :global(#fh5co-header.fh5co-cover) {
              height: 600px !important;
            }

            :global(#fh5co-header .display-t) {
              height: 600px !important;
            }

            :global(#fh5co-header h1) {
              font-size: 40px !important;
            }
            :global(#fh5co-header h2) {
              font-size: 18px !important;
              margin-top: 15px !important;
            }
            :global(#fh5co-header p) {
              font-size: 16px !important;
              margin-top: 20px !important;
            }
          }

          @media (max-width: 480px) {
            :global(#fh5co-header h1) {
              font-size: 30px !important;
            }
            :global(#fh5co-header h2) {
              font-size: 16px !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}

