import { galleryImages } from '@/lib/images';

interface GalleryItem {
  image: string;
  link: string;
  photoCount: string;
  title: string;
  colorClass?: string;
}

interface GallerySectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  galleryItems?: GalleryItem[];
}

const defaultGalleryItems: GalleryItem[] = [
  {
    image: galleryImages.gallery1.src,
    link: "/images/gallery-1.jpg",
    photoCount: "14 Photos",
    title: "Two Glas of Juice"
  },
  {
    image: galleryImages.gallery2.src,
    link: "#",
    photoCount: "30 Photos",
    title: "Timer starts now!",
    colorClass: "color-2"
  },
  {
    image: galleryImages.gallery3.src,
    link: "#",
    photoCount: "30 Photos",
    title: "Timer starts now!",
    colorClass: "color-3"
  },
  {
    image: galleryImages.gallery4.src,
    link: "#",
    photoCount: "30 Photos",
    title: "Timer starts now!",
    colorClass: "color-4"
  },
  {
    image: galleryImages.gallery5.src,
    link: "#",
    photoCount: "30 Photos",
    title: "Timer starts now!",
    colorClass: "color-5"
  },
  {
    image: galleryImages.gallery6.src,
    link: "#",
    photoCount: "30 Photos",
    title: "Timer starts now!",
    colorClass: "color-6"
  },
  {
    image: galleryImages.gallery7.src,
    link: "#",
    photoCount: "30 Photos",
    title: "Timer starts now!",
    colorClass: "color-7"
  },
  {
    image: galleryImages.gallery8.src,
    link: "#",
    photoCount: "30 Photos",
    title: "Timer starts now!",
    colorClass: "color-8"
  },
  {
    image: galleryImages.gallery9.src,
    link: "#",
    photoCount: "30 Photos",
    title: "Timer starts now!",
    colorClass: "color-9"
  }
];

export default function GallerySection({
  title = "Wedding Gallery",
  subtitle = "Our Memories",
  description = "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
  galleryItems = defaultGalleryItems
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
              {galleryItems.map((item, index) => (
                <li
                  key={index}
                  className="one-third animate-box"
                  data-animate-effect="fadeIn"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <a href={item.link} className={item.colorClass}>
                    <div className="case-studies-summary">
                      <span>{item.photoCount}</span>
                      <h2>{item.title}</h2>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
