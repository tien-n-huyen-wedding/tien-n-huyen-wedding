import Link from 'next/link';
import { albums } from '@/lib/galleryAlbums';

interface GallerySectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function GallerySection({
  title = "Wedding Gallery",
  subtitle = "Our Memories",
  description = "Explore our beautiful wedding photo albums capturing every special moment of our journey together."
}: GallerySectionProps) {
  return (
    <div id="fh5co-gallery" className="fh5co-section-gray">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
            <span>{subtitle}</span>
            <h2>{title}</h2>
            <p>{description}</p>
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
                  style={{ backgroundImage: `url(${album.thumbnail})` }}
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
