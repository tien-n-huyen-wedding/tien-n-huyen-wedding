'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface QRCodeStyleOptions {
  dotsColor: string;
  randomDotsColor: string;
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

          // Generate dots line by line inside the circular area
          const dotSize = 3; // Fixed dot size
          const lineSpacing = 8; // Space between lines
          const dotSpacing = 6; // Space between dots in a line
          const generateLines = (x: number): { linesX: { startX: number; endX: number; startY: number; endY: number }[]; linesY: { startX: number; endX: number; startY: number; endY: number; orientation: string }[] } => {
            const r = (x * Math.sqrt(2)) / 2
            const inner = x / 2 + 1;
            const maxOffset = r - inner + lineSpacing;

            if (maxOffset <= 0) return { linesX: [], linesY: [] };

            const nEachSide = Math.floor(maxOffset / lineSpacing);
            const linesX = [];
            const linesY = [];

            for (let i = 0; i <= nEachSide; i++) {
              const offset = inner + i * lineSpacing;

              const yTop = centerY - offset;
              const xLenTop = Math.sqrt(r * r - (yTop - centerY) ** 2);
              linesX.push({
                startX: centerX - xLenTop,
                endX: centerX + xLenTop,
                startY: yTop,
                endY: yTop
              });

              const yBottom = centerY + offset - lineSpacing;
              const xLenBottom = Math.sqrt(r * r - (yBottom - centerY) ** 2);
              linesX.push({
                startX: centerX - xLenBottom,
                endX: centerX + xLenBottom,
                startY: yBottom,
                endY: yBottom
              });
            }

            for (let i = 0; i <= nEachSide; i++) {
              const offset = inner + i * lineSpacing;

              const xLeft = centerX - offset;
              if (Math.abs(xLeft - centerX) < r) {
                const dy = Math.sqrt(r * r - (xLeft - centerX) ** 2);
                linesY.push({
                  startX: xLeft,
                  endX: xLeft,
                  startY: centerY - dy,
                  endY: centerY + dy,
                  orientation: 'v',
                });
              }

              // Phải
              const xRight = centerX + offset;
              if (Math.abs(xRight - centerX) < r) {
                const dy = Math.sqrt(r * r - (xRight - centerX) ** 2);
                linesY.push({
                  startX: xRight,
                  endX: xRight,
                  startY: centerY - dy,
                  endY: centerY + dy,
                  orientation: 'v',
                });
              }
            }

            return { linesX, linesY };
          }

          // Generate lines using your function
          const { linesX, linesY } = generateLines(size);

          // Draw random dots on each line
          linesX.forEach((line) => {
            const lineLength = (line.endX - line.startX);
            const numDotsInLine = Math.floor(lineLength / dotSpacing);

            // Generate dots in this line with random placement
            for (let dotIndex = 0; dotIndex < numDotsInLine; dotIndex++) {
              // Random chance to skip this dot (40% chance to skip)
              if (Math.random() < 0.5) continue;

              const x = line.startX + (dotIndex * dotSpacing);
              const y = line.startY;

              const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
              dot.setAttribute('cx', x.toString());
              dot.setAttribute('cy', y.toString());
              dot.setAttribute('r', dotSize.toString());
              dot.setAttribute('fill', styleOptions.randomDotsColor || styleOptions.dotsColor || '#758362');

              svg.appendChild(dot);
            }
          });

          linesY.forEach((line) => {
            const lineLength = (line.endY - line.startY);
            const numDotsInLine = Math.floor(lineLength / dotSpacing);

            // Generate dots in this line with random placement
            for (let dotIndex = 0; dotIndex < numDotsInLine; dotIndex++) {
              // Random chance to skip this dot (40% chance to skip)
              if (Math.random() < 0.5) continue;

              const x = line.startX;
              const y = line.startY + (dotIndex * dotSpacing);

              const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
              dot.setAttribute('cx', x.toString());
              dot.setAttribute('cy', y.toString());
              dot.setAttribute('r', dotSize.toString());
              dot.setAttribute('fill', styleOptions.randomDotsColor || styleOptions.dotsColor || '#758362');

              svg.appendChild(dot);
            }
          });

          // Create circular path for text
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          const pathData = `M ${centerX - finalRadius} ${centerY} A ${finalRadius} ${finalRadius} 0 1 1 ${centerX + finalRadius} ${centerY} A ${finalRadius} ${finalRadius} 0 1 1 ${centerX - finalRadius} ${centerY}`;
          path.setAttribute('d', pathData);
          path.setAttribute('id', 'textPath');
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke', styleOptions.dotsColor || '#758362');
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

  const downloadQR = async () => {
    if (!qrRef.current) return;

    try {
      // Get the wrapper element that contains both QR code and circular elements
      const wrapper = qrRef.current.querySelector('div[style*="position: relative"]') as HTMLElement;
      if (!wrapper) {
        // Fallback to original QR code download if no wrapper found
        if (qrInstance && typeof qrInstance === 'object' && qrInstance !== null && 'download' in qrInstance) {
          (qrInstance as { download: (options: { name: string; extension: string }) => void }).download({
            name: 'qr-code',
            extension: 'png'
          });
        }
        return;
      }

      // Use html2canvas to capture the entire circular design
      const html2canvas = (await import('html2canvas')).default;

      const canvas = await html2canvas(wrapper, {
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: null
      } as any);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'wedding-qr-code.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, 'image/png');
    } catch (error) {
      console.error('Error downloading circular QR code:', error);
      // Fallback to original download method
      if (qrInstance && typeof qrInstance === 'object' && qrInstance !== null && 'download' in qrInstance) {
        (qrInstance as { download: (options: { name: string; extension: string }) => void }).download({
          name: 'qr-code',
          extension: 'png'
        });
      }
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

      </div>

    </div>
  );
}
