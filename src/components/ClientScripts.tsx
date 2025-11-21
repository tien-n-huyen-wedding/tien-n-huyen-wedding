'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Extend Window interface to include jQuery
declare global {
  interface Window {
    jQuery?: unknown;
    $?: unknown;
  }
}

export default function ClientScripts() {
  useEffect(() => {
    // Initialize jQuery-based animations and plugins only on client side
    const initializeScripts = () => {
      if (typeof window !== 'undefined' && window.jQuery) {
        // Initialize any jQuery plugins here
        console.log('jQuery scripts initialized');
      }
    };

    // Wait for scripts to load
    const timer = setTimeout(initializeScripts, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Script src="/js/modernizr-2-6-2-min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery-easing-1-3.js" strategy="afterInteractive" />
      <Script src="/js/bootstrap.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.waypoints.min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.stellar.min.js" strategy="afterInteractive" />
      <Script src="/js/owl-carousel-min.js" strategy="afterInteractive" />
      <Script src="/js/jquery.magnific-popup.min.js" strategy="afterInteractive" />
      <Script src="/js/magnific-popup-options.js" strategy="afterInteractive" />
      <Script src="/js/jquery.countTo.js" strategy="afterInteractive" />
      <Script src="/js/main.js" strategy="afterInteractive" />
    </>
  );
}
