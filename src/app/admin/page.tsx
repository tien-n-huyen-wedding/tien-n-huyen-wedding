'use client';

import { useState, useEffect, useCallback } from 'react';
import ReliableQRCode from '@/components/qr_code/ReliableQRCode';
import WeddingPartyCard from '@/components/invitation/WeddingPartyCard';
import { PACKAGES } from '@/utils/constants';

interface ChangeableFields {
  party: string;
  guestName: string;
  invitationText: string;
  invitationSecondText: string;
  thanksText: string;
}

// Default values for comparison
const defaultValues = {
  guestName: 'Bạn Mến Yêu',
  invitationText: 'Trân trọng kính mời:',
  invitationSecondText: 'Đến dự buổi tiệc\nChung vui cùng gia đình chúng tôi tại',
  thanksText: 'Sự hiện diện của quý khách\nlà niềm vinh hạnh lớn cho chúng tôi.'
};

export default function AdminPage() {
  const [fields, setFields] = useState<ChangeableFields>({
    party: 'mainParty',
    guestName: 'Bạn Mến Yêu',
    invitationText: 'Trân trọng kính mời:',
    invitationSecondText: 'Đến dự buổi tiệc\nChung vui cùng gia đình chúng tôi tại',
    thanksText: 'Sự hiện diện của quý khách\nlà niềm vinh hạnh lớn cho chúng tôi.'
  });

  const [generatedUrl, setGeneratedUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Generate URL with query parameters
  const generateUrl = useCallback(() => {
    const baseUrl = 'https://tien-n-huyen-wedding.github.io/';
    const params = new URLSearchParams();

    // Always include party
    params.set('party', fields.party);

    // Only include text fields if they differ from defaults
    if (fields.guestName !== defaultValues.guestName) {
      params.set('guestName', fields.guestName);
    }
    if (fields.invitationText !== defaultValues.invitationText) {
      params.set('invitationText', fields.invitationText);
    }
    if (fields.invitationSecondText !== defaultValues.invitationSecondText) {
      params.set('invitationSecondText', fields.invitationSecondText);
    }
    if (fields.thanksText !== defaultValues.thanksText) {
      params.set('thanksText', fields.thanksText);
    }

    const fullUrl = `${baseUrl}?${params.toString()}`;
    setGeneratedUrl(fullUrl);
    setQrCodeUrl(fullUrl);
  }, [fields]);

  // Auto-generate URL when fields change
  useEffect(() => {
    generateUrl();
  }, [generateUrl]);

  // Copy URL to clipboard
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      alert('URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy URL:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = generatedUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('URL copied to clipboard!');
    }
  };

  // Copy QR Code image
  const copyQRCode = async () => {
    try {
      // Get the QR code container element
      const qrContainer = document.querySelector('.qr-code-container') as HTMLElement;
      if (qrContainer) {
        // Use html2canvas to convert the QR code to an image
        const html2canvas = (await import('html2canvas')).default;

        const canvas = await html2canvas(qrContainer, {
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: null,
          scale: 2 // Higher quality
        } as any);

        canvas.toBlob(async (blob) => {
          if (blob) {
            try {
              await navigator.clipboard.write([
                new ClipboardItem({
                  'image/png': blob
                })
              ]);
              // Silent success - no alert
            } catch (clipboardErr) {
              console.error('Clipboard API failed:', clipboardErr);
              // Fallback: download the image
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'qr-code.png';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
              // Silent download - no alert
            }
          }
        }, 'image/png');
      } else {
        alert('QR Code not found. Please wait for it to load.');
      }
    } catch (err) {
      console.error('Failed to copy QR code:', err);
      alert('Failed to copy QR code. Please try downloading it instead.');
    }
  };

  // Download QR Code image
  const downloadQRCode = async () => {
    try {
      // Get the QR code container element
      const qrContainer = document.querySelector('.qr-code-container') as HTMLElement;
      if (qrContainer) {
        // Use html2canvas to convert the QR code to an image
        const html2canvas = (await import('html2canvas')).default;

        const canvas = await html2canvas(qrContainer, {
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: null,
          scale: 2 // Higher quality
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
      } else {
        alert('QR Code not found. Please wait for it to load.');
      }
    } catch (err) {
      console.error('Failed to download QR code:', err);
      alert('Failed to download QR code.');
    }
  };

  const packageOptions = Object.entries(PACKAGES).map(([key, value]) => ({
    value: key,
    label: value.name
  }));

  return (
    <div className="fh5co-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center fh5co-heading">
            <h2>Wedding Invitation Admin</h2>
            <p>Generate personalized invitation URLs and QR codes for your guests</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="fh5co-blog">
              <div className="blog-text">
                <h3>Invitation Settings</h3>

                <div className="form-group">
                  <label htmlFor="party">Wedding Package:</label>
                  <select
                    id="party"
                    className="form-control"
                    value={fields.party}
                    onChange={(e) => setFields(prev => ({ ...prev, party: e.target.value }))}
                  >
                    {packageOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <small className="help-block">
                    Choose the wedding package (ceremony/party details)
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="guestName">Guest Name:</label>
                  <input
                    type="text"
                    id="guestName"
                    className="form-control"
                    placeholder="Enter guest name"
                    value={fields.guestName}
                    onChange={(e) => setFields(prev => ({ ...prev, guestName: e.target.value }))}
                  />
                  <small className="help-block">
                    This will appear as &quot;Bạn Mến Yêu&quot; in the invitation
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="invitationText">Invitation Text:</label>
                  <input
                    type="text"
                    id="invitationText"
                    className="form-control"
                    placeholder="Enter invitation text"
                    value={fields.invitationText}
                    onChange={(e) => setFields(prev => ({ ...prev, invitationText: e.target.value }))}
                  />
                  <small className="help-block">
                    Text that appears at the beginning of the invitation
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="invitationSecondText">Second Invitation Text:</label>
                  <textarea
                    id="invitationSecondText"
                    className="form-control"
                    rows={3}
                    placeholder="Enter second invitation text"
                    value={fields.invitationSecondText}
                    onChange={(e) => setFields(prev => ({ ...prev, invitationSecondText: e.target.value }))}
                  />
                  <small className="help-block">
                    Additional text that appears before the venue information (use \n for line breaks)
                  </small>
                </div>

                <div className="form-group">
                  <label htmlFor="thanksText">Thanks Text:</label>
                  <textarea
                    id="thanksText"
                    className="form-control"
                    rows={3}
                    placeholder="Enter thanks text"
                    value={fields.thanksText}
                    onChange={(e) => setFields(prev => ({ ...prev, thanksText: e.target.value }))}
                  />
                  <small className="help-block">
                    Thank you message that appears at the end of the invitation (use \n for line breaks)
                  </small>
                </div>

                <div className="form-group">
                  <h4>Generated URL:</h4>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={generatedUrl}
                      readOnly
                      style={{ fontSize: '12px' }}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={copyUrl}
                        title="Copy URL"
                      >
                        📋 Copy URL
                      </button>
                    </div>
                  </div>
                  <small className="help-block">
                    Share this URL with your guest or use it to generate a QR code
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="fh5co-blog">
              <div className="blog-text">
                <h3>QR Code Generator</h3>

                <div className="mt-3 text-center mb-3">
                  <button
                    className="btn btn-success mr-2"
                    onClick={copyQRCode}
                    title="Copy QR Code to clipboard"
                  >
                    📋 Copy QR Code
                  </button>
                  <button
                    className="btn btn-warning mr-2"
                    onClick={downloadQRCode}
                    title="Download QR Code as PNG"
                  >
                    💾 Download QR Code
                  </button>
                  <button
                    className="btn btn-info mr-2"
                    onClick={copyUrl}
                    title="Copy URL to clipboard"
                  >
                    🔗 Copy URL
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = generatedUrl;
                      link.target = '_blank';
                      link.click();
                    }}
                    title="Open invitation in new tab"
                  >
                    🌐 Open Invitation
                  </button>
                </div>

                <div className="qr-code-container">
                  <ReliableQRCode
                    url={qrCodeUrl}
                    logoUrl="/images/QR-logo.png"
                    size={300}
                    styleOptions={{
                      dotsColor: '#758362',
                      randomDotsColor: '#758362',
                      dotsType: 'dots',
                      backgroundColor: 'transparent',
                      cornersSquareColor: '#758362',
                      cornersSquareType: 'dot',
                      cornersDotColor: '#758362',
                      cornersDotType: 'dot',
                      logoMargin: 0,
                      logoSize: 0.45,
                      isCircular: true,
                      topText: 'Scan for something sweet 💞',
                      bottomText: 'November 30, 2025',
                      textColor: '#ffffff',
                      textSize: 24
                    }}
                    className="mt-3"
                  />
                </div>

                <div className="mt-3">
                  <h5>Wedding Party Card Preview:</h5>
                  <div style={{
                    border: '2px solid #758362',
                    borderRadius: '12px',
                    padding: '20px',
                    backgroundColor: '#f9f9f9',
                    maxWidth: '600px',
                    margin: '0 auto',
                    transform: 'scale(0.7)',
                    transformOrigin: 'top center'
                  }}>
                    <WeddingPartyCard
                      invitationText={fields.invitationText}
                      guestName={fields.guestName}
                      invitationSecondText={fields.invitationSecondText}
                      restaurantName={PACKAGES[fields.party as keyof typeof PACKAGES]?.weddingPartyInfo.restaurantName || 'Nhà hàng tiệc cưới Gia Huy'}
                      restaurantAddress={PACKAGES[fields.party as keyof typeof PACKAGES]?.weddingPartyInfo.restaurantAddress || 'Đường Dương Sơn 4, phường Hoà Xuân'}
                      city={PACKAGES[fields.party as keyof typeof PACKAGES]?.weddingPartyInfo.city || 'Thành phố Đà Nẵng'}
                      mapUrl={PACKAGES[fields.party as keyof typeof PACKAGES]?.weddingPartyInfo.mapUrl || 'https://maps.app.goo.gl/FVBK3FssCvj1pptW6'}
                      time={PACKAGES[fields.party as keyof typeof PACKAGES]?.weddingPartyInfo.time || 'Ngày 30 tháng 11 năm 2025'}
                      lunaDate={PACKAGES[fields.party as keyof typeof PACKAGES]?.weddingPartyInfo.lunaDate || 'ngày 11 tháng 10 năm Ất Tỵ'}
                      thanksText={fields.thanksText}
                      openAt={PACKAGES[fields.party as keyof typeof PACKAGES]?.weddingPartyInfo.openAt || '11:00'}
                      partyAt={PACKAGES[fields.party as keyof typeof PACKAGES]?.weddingPartyInfo.partyAt || '11:30'}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="fh5co-blog">
              <div className="blog-text">
                <h3>Available Wedding Packages</h3>
                <div className="row">
                  {packageOptions.map(option => (
                    <div key={option.value} className="col-md-4 mb-3">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">{option.label}</h5>
                          <p className="card-text">
                            {option.value === 'mainParty' && 'Main wedding ceremony and party at Gia Huy Palace'}
                            {option.value === 'bridePartySectionOne' && 'Bride\'s family ceremony and party (First session)'}
                            {option.value === 'bridePartySectionTwo' && 'Bride\'s family ceremony and party (Second session)'}
                          </p>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => setFields(prev => ({ ...prev, party: option.value }))}
                          >
                            Select Package
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="fh5co-blog">
              <div className="blog-text">
                <h3>URL Parameters Explained</h3>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Parameter</th>
                        <th>Description</th>
                        <th>Example Values</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><code>party</code></td>
                        <td>Wedding package/ceremony type</td>
                        <td><code>mainParty</code>, <code>bridePartySectionOne</code>, <code>bridePartySectionTwo</code></td>
                      </tr>
                      <tr>
                        <td><code>guestName</code></td>
                        <td>Name to display in invitation</td>
                        <td><code>Bạn Mến Yêu</code>, <code>Anh Minh</code>, <code>Chị Lan</code></td>
                      </tr>
                      <tr>
                        <td><code>invitationText</code></td>
                        <td>Opening invitation text</td>
                        <td><code>Trân trọng kính mời:</code></td>
                      </tr>
                      <tr>
                        <td><code>invitationSecondText</code></td>
                        <td>Additional invitation text</td>
                        <td><code>Đến dự buổi tiệc\nChung vui cùng gia đình chúng tôi tại</code></td>
                      </tr>
                      <tr>
                        <td><code>thanksText</code></td>
                        <td>Thank you message</td>
                        <td><code>Sự hiện diện của quý khách\nlà niềm vinh hạnh lớn cho chúng tôi.</code></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
