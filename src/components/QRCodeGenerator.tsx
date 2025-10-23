'use client';

import { useState, useRef, useEffect } from 'react';

interface QRCodeGeneratorProps {
  url: string;
  logoUrl?: string;
  size?: number;
  className?: string;
  onGenerated?: (qrCode: any) => void;
}

export default function QRCodeGenerator({
  url,
  logoUrl,
  size = 300,
  className = '',
  onGenerated
}: QRCodeGeneratorProps) {
  const [qrCode, setQrCode] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (url) {
      generateQRCode();
    }
  }, [url, logoUrl, size]);

  useEffect(() => {
    if (qrRef.current && qrCode) {
      qrRef.current.innerHTML = '';
      qrCode.append(qrRef.current);
    }
  }, [qrCode]);

  const generateQRCode = async () => {
    if (!url.trim()) return;

    setIsGenerating(true);

    try {
      // Dynamic import to avoid Turbopack issues
      const { QRCodeStyling } = await import('qr-code-styling');

      const qr = new QRCodeStyling({
        width: size,
        height: size,
        type: 'svg',
        data: url,
        image: logoUrl || undefined,
        dotsOptions: {
          color: '#758362',
          type: 'rounded'
        },
        backgroundOptions: {
          color: '#ffffff',
        },
        cornersSquareOptions: {
          color: '#758362',
          type: 'rounded'
        },
        cornersDotOptions: {
          color: '#758362',
          type: 'dot'
        },
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 10
        }
      });

      setQrCode(qr);
      onGenerated?.(qr);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQR = () => {
    if (qrCode) {
      qrCode.download({ name: 'qr-code', extension: 'png' });
    }
  };

  return (
    <div className={`qr-code-generator ${className}`}>
      <div
        ref={qrRef}
        className="text-center"
        style={{
          minHeight: `${size}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}
      >
        {isGenerating && (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Generating QR Code...</span>
            </div>
            <p className="mt-2 text-muted">Generating QR Code...</p>
          </div>
        )}
        {!qrCode && !isGenerating && (
          <p className="text-muted">QR code will appear here</p>
        )}
      </div>

      {qrCode && (
        <div className="mt-3 text-center">
          <button
            className="btn btn-success btn-sm"
            onClick={downloadQR}
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
}
