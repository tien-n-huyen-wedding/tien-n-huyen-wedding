'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { albums } from '@/lib/galleryAlbums';
import { InvitationProps } from '@/components/invitation/Invitation';

interface GallerySectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  invitationProps?: Partial<InvitationProps>;
  isLoaded?: boolean;
}

export default function GallerySection({
  title = "Wedding Gallery",
  subtitle = "💞💞💞",
  description = 'Album những lần chúng tôi "ngã vào lòng nhau" (cả nghĩa đen và nghĩa bóng)! Hãy ghé qua để cảm nhận những cung bậc cảm xúc "ngọt đến tiểu đường" của chúng tôi nhé ^^',
  invitationProps = {},
  isLoaded = false
}: GallerySectionProps) {
  const coupleGreeting = isLoaded && invitationProps.coupleGreeting ? invitationProps.coupleGreeting : 'chúng tôi';
  const processedDescription = description && coupleGreeting ? description.replace(/chúng tôi/g, coupleGreeting) : description;
  const [loadedThumbnails, setLoadedThumbnails] = useState<Set<string>>(new Set());

  // Lazy load thumbnails when they come into viewport
  useEffect(() => {
    const thumbnailElements = document.querySelectorAll('[data-thumbnail-id]');
    const thumbnailObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const thumbnailId = entry.target.getAttribute('data-thumbnail-id');
            if (thumbnailId) {
              setLoadedThumbnails((prev) => {
                if (!prev.has(thumbnailId)) {
                  return new Set([...prev, thumbnailId]);
                }
                return prev;
              });
              thumbnailObserver.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before entering viewport
      }
    );

    // Observe all elements and check if already in viewport
    thumbnailElements.forEach((el) => {
      thumbnailObserver.observe(el);
      // Also check if already in viewport and load immediately
      const rect = el.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight + 100 && rect.bottom > -100;
      if (isInViewport) {
        const thumbnailId = el.getAttribute('data-thumbnail-id');
        if (thumbnailId) {
          setLoadedThumbnails((prev) => {
            if (!prev.has(thumbnailId)) {
              return new Set([...prev, thumbnailId]);
            }
            return prev;
          });
        }
      }
    });

    return () => {
      thumbnailElements.forEach((el) => thumbnailObserver.unobserve(el));
    };
  }, []);
  return (
    <div id="fh5co-gallery" className="fh5co-section-gray">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
            <span>{subtitle}</span>
            <h2>{title}</h2>
            <p>{processedDescription}</p>
          </div>
        </div>
        <div className="row row-bottom-padded-md">
          <div className="col-md-12">
            <ul id="fh5co-gallery-list">
              {albums.map((album) => (
                <li
                  key={album.id}
                  className="one-third animate-box"
                  data-animate-effect="fadeIn"
                  data-thumbnail-id={album.id}
                  style={{
                    backgroundImage: loadedThumbnails.has(album.id) ? `url(${album.thumbnail})` : 'none',
                    backgroundColor: loadedThumbnails.has(album.id) ? 'transparent' : '#f0f0f0',
                    transition: 'background-image 0.3s ease-in-out'
                  }}
                >
                  <Link
                    href={`/gallery/${album.id}`}
                    className={album.colorClass}
                  >
                    <div className="case-studies-summary">
                      <span>{album.photoCount} Photos</span>
                      <h2>{album.title}</h2>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
