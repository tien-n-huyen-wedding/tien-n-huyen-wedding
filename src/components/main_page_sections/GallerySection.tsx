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
  description = 'Album những lần chúng tôi "ngã vào lòng nhau" (cả nghĩa đen và nghĩa bóng)! Hãy ghé qua để cảm nhận những cung bậc cảm xúc "ngọt đến tiểu đường" của chúng mình nhé ^^'
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
