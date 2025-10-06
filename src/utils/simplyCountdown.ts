/*!
 * Project : simply-countdown
 * File : simplyCountdown
 * Date : 27/06/2015
 * License : MIT
 * Version : 1.3.2
 * Author : Vincent Loy <vincent.loy1@gmail.com>
 * Contributors :
 *  - Justin Beasley <JustinB@harvest.org>
 *  - Nathan Smith <NathanS@harvest.org>
 *
 * Converted to TypeScript for wedding website
 */

import {
  CountdownConfig,
  CountdownElement,
  CountdownElements,
  DEFAULT_COUNTDOWN_CONFIG
} from '@/types/countdown';

/**
 * Function that merges user parameters with defaults
 */
export function extend<T extends Record<string, unknown>>(out: T, ...sources: Partial<T>[]): T {
  out = out || {} as T;

  for (let i = 0; i < sources.length; i++) {
    const obj = sources[i];
    if (obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            if (typeof out[key] === 'object' && out[key] !== null) {
              extend(out[key] as Record<string, unknown>, obj[key] as Record<string, unknown>);
            } else {
              (out as Record<string, unknown>)[key] = obj[key];
            }
          } else {
            (out as Record<string, unknown>)[key] = obj[key];
          }
        }
      }
    }
  }

  return out;
}

/**
 * Function that creates a countdown section
 */
export function createCountdownElement(
  countdown: HTMLElement,
  parameters: CountdownConfig,
  typeClass: string
): CountdownElement {
  const sectionTag = document.createElement('div');
  const amountTag = document.createElement('span');
  const wordTag = document.createElement('span');
  const innerSectionTag = document.createElement('div');

  innerSectionTag.appendChild(amountTag);
  innerSectionTag.appendChild(wordTag);
  sectionTag.appendChild(innerSectionTag);

  sectionTag.classList.add(parameters.sectionClass);
  sectionTag.classList.add(typeClass);
  amountTag.classList.add(parameters.amountClass);
  wordTag.classList.add(parameters.wordClass);

  countdown.appendChild(sectionTag);

  return {
    full: sectionTag,
    amount: amountTag,
    word: wordTag
  };
}

/**
 * Function that creates full countdown DOM elements
 */
export function createElements(
  parameters: CountdownConfig,
  countdown: HTMLElement
): CountdownElements | HTMLElement {
  if (!parameters.inline) {
    return {
      days: createCountdownElement(countdown, parameters, 'simply-days-section'),
      hours: createCountdownElement(countdown, parameters, 'simply-hours-section'),
      minutes: createCountdownElement(countdown, parameters, 'simply-minutes-section'),
      seconds: createCountdownElement(countdown, parameters, 'simply-seconds-section')
    };
  }

  const spanTag = document.createElement('span');
  spanTag.classList.add(parameters.inlineClass);
  return spanTag;
}

/**
 * Main simplyCountdown function
 */
