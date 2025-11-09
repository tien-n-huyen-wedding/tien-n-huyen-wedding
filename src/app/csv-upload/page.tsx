'use client';

import { useState, useCallback } from 'react';
import ReliableQRCode from '@/components/qr_code/ReliableQRCode';
import { compressUrl } from '@/lib/url-compress';
import { getBaseUrlWithSlash } from '@/lib/env';

interface CSVRow {
  guestName: string;
  party: string;
  invitationText?: string;
  invitationSecondText?: string;
  thanksText?: string;
  coupleGreeting?: string;
}

interface GeneratedInvitation {
  row: CSVRow;
  fullUrl: string;
  shortUrl: string;
  qrCodeUrl: string;
}

// Default values for comparison
const defaultValues = {
  guestName: '',
  invitationText: 'Thân mời',
  invitationSecondText: 'Đến dự buổi tiệc\nChung vui cùng gia đình chúng tôi tại',
  thanksText: 'Sự hiện diện của quý khách\nlà niềm vinh hạnh lớn cho chúng tôi.',
  coupleGreeting: 'chúng mình'
};

export default function CSVUploadPage() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [invitations, setInvitations] = useState<GeneratedInvitation[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  const [useShortUrl, setUseShortUrl] = useState(true);

  // Helper function to replace double spaces with newline
  const replaceNewlines = (text: string): string => {
    return text.replace(/  /g, '\n');
  };

  // Parse CSV file
  const parseCSV = (text: string): CSVRow[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];

    // Parse header
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const rows: CSVRow[] = [];

    // Parse data rows
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const row: Partial<CSVRow> = {};

      headers.forEach((header, index) => {
        const value = values[index] || '';
        if (header === 'guestname' || header === 'guest_name') {
          row.guestName = value;
        } else if (header === 'party') {
          row.party = value || 'mainParty';
        } else if (header === 'invitationtext' || header === 'invitation_text') {
          row.invitationText = replaceNewlines(value);
        } else if (header === 'invitationsecondtext' || header === 'invitation_second_text') {
          row.invitationSecondText = replaceNewlines(value);
        } else if (header === 'thankstext' || header === 'thanks_text') {
          row.thanksText = replaceNewlines(value);
        } else if (header === 'couplegreeting' || header === 'couple_greeting') {
          row.coupleGreeting = value;
        }
      });

      // Only add row if it has at least guestName
      if (row.guestName) {
        rows.push({
          guestName: row.guestName,
          party: row.party || 'mainParty',
          invitationText: row.invitationText,
          invitationSecondText: row.invitationSecondText,
          thanksText: row.thanksText,
          coupleGreeting: row.coupleGreeting
        });
      }
    }

    return rows;
  };

  // Generate URL for a row
  const generateUrlForRow = (row: CSVRow): GeneratedInvitation => {
    const baseUrl = getBaseUrlWithSlash();
    const params = new URLSearchParams();

    // Always include party
    params.set('party', row.party || 'mainParty');

    // Only include fields that differ from defaults or are provided
    if (row.guestName && row.guestName !== defaultValues.guestName) {
      params.set('guestName', row.guestName);
    }
    if (row.invitationText && row.invitationText !== defaultValues.invitationText) {
      params.set('invitationText', row.invitationText);
    }
    if (row.invitationSecondText && row.invitationSecondText !== defaultValues.invitationSecondText) {
      params.set('invitationSecondText', row.invitationSecondText);
    }
    if (row.thanksText && row.thanksText !== defaultValues.thanksText) {
      params.set('thanksText', row.thanksText);
    }
    if (row.coupleGreeting && row.coupleGreeting !== defaultValues.coupleGreeting) {
      params.set('coupleGreeting', row.coupleGreeting);
    }

    const fullUrl = `${baseUrl}?${params.toString()}`;
    const shortUrl = compressUrl(fullUrl);
    const qrCodeUrl = useShortUrl ? shortUrl : fullUrl;

    return {
      row,
      fullUrl,
      shortUrl,
      qrCodeUrl
    };
  };

  // Handle file upload
  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      return;
    }

    setCsvFile(file);
    setError('');
    setIsProcessing(true);

    try {
      const text = await file.text();
      const rows = parseCSV(text);

      if (rows.length === 0) {
        setError('No valid rows found in CSV file');
        setIsProcessing(false);
        return;
      }

      // Generate URLs and QR codes for each row
      const generated = rows.map(row => generateUrlForRow(row));
      setInvitations(generated);
    } catch (err) {
      setError(`Error processing CSV: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useShortUrl]);

  // Copy URL to clipboard
  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      alert('URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy URL:', err);
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('URL copied to clipboard!');
    }
  };

  // Copy QR Code image to clipboard
  const copyQRCode = async (qrContainerId: string, guestName: string) => {
    try {
      const qrContainer = document.getElementById(qrContainerId) as HTMLElement;
      if (qrContainer) {
        const html2canvas = (await import('html2canvas')).default;

        const canvas = await html2canvas(qrContainer, {
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: null,
          scale: 2
        } as any);

        canvas.toBlob(async (blob) => {
          if (blob) {
            try {
              await navigator.clipboard.write([
                new ClipboardItem({
                  'image/png': blob
                })
              ]);
              alert('QR Code copied to clipboard!');
            } catch (clipboardErr) {
              console.error('Clipboard API failed:', clipboardErr);
              // Fallback: download the image
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              // Use guestName as filename, sanitize for filesystem
              const sanitizedName = guestName
                .replace(/[<>:"/\\|?*]/g, '') // Remove filesystem-invalid characters
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .trim() || 'guest';
              link.download = `${sanitizedName}.png`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
              alert('Clipboard not available. QR Code downloaded instead.');
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
  const downloadQRCode = async (qrContainerId: string, guestName: string) => {
    try {
      const qrContainer = document.getElementById(qrContainerId) as HTMLElement;
      if (qrContainer) {
        const html2canvas = (await import('html2canvas')).default;

        const canvas = await html2canvas(qrContainer, {
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: null,
          scale: 2
        } as any);

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            // Use guestName as filename, sanitize for filesystem
            // Remove invalid characters and replace spaces with hyphens
            const sanitizedName = guestName
              .replace(/[<>:"/\\|?*]/g, '') // Remove filesystem-invalid characters
              .replace(/\s+/g, '-') // Replace spaces with hyphens
              .trim() || 'guest';
            link.download = `${sanitizedName}.png`;
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

  // Download all QR codes as ZIP
  const downloadAllQRCodes = async () => {
    // This would require a zip library - for now, just show a message
    alert('Download all feature coming soon. Please download individual QR codes for now.');
  };

  return (
    <div className="fh5co-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center fh5co-heading">
            <h2>CSV Upload - Bulk Invitation Generator</h2>
            <p>Upload a CSV file to generate multiple invitation URLs and QR codes at once</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="fh5co-blog">
              <div className="blog-text">
                <h3>Upload CSV File</h3>
                <p>CSV format should include the following columns:</p>
                <ul>
                  <li><code>guestName</code> or <code>guest_name</code> (required)</li>
                  <li><code>party</code> (optional, defaults to &quot;mainParty&quot;)</li>
                  <li><code>invitationText</code> or <code>invitation_text</code> (optional)</li>
                  <li><code>invitationSecondText</code> or <code>invitation_second_text</code> (optional)</li>
                  <li><code>thanksText</code> or <code>thanks_text</code> (optional)</li>
                  <li><code>coupleGreeting</code> or <code>couple_greeting</code> (optional)</li>
                </ul>

                <div className="form-group">
                  <label htmlFor="csvFile">Select CSV File:</label>
                  <input
                    type="file"
                    id="csvFile"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="form-control"
                    disabled={isProcessing}
                  />
                  {isProcessing && <p className="text-info">Processing...</p>}
                  {error && <p className="text-danger">{error}</p>}
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="useShortUrl"
                    checked={useShortUrl}
                    onChange={(e) => {
                      setUseShortUrl(e.target.checked);
                      // Regenerate URLs with new setting
                      if (invitations.length > 0) {
                        const regenerated = invitations.map(inv => ({
                          ...inv,
                          qrCodeUrl: e.target.checked ? inv.shortUrl : inv.fullUrl
                        }));
                        setInvitations(regenerated);
                      }
                    }}
                  />
                  <label className="form-check-label" htmlFor="useShortUrl">
                    Use short URL for QR codes
                  </label>
                </div>

                {csvFile && (
                  <div className="alert alert-info">
                    <strong>File loaded:</strong> {csvFile.name} ({invitations.length} invitations)
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {invitations.length > 0 && (
          <>
            <div className="row">
              <div className="col-md-12">
                <div className="fh5co-blog">
                  <div className="blog-text">
                    <h3>Generated Invitations ({invitations.length})</h3>
                    <div className="text-right mb-3">
                      <button
                        className="btn btn-primary"
                        onClick={downloadAllQRCodes}
                        title="Download all QR codes as ZIP"
                      >
                        📦 Download All QR Codes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {invitations.map((invitation, index) => {
                const qrContainerId = `qr-container-${index}`;
                return (
                  <div key={index} className="col-md-6 col-lg-4 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">{invitation.row.guestName}</h5>
                        <p className="card-text">
                          <small className="text-muted">Party: {invitation.row.party}</small>
                        </p>

                        <div className="mb-3">
                          <div id={qrContainerId} className="qr-code-container">
                            <ReliableQRCode
                              url={invitation.qrCodeUrl}
                              logoUrl="/images/QR-logo.png"
                              size={200}
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
                                textSize: 20
                              }}
                            />
                          </div>
                        </div>

                        <div className="btn-group btn-group-sm w-100" role="group">
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => copyUrl(invitation.shortUrl)}
                            title="Copy Short URL"
                          >
                            📋 Copy URL
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => copyQRCode(qrContainerId, invitation.row.guestName)}
                            title="Copy QR Code to clipboard"
                          >
                            📋 Copy QR
                          </button>
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => downloadQRCode(qrContainerId, invitation.row.guestName)}
                            title="Download QR Code"
                          >
                            💾 Download QR
                          </button>
                          <button
                            type="button"
                            className="btn btn-info"
                            onClick={() => {
                              const link = document.createElement('a');
                              link.href = invitation.fullUrl;
                              link.target = '_blank';
                              link.click();
                            }}
                            title="Open invitation"
                          >
                            🌐 Open
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="row mt-4">
          <div className="col-md-12">
            <div className="fh5co-blog">
              <div className="blog-text">
                <h3>CSV Format Example</h3>
                <pre className="bg-light p-3 rounded">
{`guestName,party,invitationText,thanksText,coupleGreeting
Anh Minh,mainParty,Thân mời,Sự hiện diện của quý khách  là niềm vinh hạnh lớn cho chúng tôi.,chúng mình
Chị Lan,bridePartySectionOne,Thân mời,Sự hiện diện của quý khách  là niềm vinh hạnh lớn cho chúng tôi.,chúng tôi
Bạn Hùng,bridePartySectionTwo,Thân mời,Sự hiện diện của quý khách  là niềm vinh hạnh lớn cho chúng tôi.,chúng em
`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

