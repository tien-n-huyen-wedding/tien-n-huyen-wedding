'use client';

import { useState } from 'react';
import Script from 'next/script';

// Extend Window interface to include jQuery
declare global {
  interface Window {
    jQuery?: unknown;
    $?: unknown;
  }
}

export default function ClientScripts() {
  const [scriptsLoaded, setScriptsLoaded] = useState({
    modernizr: false,
    jquery: false,
    easing: false,
    bootstrap: false,
    waypoints: false,
    stellar: false,
    owl: false,
    magnific: false,
    magnificOptions: false,
    countTo: false,
  });

  // Load main.js only after all dependencies are loaded
  const allDependenciesLoaded =
    scriptsLoaded.jquery &&
    scriptsLoaded.easing &&
    scriptsLoaded.bootstrap &&
    scriptsLoaded.waypoints &&
    scriptsLoaded.stellar &&
    scriptsLoaded.owl &&
    scriptsLoaded.magnific &&
    scriptsLoaded.magnificOptions &&
    scriptsLoaded.countTo;

  return (
    <>
      <Script
        src="/js/modernizr-2.6.2.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptsLoaded((prev) => ({ ...prev, modernizr: true }))}
        onError={(e) => console.error('Failed to load modernizr:', e)}
      />
      <Script
        src="/js/jquery.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptsLoaded((prev) => ({ ...prev, jquery: true }))}
        onError={(e) => console.error('Failed to load jQuery:', e)}
      />
      <Script
        src="/js/jquery.easing.1.3.js"
        strategy="afterInteractive"
        onLoad={() => setScriptsLoaded((prev) => ({ ...prev, easing: true }))}
        onError={(e) => console.error('Failed to load jQuery easing:', e)}
      />
      <Script
        src="/js/bootstrap.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptsLoaded((prev) => ({ ...prev, bootstrap: true }))}
        onError={(e) => console.error('Failed to load Bootstrap:', e)}
      />
      <Script
        src="/js/jquery.waypoints.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptsLoaded((prev) => ({ ...prev, waypoints: true }))}
        onError={(e) => console.error('Failed to load Waypoints:', e)}
      />
      <Script
        src="/js/jquery.stellar.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptsLoaded((prev) => ({ ...prev, stellar: true }))}
        onError={(e) => console.error('Failed to load Stellar:', e)}
      />
      <Script
        src="/js/owl.carousel.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptsLoaded((prev) => ({ ...prev, owl: true }))}
        onError={(e) => console.error('Failed to load Owl Carousel:', e)}
      />
      <Script
        src="/js/jquery.magnific-popup.min.js"
        strategy="afterInteractive"
        onLoad={() => setScriptsLoaded((prev) => ({ ...prev, magnific: true }))}
        onError={(e) => console.error('Failed to load Magnific Popup:', e)}
      />
      <Script
        src="/js/magnific-popup-options.js"
        strategy="afterInteractive"
        onLoad={() => setScriptsLoaded((prev) => ({ ...prev, magnificOptions: true }))}
        onError={(e) => console.error('Failed to load Magnific Popup options:', e)}
      />
      <Script
        src="/js/jquery.countTo.js"
        strategy="afterInteractive"
        onLoad={() => setScriptsLoaded((prev) => ({ ...prev, countTo: true }))}
        onError={(e) => console.error('Failed to load CountTo:', e)}
      />
      {allDependenciesLoaded && (
        <Script
          src="/js/main.js"
          strategy="afterInteractive"
          onError={(e) => console.error('Failed to load main.js:', e)}
        />
      )}
    </>
  );
}
