'use client';

import { useState } from 'react';
import ReliableQRCode from '@/components/ReliableQRCode';

export default function QRGenerator() {
  const [url, setUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [size, setSize] = useState(300);

  // Style options for QR code customization
  const [styleOptions, setStyleOptions] = useState({
    dotsColor: '#758362',
    dotsType: 'rounded' as 'square' | 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'extra-rounded',
    backgroundColor: '#ffffff',
    cornersSquareColor: '#758362',
    cornersSquareType: 'extra-rounded' as 'square' | 'dot' | 'extra-rounded',
    cornersDotColor: '#758362',
    cornersDotType: 'dot' as 'square' | 'dot',
    logoMargin: 10,
    logoSize: 0.2
  });

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fh5co-section">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
            <h2>QR Code Generator</h2>
            <p>Generate beautiful QR codes with custom logos for your wedding invitations or any other purpose.</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="fh5co-blog">
              <div className="blog-text">
                <h3>QR Code Settings</h3>

                <div className="form-group">
                  <label htmlFor="url">URL to encode:</label>
                  <input
                    type="url"
                    id="url"
                    className="form-control"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="logo">Logo Image (optional):</label>
                  <input
                    type="file"
                    id="logo"
                    className="form-control"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                  <small className="help-block">
                    Upload a logo to place in the center of the QR code
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="size">QR Code Size:</label>
                  <select
                    id="size"
                    className="form-control"
                    value={size}
                    onChange={(e) => setSize(Number(e.target.value))}
                  >
                    <option value={200}>Small (200px)</option>
                    <option value={300}>Medium (300px)</option>
                    <option value={400}>Large (400px)</option>
                    <option value={500}>Extra Large (500px)</option>
                  </select>
                </div>

                <div className="form-group">
                  <h4>Style Customization</h4>
                  <p className="text-muted">Customize your QR code with colors, logos, and styling options.</p>
                </div>

                    <div className="form-group">
                      <label htmlFor="dotsColor">Dots Color:</label>
                      <div className="row">
                        <div className="col-md-6">
                          <input
                            type="color"
                            id="dotsColor"
                            className="form-control"
                            value={styleOptions.dotsColor}
                            onChange={(e) => setStyleOptions(prev => ({ ...prev, dotsColor: e.target.value }))}
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="2E8B57"
                            value={styleOptions.dotsColor.replace('#', '')}
                            onChange={(e) => {
                              const hexValue = e.target.value.replace('#', '');
                              if (/^[0-9A-Fa-f]{6}$/.test(hexValue)) {
                                setStyleOptions(prev => ({ ...prev, dotsColor: `#${hexValue}` }));
                              }
                            }}
                          />
                        </div>
                      </div>
                      <small className="help-block">Enter hex code without # (e.g., 2E8B57) | Popular: 8B4513, 2E8B57, 4682B4, 800080</small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="backgroundColor">Background Color:</label>
                      <div className="row">
                        <div className="col-md-6">
                          <input
                            type="color"
                            id="backgroundColor"
                            className="form-control"
                            value={styleOptions.backgroundColor}
                            onChange={(e) => setStyleOptions(prev => ({ ...prev, backgroundColor: e.target.value }))}
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="FFFFFF"
                            value={styleOptions.backgroundColor.replace('#', '')}
                            onChange={(e) => {
                              const hexValue = e.target.value.replace('#', '');
                              if (/^[0-9A-Fa-f]{6}$/.test(hexValue)) {
                                setStyleOptions(prev => ({ ...prev, backgroundColor: `#${hexValue}` }));
                              }
                            }}
                          />
                        </div>
                      </div>
                      <small className="help-block">Enter hex code without # (e.g., FFFFFF) | Popular: FFFFFF, F5F5DC, F0F8FF, FFF8DC</small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="cornersSquareColor">Corner Squares Color:</label>
                      <div className="row">
                        <div className="col-md-6">
                          <input
                            type="color"
                            id="cornersSquareColor"
                            className="form-control"
                            value={styleOptions.cornersSquareColor}
                            onChange={(e) => setStyleOptions(prev => ({ ...prev, cornersSquareColor: e.target.value }))}
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="2E8B57"
                            value={styleOptions.cornersSquareColor.replace('#', '')}
                            onChange={(e) => {
                              const hexValue = e.target.value.replace('#', '');
                              if (/^[0-9A-Fa-f]{6}$/.test(hexValue)) {
                                setStyleOptions(prev => ({ ...prev, cornersSquareColor: `#${hexValue}` }));
                              }
                            }}
                          />
                        </div>
                      </div>
                      <small className="help-block">Enter hex code without # (e.g., 2E8B57) | Popular: 8B4513, 2E8B57, 4682B4, 800080</small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="cornersDotColor">Corner Dots Color:</label>
                      <div className="row">
                        <div className="col-md-6">
                          <input
                            type="color"
                            id="cornersDotColor"
                            className="form-control"
                            value={styleOptions.cornersDotColor}
                            onChange={(e) => setStyleOptions(prev => ({ ...prev, cornersDotColor: e.target.value }))}
                          />
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="2E8B57"
                            value={styleOptions.cornersDotColor.replace('#', '')}
                            onChange={(e) => {
                              const hexValue = e.target.value.replace('#', '');
                              if (/^[0-9A-Fa-f]{6}$/.test(hexValue)) {
                                setStyleOptions(prev => ({ ...prev, cornersDotColor: `#${hexValue}` }));
                              }
                            }}
                          />
                        </div>
                      </div>
                      <small className="help-block">Enter hex code without # (e.g., 2E8B57) | Popular: 8B4513, 2E8B57, 4682B4, 800080</small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="logoSize">Logo Size:</label>
                      <input
                        type="range"
                        id="logoSize"
                        className="form-control"
                        min="0.1"
                        max="0.4"
                        step="0.05"
                        value={styleOptions.logoSize}
                        onChange={(e) => setStyleOptions(prev => ({ ...prev, logoSize: parseFloat(e.target.value) }))}
                      />
                      <small className="help-block">
                        Logo size: {Math.round(styleOptions.logoSize * 100)}% of QR code
                      </small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="logoMargin">Logo Margin:</label>
                      <input
                        type="range"
                        id="logoMargin"
                        className="form-control"
                        min="0"
                        max="20"
                        step="1"
                        value={styleOptions.logoMargin}
                        onChange={(e) => setStyleOptions(prev => ({ ...prev, logoMargin: parseInt(e.target.value) }))}
                      />
                      <small className="help-block">
                        Logo margin: {styleOptions.logoMargin}px
                      </small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="dotsType">Dots Type:</label>
                      <select
                        id="dotsType"
                        className="form-control"
                        value={styleOptions.dotsType}
                        onChange={(e) => setStyleOptions(prev => ({ ...prev, dotsType: e.target.value as 'square' | 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'rounded' }))}
                      >
                        <option value="square">Square</option>
                        <option value="rounded">Rounded</option>
                        <option value="dots">Dots</option>
                        <option value="classy">Classy</option>
                        <option value="classy-rounded">Classy Rounded</option>
                        <option value="rounded">Extra Rounded</option>
                      </select>
                      <small className="help-block">Choose the style of the QR code dots</small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="cornersSquareType">Corner Squares Type:</label>
                      <select
                        id="cornersSquareType"
                        className="form-control"
                        value={styleOptions.cornersSquareType}
                        onChange={(e) => setStyleOptions(prev => ({ ...prev, cornersSquareType: e.target.value as 'square' | 'dot' | 'extra-rounded' }))}
                      >
                        <option value="square">Square</option>
                        <option value="dot">Dot</option>
                        <option value="extra-rounded">Extra Rounded</option>
                      </select>
                      <small className="help-block">Choose the style of the corner squares</small>
                    </div>

                    <div className="form-group">
                      <label htmlFor="cornersDotType">Corner Dots Type:</label>
                      <select
                        id="cornersDotType"
                        className="form-control"
                        value={styleOptions.cornersDotType}
                        onChange={(e) => setStyleOptions(prev => ({ ...prev, cornersDotType: e.target.value as 'square' | 'dot' }))}
                      >
                        <option value="square">Square</option>
                        <option value="dot">Dot</option>
                      </select>
                      <small className="help-block">Choose the style of the corner dots</small>
                    </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="fh5co-blog">
              <div className="blog-text">
                <h3>Preview</h3>
                <ReliableQRCode
                  url={url}
                  logoUrl={logoUrl}
                  size={size}
                  styleOptions={styleOptions}
                  className="mt-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="fh5co-blog">
              <div className="blog-text">
                <h3>How to use:</h3>
                <ol>
                  <li>Enter the URL you want to encode in the QR code</li>
                  <li>Optionally upload a logo image to place in the center</li>
                  <li>Select the size that works best for your needs</li>
                  <li>Customize colors and styling options</li>
                  <li>The QR code will generate automatically as you type</li>
                  <li>Use the &quot;Download QR Code&quot; button to save the image</li>
                </ol>

                <h4>QR Code Features:</h4>
                <ul>
                  <li><strong>Logo Support:</strong> Add your wedding logo or any image to the center of the QR code</li>
                  <li><strong>Custom Styling:</strong> Choose colors, dot styles, and corner designs</li>
                  <li><strong>High Quality:</strong> Generate PNG images perfect for printing</li>
                  <li><strong>Reliable:</strong> Uses advanced QR code generation for maximum compatibility</li>
                </ul>

                <h4>Customization Options:</h4>
                <ul>
                  <li><strong>Dots Color:</strong> Change the color of the QR code dots</li>
                  <li><strong>Background Color:</strong> Set the background color of the QR code</li>
                  <li><strong>Corner Colors:</strong> Customize corner squares and dots colors</li>
                  <li><strong>Logo Size:</strong> Adjust logo size from 10% to 40% of QR code</li>
                  <li><strong>Logo Margin:</strong> Control the white space around the logo</li>
                  <li><strong>Dots Type:</strong> Choose from square, rounded, dots, classy, classy-rounded, or rounded</li>
                  <li><strong>Corner Types:</strong> Customize corner squares and dots styles</li>
                  <li><strong>Color Input:</strong> Use color picker or enter hex codes without # (e.g., 2E8B57)</li>
                </ul>

                <h4>Tips for best results:</h4>
                <ul>
                  <li>Use high-contrast colors for better QR code readability</li>
                  <li>Keep logo size reasonable - too large may affect QR code scanning</li>
                  <li>Test the QR code by scanning it with your phone before using</li>
                  <li>For wedding invitations, consider using your wedding colors</li>
                  <li>Use complementary colors that match your wedding theme</li>
                  <li>Ensure sufficient contrast between dots and background</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
