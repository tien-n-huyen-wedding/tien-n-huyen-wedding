'use client';

import { useState, useEffect } from 'react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Set the wedding date: November 30, 2025
    const weddingDate = new Date('2025-11-30T16:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="simply-countdown simply-countdown-one">
      <div className="simply-section">
        <div>
          <span className="simply-amount">{timeLeft.days}</span>
          <span className="simply-word">Days</span>
        </div>
      </div>
      <div className="simply-section">
        <div>
          <span className="simply-amount">{timeLeft.hours}</span>
          <span className="simply-word">Hours</span>
        </div>
      </div>
      <div className="simply-section">
        <div>
          <span className="simply-amount">{timeLeft.minutes}</span>
          <span className="simply-word">Minutes</span>
        </div>
      </div>
      <div className="simply-section">
        <div>
          <span className="simply-amount">{timeLeft.seconds}</span>
          <span className="simply-word">Seconds</span>
        </div>
      </div>
    </div>
  );
}
