/* eslint-disable @next/next/no-css-tags */
import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientScripts from "@/components/ClientScripts";
import Navigation from "@/components/Navigation";
import { getBaseUrl } from "@/lib/env";
// Local fonts are now defined in globals.css

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
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
    url: `${baseUrl}/`,
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
  verification: {
    // Add your verification tokens if needed
    // google: "your-google-verification-token",
    // yandex: "your-yandex-verification-token",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon Tags */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#758362" />
        <meta name="msapplication-TileImage" content="/favicon.ico" />
        <meta name="theme-color" content="#758362" />

        {/* Meta Image Tags */}
        <meta property="og:image" content={`${baseUrl}/images/main-qr-code.png`} />
        <meta property="og:image:secure_url" content={`${baseUrl}/images/main-qr-code.png`} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content="Quang Tiến & Lệ Huyền Wedding" />
        <meta property="og:image:type" content="image/png" />

        <meta name="twitter:image" content={`${baseUrl}/images/main-qr-code.png`} />
        <meta name="twitter:image:alt" content="Quang Tiến & Lệ Huyền Wedding" />

        <meta name="image" content={`${baseUrl}/images/main-qr-code.png`} />
        <meta itemProp="image" content={`${baseUrl}/images/main-qr-code.png`} />

        {/* Stylesheets */}
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
          <Navigation />

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
