// Countdown configuration interface
export interface CountdownConfig {
  year: number;
  month: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  words: CountdownWords;
  plural: boolean;
  inline: boolean;
  enableUtc: boolean;
  onEnd: () => void;
  refresh: number;
  inlineClass: string;
  sectionClass: string;
  amountClass: string;
  wordClass: string;
  zeroPad: boolean;
}

// Countdown words configuration
export interface CountdownWords {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  pluralLetter: string;
}

// Countdown element structure
export interface CountdownElement {
  full: HTMLElement;
  amount: HTMLElement;
  word: HTMLElement;
}

// Full countdown elements
export interface CountdownElements {
  days: CountdownElement;
  hours: CountdownElement;
  minutes: CountdownElement;
  seconds: CountdownElement;
}

// Countdown time values
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Default countdown configuration
export const DEFAULT_COUNTDOWN_CONFIG: CountdownConfig = {
  year: 2015,
  month: 6,
  day: 28,
  hours: 0,
  minutes: 0,
  seconds: 0,
  words: {
    days: 'day',
    hours: 'hour',
    minutes: 'minute',
    seconds: 'second',
    pluralLetter: 's'
  },
  plural: true,
  inline: false,
  enableUtc: true,
  onEnd: () => {
    return;
  },
  refresh: 1000,
  inlineClass: 'simply-countdown-inline',
  sectionClass: 'simply-section',
  amountClass: 'simply-amount',
  wordClass: 'simply-word',
  zeroPad: false
};
