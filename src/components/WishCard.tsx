'use client';

import React, { useMemo, useState } from 'react';

interface WishCardProps {
  wish: {
    id: string;
    name: string;
    message: string;
    timestamp: string;
  };
  index: number;
  truncateLength?: number;
  showHeart?: boolean;
  timestampLabel?: string;
}

export default function WishCard({ wish, index, truncateLength = 180, showHeart = false, timestampLabel }: WishCardProps) {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = useMemo(() => {
    if (timestampLabel) {
      return timestampLabel;
    }
    const date = new Date(wish.timestamp);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [timestampLabel, wish.timestamp]);

  const truncateMessage = (message: string) => {
    if (message.length <= truncateLength) return message;
    return `${message.slice(0, truncateLength)}...`;
  };

  const showToggle = wish.message.length > truncateLength;

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #fff 0%, #f0fdf4 100%)',
        border: '2px solid #bbf7d0',
        borderRadius: '20px',
        padding: '24px',
        boxShadow: '0 10px 30px rgba(34, 197, 94, 0.1)',
        transition: 'all 0.3s ease',
        opacity: 0,
        animation: `fadeInUp 0.6s ease ${index * 0.05}s forwards`,
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
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
        &ldquo;{expanded ? wish.message : truncateMessage(wish.message)}
        {!expanded && showToggle && (
          <a
            onClick={() => setExpanded(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#15803d',
              fontWeight: 600,
              cursor: 'pointer',
              marginLeft: '6px'
            }}
          >
            &lt;Xem thêm&gt;
          </a>
        )}
        {expanded && showToggle && (
          <button
            onClick={() => setExpanded(false)}
            style={{
              background: 'none',
              border: 'none',
              color: '#15803d',
              fontWeight: 600,
              cursor: 'pointer',
              marginLeft: '6px'
            }}
          >
            &lt;ẩn bớt&gt;
          </button>
        )}
        &rdquo;
      </div>
      {showHeart && (
        <div style={{
          textAlign: 'center',
          fontSize: '20px',
          animation: 'heartbeat 2s infinite',
          marginTop: 'auto'
        }}>
          💕
        </div>
      )}
    </div>
  );
}

