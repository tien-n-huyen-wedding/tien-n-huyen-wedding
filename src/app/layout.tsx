/* eslint-disable @next/next/no-css-tags */
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import ClientScripts from "@/components/ClientScripts";
// Local fonts are now defined in globals.css

export const metadata: Metadata = {
  title: "Wedding - Phan Tiến & Lệ Huyền",
  description: "We are getting married! Join us for our special day on 30 November 2025 in Gia Huy Palace, Đà Nẵng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/css/animate.css" />
        <link rel="stylesheet" href="/css/icomoon.css" />
        <link rel="stylesheet" href="/css/bootstrap.css" />
        <link rel="stylesheet" href="/css/magnific-popup.css" />
        <link rel="stylesheet" href="/css/owl.carousel.min.css" />
        <link rel="stylesheet" href="/css/owl.theme.default.min.css" />
        <link rel="stylesheet" href="/css/style.css" />
      </head>
      <body className="antialiased">
        <div className="fh5co-loader"></div>

        <div id="page">
          <nav className="fh5co-nav" role="navigation">
            <div className="container">
              <div className="row">
                <div className="col-xs-2">
                  <div id="fh5co-logo">
                    <Link href="/">Wedding<strong>.</strong></Link>
                  </div>
                </div>
                <div className="col-xs-10 text-right menu-1">
                  <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">Story</Link></li>
                    <li className="has-dropdown">
                      <Link href="/services">Services</Link>
                      <ul className="dropdown">
                        <li><Link href="#">Web Design</Link></li>
                        <li><Link href="#">eCommerce</Link></li>
                        <li><Link href="#">Branding</Link></li>
                        <li><Link href="#">API</Link></li>
                      </ul>
                    </li>
                    <li className="has-dropdown">
                      <Link href="/gallery">Gallery</Link>
                      <ul className="dropdown">
                        <li><Link href="#">HTML5</Link></li>
                        <li><Link href="#">CSS3</Link></li>
                        <li><Link href="#">Sass</Link></li>
                        <li><Link href="#">jQuery</Link></li>
                      </ul>
                    </li>
                    <li><Link href="/contact">Contact</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>

          {children}

          <footer id="fh5co-footer" role="contentinfo">
            <div className="container">
              <div className="row row-bottom-padded-sm">
                <div className="col-md-12">
                  <div className="fh5co-social">
                    <ul className="fh5co-social">
                      <li><a href="#"><i className="icon-facebook"></i></a></li>
                      <li><a href="#"><i className="icon-twitter"></i></a></li>
                      <li><a href="#"><i className="icon-instagram"></i></a></li>
                      <li><a href="#"><i className="icon-linkedin"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="fh5co-copyright">
                    <p>&copy; 2016 Free HTML5 Template. All Rights Reserved. <br />Made with <i className="icon-heart"></i> by <a href="http://freehtml5.co/" target="_blank" rel="noopener noreferrer">FreeHTML5.co</a> / Demo Images: <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer">Unsplash</a></p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <ClientScripts />
      </body>
    </html>
  );
}
