'use client';

import React from 'react';
import { InvitationCardProps, InvitationSize } from '../types/invitation';

interface InvitationCardComponentProps extends InvitationCardProps {
  size?: 'small' | 'medium' | 'large';
  subtitle?: string;
  greeting?: string;
  guestName?: string;
}

const SIZE_CONFIG: Record<string, InvitationSize> = {
  small: { width: 400, height: 600, scale: 0.8 },
  medium: { width: 500, height: 750, scale: 1.0 },
  large: { width: 600, height: 900, scale: 1.2 },
};

export default function InvitationCard({
  data,
  className = '',
  size = 'medium',
  showRSVP = false,
  showDressCode = false,
  subtitle = 'Together with their families',
  greeting = 'Dear',
  guestName = ''
}: InvitationCardComponentProps) {
  const sizeConfig = SIZE_CONFIG;

  const currentSize = sizeConfig[size];

  const cardStyle: React.CSSProperties = {
    width: `${currentSize.width}px`,
    height: `${currentSize.height}px`,
    backgroundImage: 'url(/images/invitation_card_bg.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    margin: '0 auto',
    transform: `scale(${currentSize.scale})`,
    transformOrigin: 'center top',
    fontFamily: "'Sacramento', cursive, serif",
    color: data.colorScheme?.primary || '#8B4513',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const contentStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    width: '80%',
    zIndex: 2,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: size === 'large' ? '3.5rem' : size === 'medium' ? '3rem' : '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    color: data.colorScheme?.primary || '#8B4513',
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: size === 'large' ? '2.2rem' : size === 'medium' ? '2rem' : '1.9rem',
    marginBottom: '0.5rem',
    color: data.colorScheme?.secondary || '#A0522D',
    lineHeight: '1.4',
  };

  const dateStyle: React.CSSProperties = {
    fontSize: size === 'large' ? '2.5rem' : size === 'medium' ? '2.2rem' : '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: data.colorScheme?.accent || '#CD853F',
  };

  const venueStyle: React.CSSProperties = {
    fontSize: size === 'large' ? '2.1rem' : size === 'medium' ? '1.9rem' : '1.8rem',
    marginBottom: '1rem',
    color: data.colorScheme?.secondary || '#A0522D',
  };

  const messageStyle: React.CSSProperties = {
    fontSize: size === 'large' ? '2rem' : size === 'medium' ? '1.9rem' : '1.8rem',
    fontStyle: 'italic',
    marginBottom: '1rem',
    color: data.colorScheme?.secondary || '#A0522D',
    lineHeight: '1.4',
  };

  const rsvpStyle: React.CSSProperties = {
    fontSize: size === 'large' ? '1.9rem' : size === 'medium' ? '1.8rem' : '1.7rem',
    color: data.colorScheme?.accent || '#CD853F',
    fontWeight: 'bold',
  };

  const greetingStyle: React.CSSProperties = {
    fontSize: size === 'large' ? '2.2rem' : size === 'medium' ? '2rem' : '1.9rem',
    marginBottom: '0.5rem',
    color: data.colorScheme?.secondary || '#A0522D',
    fontStyle: 'italic',
    textAlign: 'center',
    fontWeight: 'bold',
  };

  return (
    <div className={`invitation-card ${className}`} style={cardStyle}>
      <div style={contentStyle}>
        {/* Main Title */}
        <h1 style={titleStyle}>
          Quang Tiến
        </h1>

        <h1 style={titleStyle}>
          &
        </h1>

        <h1 style={titleStyle}>
          Lệ Huyền
        </h1>

        {/* Subtitle */}
        <div style={messageStyle}>{subtitle}</div>

        {/* Greeting and Guest Name */}
        {guestName && (
          <div style={greetingStyle}>
            {greeting} {guestName},
          </div>
        )}

        {/* Wedding Date */}
        <div style={dateStyle}>
          {data.weddingDate}
        </div>

        {/* Wedding Time */}
        <div style={subtitleStyle}>
          {data.weddingTime}
        </div>

        {/* Venue */}
        <div style={venueStyle}>
          <div style={{ fontWeight: 'bold', marginBottom: '0.3rem' }}>
            {data.venue}
          </div>
          <div style={{ fontSize: '0.9em' }}>
            {data.venueAddress}
          </div>
        </div>

        {/* Optional Message */}
        {data.message && (
          <div style={messageStyle}>
            {data.message}
          </div>
        )}

        {/* Dress Code */}
        {showDressCode && data.dressCode && (
          <div style={subtitleStyle}>
            <strong>Dress Code:</strong> {data.dressCode}
          </div>
        )}

        {/* RSVP Information */}
        {showRSVP && data.rsvpInfo && (
          <div style={rsvpStyle}>
            {data.rsvpInfo}
          </div>
        )}
      </div>

      {/* Decorative elements overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
