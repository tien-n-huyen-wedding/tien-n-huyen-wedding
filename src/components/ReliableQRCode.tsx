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
  // Circle styling options
  isCircular: boolean;
  topText: string;
  bottomText: string;
  textColor: string;
  textSize: number;
  strokeColor: string;
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
  const totalSize = size * Math.sqrt(2) + 30;

  const generateQRCode = useCallback(async () => {
    if (!url.trim()) return;

    setIsGenerating(true);

    try {
      // Use qr-code-styling library with proper form values
      const { default: QRCodeStyling } = await import('qr-code-styling');

      const qr = new QRCodeStyling({
        width: size - 5,
        height: size - 5,
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

      // Display the SVG directly with custom circular styling
      if (qrRef.current) {
        qrRef.current.innerHTML = '';

        if (styleOptions.isCircular && styleOptions.topText) {
          // Create circular text overlay
          const wrapper = document.createElement('div');
          wrapper.style.position = 'relative';
          wrapper.style.display = 'inline-block';
          wrapper.style.width = `${totalSize}px`;
          wrapper.style.height = `${totalSize}px`;

          // Add QR code container and center it
          container.style.position = 'absolute';
          container.style.top = '50%';
          container.style.left = '50%';
          container.style.transform = 'translate(-50%, -50%)';
          wrapper.appendChild(container);

          // Create SVG overlay for circular text
          const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          svg.setAttribute('width', totalSize.toString());
          svg.setAttribute('height', totalSize.toString());
          svg.style.position = 'absolute';
          svg.style.top = '0';
          svg.style.left = '0';
          svg.style.pointerEvents = 'none';

          const radius = (size * Math.sqrt(2)) / 2; // Radius for text circle: diameter = QR size × √2
          // Ensure the circle fits within the container with some padding
          const maxRadius = totalSize / 2; // Leave 20px padding
          const finalRadius = Math.min(radius, maxRadius);
          const centerX = totalSize / 2;
          const centerY = totalSize / 2;

          // Create circular path for text
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          const pathData = `M ${centerX - finalRadius} ${centerY} A ${finalRadius} ${finalRadius} 0 1 1 ${centerX + finalRadius} ${centerY} A ${finalRadius} ${finalRadius} 0 1 1 ${centerX - finalRadius} ${centerY}`;
          path.setAttribute('d', pathData);
          path.setAttribute('id', 'textPath');
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke', styleOptions.strokeColor || '#758362');
          path.setAttribute('stroke-width', '30');
          svg.appendChild(path);

          // Add top text along the circle
          if (styleOptions.topText) {
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            const textPath = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
            textPath.setAttribute('href', '#textPath');
            textPath.setAttribute('startOffset', '25%');
            textPath.textContent = styleOptions.topText;
            text.appendChild(textPath);
            text.setAttribute('font-size', (styleOptions.textSize || 16).toString());
            text.setAttribute('fill', styleOptions.textColor || '#000000');
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dominant-baseline', 'middle');
            svg.appendChild(text);
          }

          qrRef.current.appendChild(wrapper);
          wrapper.appendChild(svg);
        } else {
          // Display QR code directly without circular styling
          qrRef.current.appendChild(container);
        }

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
  }, [url, size, styleOptions, logoUrl, onGenerated, totalSize]);

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
            minHeight: `${totalSize}px`,
            minWidth: `${totalSize}px`,
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
