'use client';

import { useState, useEffect } from 'react';

export default function GoogleSheetsStatus() {
  const [isConfigured, setIsConfigured] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if Google Script URL is configured
    const checkConfiguration = () => {
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      setIsConfigured(!!scriptUrl);
      setIsChecking(false);
    };

    checkConfiguration();
  }, []);

  if (isChecking) {
    return null;
  }

  if (isConfigured) {
    return (
      <div className="bg-green-100 border mb-4">
        <p className="text-sm mt-1">✅ Lời chúc sẽ được lưu trữ lâu dài trong Google Sheets</p>
      </div>
    );
  }

  return (
    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
      <div className="flex items-center">
        <span className="text-yellow-500 mr-2">⚠️</span>
        <span className="font-medium">Demo Mode</span>
      </div>
      <p className="text-sm mt-1">
        Lời chúc đang được lưu tạm thời. Để lưu trữ lâu dài, hãy setup Google Sheets theo hướng dẫn trong{' '}
        <a
          href="/GOOGLE-SHEETS-SETUP.md"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-yellow-800"
        >
          GOOGLE-SHEETS-SETUP.md
        </a>
      </p>
    </div>
  );
}
