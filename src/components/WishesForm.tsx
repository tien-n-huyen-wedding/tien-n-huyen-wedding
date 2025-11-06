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

    // Validate name length in real-time and show error if exceeds
    if (name === 'name') {
      if (value.length > 30) {
        setErrors(prev => ({
          ...prev,
          name: 'Tên không được vượt quá 30 ký tự'
        }));
      } else if (errors.name && value.length <= 30) {
        // Clear error when length is valid
        setErrors(prev => ({
          ...prev,
          name: ''
        }));
      }
    } else {
      // Clear error for other fields when user starts typing
      if (errors[name as keyof WishData]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<WishData> = {};

    // Validate name length (max 30 characters)
    if (formData.name.trim() && formData.name.trim().length > 30) {
      newErrors.name = 'Tên không được vượt quá 30 ký tự';
    }

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
        <div className="row animate-box" style={{marginBottom: '30px'}}>
          <div className="col-md-10 col-md-offset-1">
            <form className="wishes-form" onSubmit={handleSubmit}>
              <div className="wishes-form-inputs">
                <div className="col-md-6 col-sm-6">
                  <div className="form-group" style={{marginBottom: '20px'}} id="group_name">
                    <label htmlFor="name" className="sr-only">Tên của bạn (tùy chọn)</label>
                    <textarea
                      className={`form-control ${errors.name ? 'error' : ''}`}
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tên của bạn (tùy chọn)"
                      rows={3}
                      disabled={isLoading}
                      style={{height: '100px'}}
                    />
                    {errors.name && (
                      <p className="error-message">{errors.name}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-6 col-sm-6">
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
                      style={{height: '100px'}}
                    />
                    {errors.message && (
                      <p className="error-message">{errors.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="wishes-form-button">
                <button
                  type="submit"
                  className="btn btn-default"
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
        .wishes-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .wishes-form-inputs {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
        }

        .wishes-form-inputs .col-md-6,
        .wishes-form-inputs .col-sm-6 {
          flex: 1 1 calc(50% - 7.5px);
          min-width: 0;
        }

        @media (max-width: 768px) {
          .wishes-form-inputs .col-md-6,
          .wishes-form-inputs .col-sm-6 {
            flex: 1 1 100%;
          }
        }

        .wishes-form-button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .wishes-form-button .btn {
          min-width: 200px;
        }

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

        #name.form-control,
        #message.form-control {
          padding-top: 35px;
          line-height: 1.5;
          vertical-align: middle;
        }

        #name.form-control::placeholder,
        #message.form-control::placeholder {
          line-height: 1.5;
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
