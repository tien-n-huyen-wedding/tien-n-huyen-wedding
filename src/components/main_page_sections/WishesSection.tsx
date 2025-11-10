'use client';

import { useState, useEffect, useRef } from 'react';
import WishesForm from '@/components/WishesForm';
import WishesDisplay, { Wish, WishesDisplayRef } from '@/components/WishesDisplay';
import { submitWish, fetchWishes } from '../../utils/googleSheets';
import { InvitationProps } from '@/components/invitation/Invitation';

interface WishesSectionProps {
  invitationProps?: Partial<InvitationProps>;
  isLoaded?: boolean;
}

export default function WishesSection({
  invitationProps = {},
  isLoaded = false
}: WishesSectionProps) {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const wishesDisplayRef = useRef<WishesDisplayRef>(null);

  // Load wishes on component mount
  useEffect(() => {
    loadWishes();
  }, []);

  const loadWishes = async () => {
    setIsLoading(true);
    try {
      const wishesData = await fetchWishes();
      // Sort wishes from oldest to newest by timestamp (numeric comparison)
      const sortedWishes = [...wishesData].sort((a, b) => {
        return Date.parse(a.timestamp) - Date.parse(b.timestamp);
      });
      setWishes(sortedWishes);
    } catch (error) {
      console.error('Error loading wishes:', error);
      setWishes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitWish = async (wishData: any) => {
    setIsSubmitting(true);
    try {
      const newWish = await submitWish(wishData);
      // Add new wish and sort from oldest to newest (numeric comparison)
      setWishes(prev => {
        const updated = [...prev, newWish];
        return updated.sort((a, b) => {
          return Date.parse(a.timestamp) - Date.parse(b.timestamp);
        });
      });
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
      // Navigate to last page after wish is added (with delay to ensure state update)
      setTimeout(() => {
        wishesDisplayRef.current?.goToLastPage();
      }, 100);
    } catch (error) {
      console.error('Error submitting wish:', error);
      // submitWish already handles fallback, so this shouldn't happen
      // But just in case, show a user-friendly message
      alert('Có lỗi xảy ra khi gửi lời chúc. Lời chúc đã được lưu tạm thời.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Other Sections */}
      <section id="wishes-display" className="py-20 bg-gradient-to-br from-pink-50 via-white to-pink-50">
        <div className="container mx-auto px-4">
          {/* Display Section */}
          <div className="max-w-7xl mx-auto">
            <WishesDisplay
              ref={wishesDisplayRef}
              wishes={wishes}
              isLoading={isLoading}
              onRefresh={loadWishes}
            />
          </div>
        </div>
      </section>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white text-green-600 px-8 py-6 rounded-2xl shadow-2xl animate-scale-in max-w-md mx-4 text-center">
            <div className="flex flex-col items-center">
              <span className="text-6xl mb-4">✅</span>
              <h3 className="text-2xl font-bold mb-2">Cảm ơn bạn!</h3>
              <p className="text-lg">Lời chúc mừng của bạn đã được gửi thành công!</p>
            </div>
          </div>
        </div>
      )}

      {/* Form Section with Background */}
      <WishesForm
        onSubmit={handleSubmitWish}
        isLoading={isSubmitting}
        invitationProps={invitationProps}
        isLoaded={isLoaded}
      />

      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
