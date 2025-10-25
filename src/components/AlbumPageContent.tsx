'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MasonryPhotoAlbum } from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import { Album } from '@/lib/galleryAlbums';
import { Fullscreen, Slideshow, Thumbnails, Zoom } from 'yet-another-react-lightbox/plugins';
import "react-photo-album/masonry.css";
import "react-photo-album/rows.css";
import 'yet-another-react-lightbox/styles.css';
import "yet-another-react-lightbox/plugins/thumbnails.css";


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
            className="back-button"
          >
            <span className="back-icon">←</span>
            <span className="back-text">Back to Gallery</span>
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

          :global(.back-button) {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 12px 24px;
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            color: #333;
            text-decoration: none;
            border-radius: 50px;
            border: 2px solid #e9ecef;
            font-size: 15px;
            font-weight: 500;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          }

          :global(.back-button:hover) {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            border-color: #F14E95;
            color: #F14E95;
            box-shadow: 0 4px 12px rgba(241, 78, 149, 0.15);
            transform: translateY(-2px);
          }

          :global(.back-icon) {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #f8f9fa;
            font-size: 16px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }

          :global(.back-button:hover .back-icon) {
            background: #F14E95;
            color: white;
            transform: translateX(-3px);
          }

          :global(.back-text) {
            font-family: 'Work Sans', Arial, sans-serif;
            letter-spacing: 0.3px;
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