export function simplyCountdown(selector: string, args?: Partial<CountdownConfig>): void {
  const parameters = { ...DEFAULT_COUNTDOWN_CONFIG, ...args };
  const countdownElements = document.querySelectorAll(selector);

  const targetTmpDate = new Date(
    parameters.year,
    parameters.month - 1,
    parameters.day,
    parameters.hours,
    parameters.minutes,
    parameters.seconds
  );

  let targetDate: Date;
  if (parameters.enableUtc) {
    targetDate = new Date(
      targetTmpDate.getUTCFullYear(),
      targetTmpDate.getUTCMonth(),
      targetTmpDate.getUTCDate(),
      targetTmpDate.getUTCHours(),
      targetTmpDate.getUTCMinutes(),
      targetTmpDate.getUTCSeconds()
    );
  } else {
    targetDate = targetTmpDate;
  }

  Array.prototype.forEach.call(countdownElements, (countdown: HTMLElement) => {
    const fullCountDown = createElements(parameters, countdown);
    let interval: number | undefined = undefined;

    const refresh = (): void => {
      let dayWord: string;
      let hourWord: string;
      let minuteWord: string;
      let secondWord: string;

      const now = new Date();
      let nowUtc: Date;
      let secondsLeft: number;

      if (parameters.enableUtc) {
        nowUtc = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes(),
          now.getSeconds()
        );
        secondsLeft = (targetDate.getTime() - nowUtc.getTime()) / 1000;
      } else {
        secondsLeft = (targetDate.getTime() - now.getTime()) / 1000;
      }

      let days: number;
      let hours: number;
      let minutes: number;
      let seconds: number;

      if (secondsLeft > 0) {
        days = Math.floor(secondsLeft / 86400);
        secondsLeft = secondsLeft % 86400;

        hours = Math.floor(secondsLeft / 3600);
        secondsLeft = secondsLeft % 3600;

        minutes = Math.floor(secondsLeft / 60);
        seconds = Math.floor(secondsLeft % 60);
      } else {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
        if (interval) {
          window.clearInterval(interval);
        }
        parameters.onEnd();
      }

      if (parameters.plural) {
        dayWord = days > 1
          ? parameters.words.days + parameters.words.pluralLetter
          : parameters.words.days;

        hourWord = hours > 1
          ? parameters.words.hours + parameters.words.pluralLetter
          : parameters.words.hours;

        minuteWord = minutes > 1
          ? parameters.words.minutes + parameters.words.pluralLetter
          : parameters.words.minutes;

        secondWord = seconds > 1
          ? parameters.words.seconds + parameters.words.pluralLetter
          : parameters.words.seconds;
      } else {
        dayWord = parameters.words.days;
        hourWord = parameters.words.hours;
        minuteWord = parameters.words.minutes;
        secondWord = parameters.words.seconds;
      }

      // Display inline countdown
      if (parameters.inline && fullCountDown instanceof HTMLElement) {
        countdown.innerHTML =
          `${days} ${dayWord}, ` +
          `${hours} ${hourWord}, ` +
          `${minutes} ${minuteWord}, ` +
          `${seconds} ${secondWord}.`;
      } else if (!parameters.inline && 'days' in fullCountDown) {
        const countdownEl = fullCountDown as CountdownElements;

        countdownEl.days.amount.textContent =
          (parameters.zeroPad && days.toString().length < 2 ? '0' : '') + days;
        countdownEl.days.word.textContent = dayWord;

        countdownEl.hours.amount.textContent =
          (parameters.zeroPad && hours.toString().length < 2 ? '0' : '') + hours;
        countdownEl.hours.word.textContent = hourWord;

        countdownEl.minutes.amount.textContent =
          (parameters.zeroPad && minutes.toString().length < 2 ? '0' : '') + minutes;
        countdownEl.minutes.word.textContent = minuteWord;

        countdownEl.seconds.amount.textContent =
          (parameters.zeroPad && seconds.toString().length < 2 ? '0' : '') + seconds;
        countdownEl.seconds.word.textContent = secondWord;
      }
    };

    // Refresh immediately to prevent Flash of Unstyled Content
    refresh();
    interval = window.setInterval(refresh, parameters.refresh);
  });
}

/**
 * jQuery plugin wrapper (if jQuery is available)
 */
export function initJQueryPlugin(): void {
  if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).jQuery) {
    const $ = (window as unknown as Record<string, unknown>).jQuery as Record<string, unknown>;

    function simplyCountdownify(el: string, options?: Partial<CountdownConfig>): void {
      simplyCountdown(el, options);
    }

    ($.fn as Record<string, unknown>).simplyCountdown = function(options?: Partial<CountdownConfig>) {
      return simplyCountdownify((this as Record<string, unknown>).selector as string, options);
    };
  }
}

// Auto-initialize jQuery plugin if available
if (typeof window !== 'undefined') {
  initJQueryPlugin();
}

// Export for global use
if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).simplyCountdown = simplyCountdown;
}
