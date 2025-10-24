'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface QRCodeGeneratorProps {
  url: string;
  logoUrl?: string;
  size?: number;
  className?: string;
  onGenerated?: (qrCode: unknown) => void;
}

export default function QRCodeGenerator({
  url,
  logoUrl,
  size = 300,
  className = '',
  onGenerated
}: QRCodeGeneratorProps) {
  const [qrCode, setQrCode] = useState<unknown>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const isValidQRCode = (code: unknown): code is object => {
    return code !== null && typeof code === 'object';
  };

  const generateQRCode = useCallback(async () => {
    if (!url.trim()) return;

    setIsGenerating(true);

    try {
      // Dynamic import to avoid Turbopack issues
      const { default: QRCodeStyling } = await import('qr-code-styling');

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
  }, [url, logoUrl, size, onGenerated]);

  useEffect(() => {
    if (url) {
      generateQRCode();
    }
  }, [url, logoUrl, size, generateQRCode]);

  useEffect(() => {
    if (qrRef.current && qrCode && typeof qrCode === 'object' && qrCode !== null && 'append' in qrCode) {
      qrRef.current.innerHTML = '';
      (qrCode as { append: (container: HTMLElement) => void }).append(qrRef.current);
    }
  }, [qrCode]);

  const downloadQR = async () => {
    if (!qrRef.current) return;

    try {
      // Use html2canvas to capture the QR code with better quality
      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(qrRef.current, {
        background: '#ffffff',
        useCORS: true,
        allowTaint: true
      });

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'qr-code.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error downloading QR code:', error);
      // Fallback to original download method
      if (qrCode && typeof qrCode === 'object' && qrCode !== null && 'download' in qrCode) {
        (qrCode as { download: (options: { name: string; extension: string }) => void }).download({
          name: 'qr-code',
          extension: 'png'
        });
      }
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

      {isValidQRCode(qrCode) && (
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
