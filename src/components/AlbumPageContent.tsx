'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { MasonryPhotoAlbum } from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import { Album } from '@/lib/galleryAlbums';
import { optimizePhotos } from '@/utils/image-optimization';
import "react-photo-album/masonry.css";
import 'yet-another-react-lightbox/styles.css';
import "yet-another-react-lightbox/plugins/thumbnails.css";

// Dynamically import lightbox plugins only when needed
let lightboxPlugins: {
  Fullscreen: any;
  Slideshow: any;
  Thumbnails: any;
  Zoom: any;
} | null = null;

const loadLightboxPlugins = async () => {
  if (!lightboxPlugins) {
    const plugins = await import('yet-another-react-lightbox/plugins');
    lightboxPlugins = {
      Fullscreen: plugins.Fullscreen,
      Slideshow: plugins.Slideshow,
      Thumbnails: plugins.Thumbnails,
      Zoom: plugins.Zoom,
    };
  }
  return lightboxPlugins;
};


interface AlbumPageContentProps {
  album: Album;
}

export default function AlbumPageContent({ album }: AlbumPageContentProps) {
  const [index, setIndex] = useState(-1);
  const [plugins, setPlugins] = useState<typeof lightboxPlugins>(null);
  const [useHighQuality, setUseHighQuality] = useState(false);

  // Optimize photos to use optimized or high quality image versions based on toggle
  const optimizedPhotos = useMemo(() => optimizePhotos(album.photos, useHighQuality), [album.photos, useHighQuality]);

  // Load plugins only when lightbox is opened
  useEffect(() => {
    if (index >= 0 && !plugins) {
      loadLightboxPlugins().then(setPlugins);
    }
  }, [index, plugins]);

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

        {/* Back Button and Quality Toggle */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '30px 20px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px'
        }}>
          <Link
            href="/#fh5co-gallery"
            className="back-button"
          >
            <span className="back-icon">←</span>
            <span className="back-text">Back to Gallery</span>
          </Link>

          {/* Quality Toggle */}
          <div className="quality-controls">
            <div
              className="quality-description"
              role="status"
              aria-live="polite"
            >
              <span className="quality-description-title">Chọn chất lượng ảnh</span>
              <span className="quality-description-detail">
                {useHighQuality
                  ? 'Ảnh gốc rõ nét — thời gian tải có thể lâu hơn.'
                  : 'Phiên bản tối ưu — tải nhanh và tiết kiệm dữ liệu.'}
              </span>
              <span className="quality-description-instruction">
                Nhấn vào nút {useHighQuality ? 'Optimized' : 'High Quality'} để chuyển đổi chế độ đến {useHighQuality ? 'Optimized' : 'High Quality'}
              </span>
            </div>

            <button
              onClick={() => setUseHighQuality(!useHighQuality)}
              className="quality-toggle"
              aria-label={useHighQuality ? 'Switch to optimized quality' : 'Switch to high quality'}
            >
              <span className="quality-toggle-icon">
                {useHighQuality ? '📸' : '🖼️'}
              </span>
              <span className="quality-toggle-text">
                {useHighQuality ? 'Switch to optimized quality' : 'Switch to high quality'}
              </span>
            </button>
          </div>
        </div>

        {/* Photo Album */}
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '20px',
          marginBottom: '60px'
        }}>
          <MasonryPhotoAlbum photos={optimizedPhotos} onClick={({ index }) => setIndex(index)} />
        </div>

        {/* Lightbox - only render when opened */}
        {index >= 0 && (
          <Lightbox
            slides={optimizedPhotos}
            open={index >= 0}
            index={index}
            close={() => setIndex(-1)}
            styles={{
              container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' }
            }}
            plugins={plugins ? [plugins.Fullscreen, plugins.Slideshow, plugins.Thumbnails, plugins.Zoom] : []}
          />
        )}

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
            💞💞💞 Show ít thôi ạ 💞💞💞
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

          :global(.quality-controls) {
            display: inline-flex;
            align-items: center;
            gap: 18px;
          }

          :global(.quality-description) {
            display: flex;
            flex-direction: column;
            gap: 4px;
            text-align: right;
            max-width: 260px;
          }

          :global(.quality-description-title) {
            font-size: 15px;
            font-weight: 600;
            color: #F14E95;
            letter-spacing: 0.3px;
          }

          :global(.quality-description-detail) {
            font-size: 13px;
            color: #6c757d;
            line-height: 1.5;
          }

          :global(.quality-description-instruction) {
            font-size: 12px;
            color: #adb5bd;
            line-height: 1.5;
            font-style: italic;
            margin-top: 4px;
            display: block;
          }

          :global(.quality-toggle) {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            padding: 12px 24px;
            background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
            color: #333;
            border: 2px solid #e9ecef;
            border-radius: 50px;
            font-size: 15px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            font-family: 'Work Sans', Arial, sans-serif;
          }

          :global(.quality-toggle:hover) {
            background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
            border-color: #F14E95;
            color: #F14E95;
            box-shadow: 0 4px 12px rgba(241, 78, 149, 0.15);
            transform: translateY(-2px);
          }

          :global(.quality-toggle:active) {
            transform: translateY(0);
          }

          :global(.quality-toggle-icon) {
            font-size: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          :global(.quality-toggle-text) {
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
            :global(.quality-controls) {
              flex: 1 1 100%;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              gap: 12px;
            }
            :global(.quality-description) {
              text-align: center;
              max-width: 100%;
            }
            :global(.quality-toggle) {
              padding: 10px 20px;
              font-size: 14px;
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

