'use client';

import { useState, useEffect } from 'react';
import { InvitationProps } from '@/components/invitation/Invitation';

interface GoogleSheetsStatusProps {
  invitationProps?: Partial<InvitationProps>;
  isLoaded?: boolean;
}

export default function GoogleSheetsStatus({
  invitationProps = {},
  isLoaded = false
}: GoogleSheetsStatusProps) {
  const [isConfigured, setIsConfigured] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const coupleGreeting = isLoaded && invitationProps.coupleGreeting ? invitationProps.coupleGreeting : 'chúng mình';

  useEffect(() => {
    // Check if Google Script URL is configured
    const checkConfiguration = () => {
      const scriptUrl = "https://script.google.com/macros/s/AKfycbzPd6S9fDQ4FOVzWT0cFVyJHrx0oEGAPCsxztNOOoL8f4Q6xUq4sVu7F7_mIzZ0X4xG-Q/exec";
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
        <p className="text-sm mt-1">✅ Lời chúc sẽ được lưu trữ lâu dài <br /> và {coupleGreeting} sẽ xem đi xem lại nhiều lắm nhé !!!</p>
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
