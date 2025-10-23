'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface QRCodeStyleOptions {
  dotsColor: string;
  dotsType: 'square' | 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded';
  backgroundColor: string;
  cornersSquareColor: string;
  cornersSquareType: 'square' | 'dot' | 'extra-rounded';
  cornersDotColor: string;
  cornersDotType: 'square' | 'dot';
  logoMargin: number;
  logoSize: number;
}

interface ReliableQRCodeProps {
  url: string;
  logoUrl?: string;
  size?: number;
  className?: string;
  styleOptions?: Partial<QRCodeStyleOptions>;
  onGenerated?: (qrCode: unknown) => void;
}

export default function ReliableQRCode({
  url,
  logoUrl,
  size = 300,
  className = '',
  styleOptions = {},
  onGenerated
}: ReliableQRCodeProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrInstance, setQrInstance] = useState<unknown>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  const generateQRCode = useCallback(async () => {
    if (!url.trim()) return;

    setIsGenerating(true);

    try {
      // Use qr-code-styling library with proper form values
      const QRCodeStyling = (await import('qr-code-styling')).default;

      const qr = new QRCodeStyling({
        width: size,
        height: size,
        type: 'svg',
        data: url,
        image: logoUrl || undefined,
        dotsOptions: {
          color: styleOptions.dotsColor,
          type: styleOptions.dotsType
        },
        backgroundOptions: {
          color: styleOptions.backgroundColor,
        },
        cornersSquareOptions: {
          color: styleOptions.cornersSquareColor,
          type: styleOptions.cornersSquareType
        },
        cornersDotOptions: {
          color: styleOptions.cornersDotColor,
          type: styleOptions.cornersDotType
        },
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: styleOptions.logoMargin,
          imageSize: styleOptions.logoSize,
          saveAsBlob: true,
        }
      });

      // Create a container for the QR code
      const container = document.createElement('div');
      qr.append(container);

      // Display the SVG directly
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
        qrRef.current.appendChild(container);
        setQrInstance(qr);
        setIsGenerating(false);
      }

      // Create a mock QR code object for compatibility
      const mockQRCode = {
        append: (container: HTMLElement) => {
          container.innerHTML = '';
          qr.append(container);
        },
        download: (options: { name: string; extension: string }) => {
          qr.download({ name: options.name, extension: options.extension as 'png' | 'svg' });
        }
      };

      onGenerated?.(mockQRCode);
    } catch (error) {
      console.error('Error generating QR code:', error);
      setIsGenerating(false);
    }
  }, [url, size, styleOptions, logoUrl, onGenerated]);

  const downloadQR = () => {
    if (qrInstance && typeof qrInstance === 'object' && qrInstance !== null && 'download' in qrInstance) {
      (qrInstance as { download: (options: { name: string; extension: string }) => void }).download({
        name: 'qr-code',
        extension: 'png'
      });
    }
  };

  useEffect(() => {
    if (url) {
      generateQRCode();
    }
  }, [url, size, styleOptions, logoUrl, generateQRCode]);





  return (
    <div className={`reliable-qr-code ${className}`}>
      <div className="text-center">
        {isGenerating && (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Generating QR Code...</span>
            </div>
            <p className="mt-2 text-muted">Generating QR Code...</p>
          </div>
        )}

        <div
          ref={qrRef}
          style={{
            display: isGenerating ? 'none' : 'block',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            minHeight: `${size}px`,
            minWidth: `${size}px`,
            textAlign: 'center',
            padding: '10px'
          }}
        />

        {!isGenerating && url && (
          <div className="text-center">
            <p className="text-success">✓ QR Code generated successfully!</p>
          </div>
        )}
      </div>

      {logoUrl && (
        <div className="mt-3 text-center">
          <img src={logoUrl} alt="Logo" style={{ width: '100px', height: '100px' }} />
        </div>
      )}

      {qrInstance !== null && !isGenerating && (
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
