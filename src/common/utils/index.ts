import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import numeral from 'numeral';
export { AssertUtils } from './assert';
export { DateUtils } from './date';
export { ReactUtils } from './react';
export { StringUtils } from './string';
export { NumberUtils } from './number';
export { CookiesUtils } from './cookies';

// Dayjs plugins
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);

dayjs.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'a few seconds',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1mo',
    MM: '%dmo',
    y: '1y',
    yy: '%dy',
  },
});

/**
 * Convert a string to color hex
 * @param string
 */
export function stringToColor(string: string): string {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }

  return color;
}

export const DATE_FORMAT = 'MM/DD/YY';
export const HOUR_FORMAT = 'h:mm A';
export function formatDate(value?: string | number | Date | dayjs.Dayjs): string {
  if (!dayjs(value).isValid()) return 'Invalid Date';
  const date = dayjs(value);
  if (date.isToday()) {
    return `Today at ${date.format(HOUR_FORMAT)}`;
  }

  if (date.isYesterday()) {
    return `Yesterday at ${date.format(HOUR_FORMAT)}`;
  }
  return date.format(DATE_FORMAT);
}

/**
 * Return the distance between the given date and now in words.
 */
export function distanceToNow(value?: string | number | Date | dayjs.Dayjs): string {
  if (!dayjs(value).isValid()) return '';
  return dayjs(value).fromNow();
}

export const EmailRegex = /[\w\d\\.-]+@[\w\d\\.-]+\.[\w\d\\.-]+/;

export const isEmail = (email: string): boolean => {
  return EmailRegex.test(email);
};

export const emailMatches = (text: string): RegExpMatchArray | null => {
  return text?.match(EmailRegex);
};

export const replaceAll = (str: string, find: string, replace: string): string => {
  return str.replace(new RegExp(find, 'g'), replace);
};

export const round = (number: number | string, decimals = 0): number => {
  const decimalPow = 10 ** decimals;
  let num: number;
  if (typeof number === 'string') {
    num = parseFloat(number);
  } else {
    num = number;
  }
  return Math.round((num + Number.EPSILON) * decimalPow) / decimalPow;
};

export interface FormatCurrencyOptions {
  value?: string | number;
  format?: string;
  defaultValue?: string;
  supportNegative?: boolean;
}

export function formatCurrency({
  value,
  format = '0,0.00',
  defaultValue = '0.00',
  supportNegative = true,
}: FormatCurrencyOptions): string {
  if (!value) {
    return defaultValue;
  }
  const number = supportNegative ? value : Math.abs(parseFloat(replaceAll(`${value}`, ',', '')));
  return numeral(number).format(format);
}
