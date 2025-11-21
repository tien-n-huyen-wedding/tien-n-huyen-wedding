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

        {/* Fallback message for when page fails to load */}
        <noscript>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif'
          }}>
            <div style={{ maxWidth: '600px' }}>
              <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
                If you are seeing this page, it means our GitHub Page is experiencing some issues.
              </h1>
              <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#666' }}>
                Please visit{' '}
                <a
                  href="https://tien-n-huyen-wedding.sevalla.app/"
                  style={{ color: '#758362', textDecoration: 'underline' }}
                >
                  https://tien-n-huyen-wedding.sevalla.app/
                </a>{' '}
                to access our website.
              </h2>
            </div>
          </div>
        </noscript>

        <div id="page-error-fallback" style={{ display: 'none' }}>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif'
          }}>
            <div style={{ maxWidth: '600px' }}>
              <h1 style={{ fontSize: '24px', marginBottom: '20px', color: '#333' }}>
                If you are seeing this page, it means our GitHub Page is experiencing some issues.
              </h1>
              <h2 style={{ fontSize: '18px', marginBottom: '20px', color: '#666' }}>
                Please visit{' '}
                <a
                  href="https://tien-n-huyen-wedding.sevalla.app/"
                  style={{ color: '#758362', textDecoration: 'underline' }}
                >
                  https://tien-n-huyen-wedding.sevalla.app/
                </a>{' '}
                to access our website.
              </h2>
            </div>
          </div>
        </div>

        {/* Script to handle error fallback display */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var errorFallback = document.getElementById('page-error-fallback');
                var loader = document.querySelector('.fh5co-loader');
                var pageLoadError = false;

                if (!errorFallback) return;

                // Function to show error fallback
                function showErrorFallback() {
                  if (errorFallback && !pageLoadError) {
                    pageLoadError = true;
                    errorFallback.style.display = 'block';
                    // Hide loader if still visible
                    if (loader) {
                      loader.style.display = 'none';
                    }
                  }
                }

                // Function to hide error fallback
                function hideErrorFallback() {
                  if (errorFallback && !pageLoadError) {
                    errorFallback.style.display = 'none';
                  }
                }

                // Global error handler to catch JavaScript errors and 404s
                window.addEventListener('error', function(event) {
                  // Check if it's a script loading error (404, etc.)
                  if (event.target && (event.target.tagName === 'SCRIPT' || event.target.tagName === 'LINK')) {
                    console.error('Resource failed to load:', event.target.src || event.target.href);
                    // Show error after a delay to allow other scripts to load
                    setTimeout(showErrorFallback, 3000);
                  } else if (event.error) {
                    // JavaScript runtime error (like owl.owlCarousel is not a function)
                    console.error('JavaScript error:', event.error);
                    // Show error after a delay
                    setTimeout(showErrorFallback, 3000);
                  }
                }, true);

                // Catch unhandled promise rejections
                window.addEventListener('unhandledrejection', function(event) {
                  console.error('Unhandled promise rejection:', event.reason);
                  setTimeout(showErrorFallback, 3000);
                });

                // Show error fallback if loader is still visible after timeout
                var timeoutId = setTimeout(function() {
                  if (loader && loader.offsetParent !== null && !pageLoadError) {
                    // Loader is still visible after timeout, show error message
                    showErrorFallback();
                  }
                }, 8000); // 8 seconds timeout

                // Hide error fallback when loader disappears (page loaded successfully)
                var observer = new MutationObserver(function(mutations) {
                  mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                      var loaderStyle = window.getComputedStyle(loader);
                      if ((loaderStyle.display === 'none' || loaderStyle.opacity === '0') && !pageLoadError) {
                        clearTimeout(timeoutId);
                        hideErrorFallback();
                        observer.disconnect();
                      }
                    }
                  });
                });

                if (loader) {
                  observer.observe(loader, {
                    attributes: true,
                    attributeFilter: ['style', 'class']
                  });
                }

                // Check when DOMContentLoaded fires
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', function() {
                    setTimeout(function() {
                      if (loader && loader.offsetParent !== null && !pageLoadError) {
                        // Still loading after DOM ready, might be an issue
                      } else if (!pageLoadError) {
                        clearTimeout(timeoutId);
                        hideErrorFallback();
                      }
                    }, 2000);
                  });
                } else {
                  // DOM already loaded
                  setTimeout(function() {
                    if (loader && loader.offsetParent !== null && !pageLoadError) {
                      // Still loading
                    } else if (!pageLoadError) {
                      clearTimeout(timeoutId);
                      hideErrorFallback();
                    }
                  }, 2000);
                }

                // Store show function globally for use by other scripts
                window.__showErrorFallback = showErrorFallback;
              })();
            `,
          }}
        />

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
