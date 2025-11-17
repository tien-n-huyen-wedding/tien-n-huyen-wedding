'use client';

import { MouseEvent, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
  const router = useRouter();
  const pathname = usePathname();
  const { props, isLoaded } = useInvitationProps(CHANGEABLE_FIELDS as (keyof InvitationProps)[]);

  const handleSectionLink = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, targetId: string) => {
      event.preventDefault();
      const cleanId = targetId.replace('#', '');

      if (pathname !== '/') {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('pendingScrollTarget', cleanId);
        }
        router.push('/');
        return;
      }

      if (typeof window !== 'undefined') {
        const element = document.getElementById(cleanId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    [pathname, router]
  );

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
                <li>
                  <Link href="#fh5co-couple" onClick={(event) => handleSectionLink(event, '#fh5co-couple')}>
                    Couple
                  </Link>
                </li>
                <li>
                  <Link href="#fh5co-invitation" onClick={(event) => handleSectionLink(event, '#fh5co-invitation')}>
                    Invitation
                  </Link>
                </li>
                <li>
                  <Link href="#fh5co-couple-story" onClick={(event) => handleSectionLink(event, '#fh5co-couple-story')}>
                    Story
                  </Link>
                </li>
                <li className="has-dropdown">
                  <Link href="#fh5co-gallery" onClick={(event) => handleSectionLink(event, '#fh5co-gallery')}>
                    Gallery
                  </Link>
                  <ul className="dropdown">
                    {albums.map((album) => (
                      <li key={album.id}>
                        <Link href={`/gallery/${album.id}`}>{album.title}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <Link href="#fh5co-bank-map" onClick={(event) => handleSectionLink(event, '#fh5co-bank-map')}>
                    Bank and Map
                  </Link>
                </li>
                <li>
                  <Link href="#fh5co-contact" onClick={(event) => handleSectionLink(event, '#fh5co-contact')}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <style jsx global>{`
        /* Always show hamburger menu button on all screen sizes */
        .fh5co-nav-toggle {
          display: flex !important;
          align-items: center;
          justify-content: center;
          position: fixed !important;
          top: 20px !important;
          right: 20px !important;
          z-index: 3000 !important;
          width: 48px !important;
          height: 48px !important;
          border-radius: 20% !important;
          border: 2px solid #5d5d5d !important;
          background: transparent !important;
        }

        .fh5co-nav-toggle i,
        .fh5co-nav-toggle i::before,
        .fh5co-nav-toggle i::after {
          background: #5d5d5d !important;
        }

        .fh5co-nav-toggle i {
          width: 24px !important;
          left: 0 !important;
        }

        .fh5co-nav-toggle.active i::before,
        .fh5co-nav-toggle.active i::after {
          background: #5d5d5d !important;
        }

        /* Hide the regular menu on all screen sizes - it will only show in offcanvas */
        .menu-1 {
          display: none !important;
        }

        /* Sidebar slice bar background */
        #fh5co-offcanvas {
          background: linear-gradient(180deg, #e1ffe8 0%, #b7f0c4 60%, #8ad4a5 100%) !important;
        }
        #fh5co-offcanvas a {
          color: #5a3e36 !important;
        }
        #fh5co-offcanvas a:hover {
          color: #2E8B57 !important;
        }
      `}</style>
    </>
  );
}
