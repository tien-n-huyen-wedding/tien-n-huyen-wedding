/* eslint-disable @next/next/no-css-tags */
import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import ClientScripts from "@/components/ClientScripts";
// Local fonts are now defined in globals.css

export const metadata: Metadata = {
  title: "Wedding - Quang Tiến & Lệ Huyền",
  description: "We are getting married! Join us for our special day on 30 November 2025 in Gia Huy Palace, Đà Nẵng",
  keywords: [
    "wedding",
    "Quang Tiến",
    "Lệ Huyền",
    "wedding invitation",
    "Gia Huy Palace",
    "Đà Nẵng wedding",
    "November 2025",
    "Tiến and Huyền wedding",
    "đám cưới",
    "thiệp cưới"
  ],
  authors: [{ name: "Quang Tiến & Lệ Huyền" }],
  creator: "Quang Tiến & Lệ Huyền",
  publisher: "Quang Tiến & Lệ Huyền",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: ["en_US"],
    url: "https://tien-n-huyen-wedding.github.io/",
    title: "Wedding - Quang Tiến & Lệ Huyền",
    description: "We are getting married! Join us for our special day on 30 November 2025 in Gia Huy Palace, Đà Nẵng",
    siteName: "Quang Tiến & Lệ Huyền Wedding",
    images: [
      {
        url: "/images/main-qr-code.png",
        width: 800,
        height: 800,
        alt: "Quang Tiến & Lệ Huyền Wedding",
      },
      {
        url: "/images/main_background.jpg",
        width: 1200,
        height: 630,
        alt: "Wedding Background",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedding - Quang Tiến & Lệ Huyền",
    description: "We are getting married! Join us for our special day on 30 November 2025 in Gia Huy Palace, Đà Nẵng",
    images: ["/images/main-qr-code.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    // Add your verification tokens if needed
    // google: "your-google-verification-token",
    // yandex: "your-yandex-verification-token",
  },
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
                    <Image src="/images/second-qr-logo.png" alt="Wedding" width={100} height={100} />
                  </div>
                </div>
                <div className="col-xs-10 text-right menu-1">
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
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="fh5co-copyright">
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
