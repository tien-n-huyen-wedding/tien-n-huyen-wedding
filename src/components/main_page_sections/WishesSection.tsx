'use client';

import { useState, useEffect } from 'react';
import WishesForm from '@/components/WishesForm';
import WishesDisplay, { Wish } from '@/components/WishesDisplay';
import { submitWish, fetchWishes, mockWishes } from '../../utils/googleSheets';

export default function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Load wishes on component mount
  useEffect(() => {
    loadWishes();
  }, []);

  const loadWishes = async () => {
    setIsLoading(true);
    try {
      const wishesData = await fetchWishes();
      setWishes(wishesData);
    } catch (error) {
      console.error('Error loading wishes:', error);
      // fetchWishes already handles fallback to mock data
      setWishes(mockWishes);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitWish = async (wishData: any) => {
    setIsSubmitting(true);
    try {
      const newWish = await submitWish(wishData);
      setWishes(prev => [newWish, ...prev]);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
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
