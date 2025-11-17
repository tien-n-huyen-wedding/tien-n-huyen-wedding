'use client';

import { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import WishCard from '@/components/WishCard';

export interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

interface WishesDisplayProps {
  wishes: Wish[];
  isLoading: boolean;
}

export interface WishesDisplayRef {
  goToLastPage: () => void;
}

const WishesDisplay = forwardRef<WishesDisplayRef, WishesDisplayProps>(
  ({ wishes, isLoading }, ref) => {
    const [displayWishes, setDisplayWishes] = useState<Wish[]>([]);
    const [currentGroup, setCurrentGroup] = useState(0);
    const wishesPerGroup = 4;

    // Calculate total groups and current group wishes
    const totalGroups = displayWishes.length > 0 ? Math.ceil(displayWishes.length / wishesPerGroup) : 1;
    const currentGroupWishes = displayWishes.length > 0 ? displayWishes.slice(
      currentGroup * wishesPerGroup,
      (currentGroup + 1) * wishesPerGroup
    ) : [];

    // Reset currentGroup when displayWishes changes
    useEffect(() => {
      if (displayWishes.length > 0) {
        const newTotalGroups = Math.ceil(displayWishes.length / wishesPerGroup);
        if (currentGroup >= newTotalGroups) {
          setCurrentGroup(0);
        }
      }
    }, [displayWishes.length, currentGroup, wishesPerGroup]);

    // Navigation functions
    const goToNextGroup = () => {
      if (totalGroups > 1) {
        setCurrentGroup((prev) => {
          const nextGroup = (prev + 1) % totalGroups;
          console.log('Next group:', nextGroup, 'Total groups:', totalGroups);
          return nextGroup;
        });
      }
    };

    const goToPrevGroup = () => {
      if (totalGroups > 1) {
        setCurrentGroup((prev) => {
          const prevGroup = (prev - 1 + totalGroups) % totalGroups;
          console.log('Prev group:', prevGroup, 'Total groups:', totalGroups);
          return prevGroup;
        });
      }
    };

    const goToLastPage = () => {
      if (displayWishes.length > 0 && totalGroups > 0) {
        setCurrentGroup(totalGroups - 1);
      }
    };

    // Expose goToLastPage via ref
    useImperativeHandle(ref, () => ({
      goToLastPage,
    }));

    const prevWishesLengthRef = useRef(0);

    useEffect(() => {
      if (wishes.length > 0) {
        const wasNewWishAdded = wishes.length > prevWishesLengthRef.current;
        setDisplayWishes(wishes);

        if (wasNewWishAdded && prevWishesLengthRef.current > 0) {
          // New wish was added, navigate to last page after shuffle
          setTimeout(() => {
            const newTotalGroups = Math.ceil(wishes.length / wishesPerGroup);
            if (newTotalGroups > 0) {
              setCurrentGroup(newTotalGroups - 1);
            }
          }, 50);
        } else {
          // Initial load or refresh, reset to first page
          setCurrentGroup(0);
        }

        prevWishesLengthRef.current = wishes.length;
      }
    }, [wishes, wishesPerGroup]);

    // Auto-advance disabled - manual navigation only

    const formatDate = (timestamp: string) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

    if (isLoading) {
      return (
        <div className="wishes-display-container">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Đang tải lời chúc...</p>
          </div>
        </div>
      );
    }

    if (wishes.length === 0) {
      return (
        <>
        </>
      );
    }

    return (
      <div className="wishes-display-container">
      <div className="container">
        <div className="row">
          {/* Title */}
          <div className="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
            <h2>Lời Chúc Mừng</h2>
            <span>Gửi gắm yêu thương từ Gia đình, Bạn bè và những người thân thương nhất đến cô dâu & chú rễ</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {/* Scrolling Wishes Container */}
            <div className="relative overflow-hidden bg-gradient-to-r from-green-50 via-white to-emerald-50 rounded-2xl p-8 shadow-lg">
        <div className="wishes-grid">
          {currentGroupWishes.length > 0 ? (
            currentGroupWishes.map((wish, index) => (
              <WishCard
                key={wish.id}
                wish={wish}
                index={index}
                truncateLength={300}
                showHeart
                timestampLabel={formatDate(wish.timestamp)}
              />
            ))
          ) : (
            <div className="wish-item">
              <div className="wish-content">
                <div className="wish-message">
                  Đang tải lời chúc...
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {totalGroups > 1 && displayWishes.length > 0 && (
          <div className="wishes-navigation">
            <button
              onClick={goToPrevGroup}
              className="nav-button prev"
              aria-label="Trang trước"
              disabled={currentGroup === 0}
            >
              ‹
            </button>
            <span className="page-info">
              {Math.min(currentGroup + 1, totalGroups)} / {totalGroups}
            </span>
            <button
              onClick={goToNextGroup}
              className="nav-button next"
              aria-label="Trang sau"
              disabled={currentGroup === totalGroups - 1}
            >
              ›
            </button>
          </div>
        )}

            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .wishes-display-container {
          padding: 80px 0;
        }

        .wishes-navigation {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
          padding-bottom: 1rem;
        }

        .nav-button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #22c55e;
          background: white;
          color: #22c55e;
          font-size: 1.5rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-button:hover:not(:disabled) {
          background: #22c55e;
          color: white;
          transform: scale(1.1);
        }

        .nav-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .page-info {
          font-size: 1rem;
          font-weight: 600;
          color: #16a34a;
          background: rgba(34, 197, 94, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .wishes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          min-height: 300px;
        }

        .wish-item {
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.6s ease forwards;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .wish-content {
          background: linear-gradient(135deg, #fff 0%, #f0fdf4 100%);
          border: 2px solid #bbf7d0;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 10px 30px rgba(34, 197, 94, 0.1);
          text-align: center;
          max-width: 600px;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .wish-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .wish-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .wish-name {
          font-weight: bold;
          color: #16a34a;
          font-size: 1.1rem;
          background: linear-gradient(135deg, #16a34a, #22c55e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .wish-time {
          font-size: 0.875rem;
          color: #9ca3af;
          font-style: italic;
        }

        .wish-message {
          font-size: 1.125rem;
          line-height: 1.6;
          color: #374151;
          font-style: italic;
          margin-bottom: 1rem;
          position: relative;
        }

        .show-more-button {
          background: rgba(34, 197, 94, 0.15);
          border: 1px solid rgba(34, 197, 94, 0.3);
          color: #15803d;
          padding: 6px 18px;
          border-radius: 999px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .show-more-button:hover {
          background: rgba(34, 197, 94, 0.25);
          border-color: rgba(34, 197, 94, 0.5);
          color: #166534;
        }

        .wish-heart {
          font-size: 1.5rem;
          animation: heartbeat 2s infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .wishes-navigation {
            margin-top: 1.5rem;
            padding-bottom: 0.75rem;
          }

          .nav-button {
            width: 35px;
            height: 35px;
            font-size: 1.2rem;
          }

          .page-info {
            font-size: 0.9rem;
            padding: 0.4rem 0.8rem;
          }

          .wishes-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
            min-height: auto;
          }

          .wish-content {
            padding: 1.5rem;
            margin: 0 1rem;
          }

          .wish-header {
            flex-direction: column;
            text-align: center;
          }

          .wish-message {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .wishes-navigation {
            gap: 0.5rem;
            margin-top: 1rem;
            padding-bottom: 0.5rem;
          }

          .nav-button {
            width: 30px;
            height: 30px;
            font-size: 1rem;
          }

          .page-info {
            font-size: 0.8rem;
            padding: 0.3rem 0.6rem;
          }

          .wishes-grid {
            gap: 0.75rem;
          }

          .wish-content {
            padding: 1rem;
            margin: 0 0.5rem;
          }
        }

        /* Hover effects */
        .wish-item:hover .wish-content {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(34, 197, 94, 0.2);
        }

      `}</style>
      </div>
    );
  }
);

WishesDisplay.displayName = 'WishesDisplay';

export default WishesDisplay;
