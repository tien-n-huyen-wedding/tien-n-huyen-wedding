'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WishesForm from '@/components/WishesForm';
import { fetchWishes, submitWish, Wish, WishData } from '@/utils/googleSheets';
import { useInvitationProps } from '@/hooks/useInvitationProps';
import { CHANGEABLE_FIELDS, InvitationProps } from '@/components/invitation/Invitation';

export default function WishesPage() {
  const router = useRouter();
  const { props, isLoaded } = useInvitationProps(CHANGEABLE_FIELDS as (keyof InvitationProps)[]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const wishesPerPage = 100;

  // Load wishes on component mount
  useEffect(() => {
    loadWishes();
  }, []);

  const loadWishes = async () => {
    setIsLoading(true);
    try {
      const wishesData = await fetchWishes();
      // Sort wishes from oldest to newest by timestamp
      const sortedWishes = [...wishesData].sort((a, b) => {
        return Date.parse(a.timestamp) - Date.parse(b.timestamp);
      });
      setWishes(sortedWishes.reverse());
    } catch (error) {
      console.error('Error loading wishes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitWish = async (wishData: WishData) => {
    setIsSubmitting(true);
    try {
      const newWish = await submitWish(wishData);
      // Add new wish and sort from oldest to newest
      setWishes(prev => {
        const updated = [...prev, newWish];
        return updated.sort((a, b) => {
          return Date.parse(a.timestamp) - Date.parse(b.timestamp);
        });
      });
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
      // Navigate to last page after wish is added
      const totalPages = Math.ceil((wishes.length + 1) / wishesPerPage);
      setCurrentPage(totalPages);
    } catch (error) {
      console.error('Error submitting wish:', error);
      alert('Có lỗi xảy ra khi gửi lời chúc. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="page" style={{ minHeight: '100vh', background: '#f9fafb' }}>
      {/* Header with Back Button */}
      <div style={{
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #2E8B57 0%, #3CB371 100%)',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '25px',
          boxShadow: '0 4px 20px rgba(46, 139, 87, 0.4)',
          zIndex: 1000,
          animation: 'slideDown 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '16px',
          fontWeight: '500'
        }}>
          <span style={{ fontSize: '20px' }}>✓</span>
          <span>Cảm ơn bạn đã gửi lời chúc! 💕</span>
        </div>
      )}

      {/* Wishes Form Section - Moved to Top */}
      <div>
        <WishesForm
          onSubmit={handleSubmitWish}
          isLoading={isSubmitting}
          invitationProps={props}
          isLoaded={isLoaded}
        />
      </div>

      {/* Wishes Display Section - 100 items per page */}
      <div style={{ padding: '40px 0', background: '#f9fafb' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box" style={{ marginTop: '40px' }}>
              <h2>Lời Chúc Mừng</h2>
              <span>Gửi gắm yêu thương từ Gia đình, Bạn bè và những người thân thương nhất đến cô dâu & chú rễ</span>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{
              display: 'inline-block',
              width: '48px',
              height: '48px',
              border: '4px solid #2E8B57',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '20px'
            }}></div>
            <p style={{ color: '#666', fontSize: '16px' }}>Đang tải lời chúc...</p>
          </div>
        ) : wishes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <p style={{ color: '#999', fontSize: '18px' }}>Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc nhé! 💕</p>
          </div>
        ) : (
          <>
            {/* Wishes Grid */}
            <div className="container">
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '40px'
              }}>
                {(() => {
                  const startIndex = (currentPage - 1) * wishesPerPage;
                  const endIndex = startIndex + wishesPerPage;
                  const currentWishes = wishes.slice(startIndex, endIndex);

                  return currentWishes.map((wish, index) => {
                    const date = new Date(wish.timestamp);
                    const formattedDate = date.toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    });

                    return (
                      <div
                        key={wish.id}
                        style={{
                          background: 'linear-gradient(135deg, #fff 0%, #f0fdf4 100%)',
                          border: '2px solid #bbf7d0',
                          borderRadius: '20px',
                          padding: '24px',
                          boxShadow: '0 10px 30px rgba(34, 197, 94, 0.1)',
                          transition: 'all 0.3s ease',
                          opacity: 0,
                          animation: `fadeInUp 0.6s ease ${index * 0.05}s forwards`
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-5px)';
                          e.currentTarget.style.boxShadow = '0 15px 40px rgba(34, 197, 94, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.1)';
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '12px',
                          flexWrap: 'wrap',
                          gap: '8px'
                        }}>
                          <span style={{
                            fontWeight: 'bold',
                            color: '#16a34a',
                            fontSize: '16px',
                            background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}>
                            {wish.name}
                          </span>
                          <span style={{
                            fontSize: '14px',
                            color: '#9ca3af',
                            fontStyle: 'italic'
                          }}>
                            {formattedDate}
                          </span>
                        </div>
                        <div style={{
                          fontSize: '16px',
                          lineHeight: '1.6',
                          color: '#374151',
                          fontStyle: 'italic',
                          marginBottom: '12px'
                        }}>
                          &ldquo;{wish.message}&rdquo;
                        </div>
                        <div style={{
                          textAlign: 'center',
                          fontSize: '20px',
                          animation: 'heartbeat 2s infinite'
                        }}>
                          💕
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* Pagination */}
            {Math.ceil(wishes.length / wishesPerPage) > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '15px',
                marginTop: '40px',
                paddingBottom: '40px'
              }}>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '10px 20px',
                    border: '2px solid #2E8B57',
                    background: currentPage === 1 ? '#f0f0f0' : 'white',
                    color: currentPage === 1 ? '#999' : '#2E8B57',
                    borderRadius: '25px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    opacity: currentPage === 1 ? 0.5 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== 1) {
                      e.currentTarget.style.background = '#2E8B57';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== 1) {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.color = '#2E8B57';
                    }
                  }}
                >
                  ← Trước
                </button>
                <span style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#16a34a',
                  background: 'rgba(34, 197, 94, 0.1)',
                  padding: '10px 20px',
                  borderRadius: '20px',
                  border: '1px solid rgba(34, 197, 94, 0.2)'
                }}>
                  Trang {currentPage} / {Math.ceil(wishes.length / wishesPerPage)}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(Math.ceil(wishes.length / wishesPerPage), prev + 1))}
                  disabled={currentPage === Math.ceil(wishes.length / wishesPerPage)}
                  style={{
                    padding: '10px 20px',
                    border: '2px solid #2E8B57',
                    background: currentPage === Math.ceil(wishes.length / wishesPerPage) ? '#f0f0f0' : 'white',
                    color: currentPage === Math.ceil(wishes.length / wishesPerPage) ? '#999' : '#2E8B57',
                    borderRadius: '25px',
                    cursor: currentPage === Math.ceil(wishes.length / wishesPerPage) ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    opacity: currentPage === Math.ceil(wishes.length / wishesPerPage) ? 0.5 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== Math.ceil(wishes.length / wishesPerPage)) {
                      e.currentTarget.style.background = '#2E8B57';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== Math.ceil(wishes.length / wishesPerPage)) {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.color = '#2E8B57';
                    }
                  }}
                >
                  Sau →
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 22px !important;
          }

          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

