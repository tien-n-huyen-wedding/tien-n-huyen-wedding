'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MAIN_WEDDING_PARTY_INFO } from '@/utils/constants';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  targetDate?: Date;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Parse the date from constants if no targetDate prop is provided
  const parsedTargetDate = useMemo(() => {
    if (targetDate) {
      return targetDate.getTime();
    }

    // Parse the date string from constants: "30/11/2025 11:00 +07:00"
    const dateString = MAIN_WEDDING_PARTY_INFO.at;
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [time] = timePart.split(' ');
    const [hours, minutes] = time.split(':').map(Number);

    // Create date in UTC (subtract 7 hours for +07:00 timezone)
    const utcDate = new Date(Date.UTC(year, month - 1, day, hours - 7, minutes, 0));
    return utcDate.getTime();
  }, [targetDate]);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const nowUtcMs = Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
      );
      let secondsLeft = Math.floor((parsedTargetDate - nowUtcMs) / 1000);

      if (secondsLeft <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(secondsLeft / 86400);
      secondsLeft = secondsLeft % 86400;
      const hours = Math.floor(secondsLeft / 3600);
      secondsLeft = secondsLeft % 3600;
      const minutes = Math.floor(secondsLeft / 60);
      const seconds = Math.floor(secondsLeft % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [parsedTargetDate]);

  const dayWord = timeLeft.days === 1 ? 'day' : 'days';
  const hourWord = timeLeft.hours === 1 ? 'hour' : 'hours';
  const minuteWord = timeLeft.minutes === 1 ? 'minute' : 'minutes';
  const secondWord = timeLeft.seconds === 1 ? 'second' : 'seconds';

  const zeroPad = (value: number) => (value < 10 ? `0${value}` : String(value));

  return (
    <div ref={containerRef} className="simply-countdown simply-countdown-one">
      <div className="simply-section simply-days-section">
        <div>
          <span className="simply-amount">{zeroPad(timeLeft.days)}</span>
          <span className="simply-word">{dayWord}</span>
        </div>
      </div>
      <div className="simply-section simply-hours-section">
        <div>
          <span className="simply-amount">{zeroPad(timeLeft.hours)}</span>
          <span className="simply-word">{hourWord}</span>
        </div>
      </div>
      <div className="simply-section simply-minutes-section">
        <div>
          <span className="simply-amount">{zeroPad(timeLeft.minutes)}</span>
          <span className="simply-word">{minuteWord}</span>
        </div>
      </div>
      <div className="simply-section simply-seconds-section">
        <div>
          <span className="simply-amount">{zeroPad(timeLeft.seconds)}</span>
          <span className="simply-word">{secondWord}</span>
        </div>
      </div>
    </div>
  );
}
