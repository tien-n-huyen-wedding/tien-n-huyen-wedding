'use client';

import Logo from './Logo';
import { useInvitationProps } from '@/hooks/useInvitationProps';
import { CHANGEABLE_FIELDS, InvitationProps } from './invitation/Invitation';
import Link from 'next/link';
import { albums } from '@/lib/galleryAlbums';

const NAV_LINKS = [
  { href: '/', label: 'Trang chủ' },
  { href: '/gallery/all', label: 'Album ảnh' },
  { href: '/slideshow', label: 'Slideshow' },
  { href: '/wishes', label: 'Lời chúc' },
];
export default function Navigation() {
  const { props, isLoaded } = useInvitationProps(CHANGEABLE_FIELDS as (keyof InvitationProps)[]);

  return (
    <>
      <nav className="fh5co-nav" role="navigation">
        <div className="container">
          <div className="row">
            <div className="col-xs-2">
              <Logo invitationProps={props} isLoaded={isLoaded} />
            </div>
            <div className="col-xs-10 text-right menu-1" style={{ display: 'none' }}>
              <ul>
                <li className="active"><Link href="/">Home</Link></li>
                <li><Link href="/slideshow">Slideshow</Link></li>
                <li><Link href="/wishes">Wishes</Link></li>
                <li><Link href="#fh5co-couple">Couple</Link></li>
                <li><Link href="#fh5co-invitation">Invitation</Link></li>
                <li><Link href="#fh5co-couple-story">Story</Link></li>
                <li className="has-dropdown">
                  <Link href="#fh5co-gallery">Gallery</Link>
                  <ul className="dropdown">
                    {albums.map((album) => (
                      <li key={album.id}>
                        <Link href={`/gallery/${album.id}`}>{album.title}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li><Link href="#fh5co-bank-map">Bank and Map</Link></li>
                <li><Link href="#fh5co-contact">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <style jsx global>{`
        /* Always show hamburger menu button on all screen sizes */
        .fh5co-nav-toggle {
          display: block !important;
          position: fixed !important;
          top: 20px !important;
          right: 20px !important;
          z-index: 3000 !important;
        }

        /* Hide the regular menu on all screen sizes - it will only show in offcanvas */
        .menu-1 {
          display: none !important;
        }

        /* Friendly pastel sidebar theme */
        #fh5co-offcanvas {
          background: linear-gradient(180deg, #fff7f2 0%, #fde4ec 50%, #f9f0ff 100%) !important;
        }
        #fh5co-offcanvas a {
          color: #5a3e36 !important;
        }
        #fh5co-offcanvas a:hover {
          color: #b25f8b !important;
        }
      `}</style>
    </>
  );
}
