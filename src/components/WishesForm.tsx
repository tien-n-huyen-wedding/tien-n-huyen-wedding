'use client';

import { useState } from 'react';
import GoogleSheetsStatus from '@/components/GoogleSheetsStatus';

interface WishData {
  name: string;
  message: string;
}

interface WishesFormProps {
  onSubmit: (wish: WishData) => Promise<void>;
  isLoading: boolean;
}

export default function WishesForm({ onSubmit, isLoading }: WishesFormProps) {
  const [formData, setFormData] = useState<WishData>({
    name: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<WishData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof WishData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<WishData> = {};

    // Không bắt buộc nhập tên, sẽ sử dụng "Một người bạn" nếu bỏ trống
    if (!formData.message.trim()) {
      newErrors.message = 'Vui lòng nhập lời chúc';
    } else if (formData.message.trim().length < 3) {
      newErrors.message = 'Lời chúc phải có ít nhất 3 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Sử dụng tên mặc định nếu người dùng bỏ trống tên
      const wishData = {
        ...formData,
        name: formData.name.trim() || 'Một người bạn'
      };

      await onSubmit(wishData);
      setFormData({
        name: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting wish:', error);
    }
  };

  return (
    <div id="fh5co-started" className="fh5co-bg" style={{backgroundImage: 'url(/images/img_bg_4.jpg)'}}>
      <div className="overlay"></div>
      <div className="container">
        <div className="row animate-box">
          <div className="col-md-8 col-md-offset-2 text-center fh5co-heading">
            <h2 style={{color: 'var(--color-bg-primary)'}}>Gửi Lời Chúc Mừng</h2>
            <p style={{color: 'var(--color-bg-primary)'}}>Chia sẻ niềm vui cùng chúng tôi trong ngày trọng đại</p>
          </div>
        </div>
        <div className="row animate-box">
          <div className="col-md-10 col-md-offset-1">
            <form className="form-inline" onSubmit={handleSubmit}>
              <div className="col-md-4 col-sm-4">
                <div className="form-group" id="group_name">
                  <label htmlFor="name" className="sr-only">Tên của bạn (tùy chọn)</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'error' : ''}`}
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Tên của bạn (tùy chọn)"
                    disabled={isLoading}
                  />
                  {errors.name && (
                    <p className="error-message">{errors.name}</p>
                  )}
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <div className="form-group">
                  <label htmlFor="message" className="sr-only">Lời chúc mừng</label>
                  <textarea
                    className={`form-control ${errors.message ? 'error' : ''}`}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Lời chúc mừng của bạn..."
                    rows={3}
                    disabled={isLoading}
                  />
                  {errors.message && (
                    <p className="error-message">{errors.message}</p>
                  )}
                </div>
              </div>
              <div className="col-md-4 col-sm-4">
                <button
                  type="submit"
                  className="btn btn-default btn-block"
                  disabled={isLoading}
                >
                  {isLoading ? 'Đang gửi...' : 'Gửi Lời Chúc'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* GoogleSheetsStatus - positioned at bottom right */}
        <div className="google-sheets-status-container">
          <GoogleSheetsStatus />
        </div>
      </div>

      <style jsx>{`
        .error {
          border-color: #e74c3c !important;
          box-shadow: 0 0 0 0.2rem rgba(231, 76, 60, 0.25) !important;
        }

        .error-message {
          color: #e74c3c;
          font-size: 12px;
          margin-top: 5px;
          margin-bottom: 0;
        }

        .form-control {
          resize: none;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .form-group:first-child {
          position: relative;
        }

        .form-group#group_name::after {
          content: "Để trống sẽ hiển thị 'Một người bạn'";
          position: absolute;
          bottom: -20px;
          left: 0;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7);
          font-style: italic;
        }

        .google-sheets-status-container {
          position: absolute;
          bottom: 20px;
          right: 20px;
          z-index: 10;
        }

        .google-sheets-status-container :global(div) {
          background: none;
          border: none;
          padding: 8px 12px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.8);
          font-style: italic;
          text-align: center;
          min-width: 100px;
        }

        .google-sheets-status-container :global(.font-bold) {
          font-size: 12px;
          margin: 0 0 3px 0;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }

        .google-sheets-status-container :global(.block) {
          font-size: 10px;
          margin: 2px 0;
          color: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </div>
  );
}
