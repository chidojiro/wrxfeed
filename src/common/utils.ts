import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import updateLocale from 'dayjs/plugin/updateLocale';
import relativeTime from 'dayjs/plugin/relativeTime';
import numeral from 'numeral';
import { FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import { LazyBuilder } from 'yup/lib/Lazy';

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
    MM: '%dm',
    y: '1y',
    yy: '%dy',
  },
});

export function formatCurrency(n?: number): string {
  return n ? numeral(n).format('0,0.00') : '0.00';
}

export function hasSubArray(master: string[], sub: string[]): boolean {
  return master && sub && sub.every((value, index) => master.indexOf(value, index) + 1 > 0);
}

export async function sleep(millisecond: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, millisecond));
}

/**
 * Yup validation rule, allow value to be empty string or number.
 * @example
 * const schema = yup.object().shape({
 *  income: yup.lazy(emptyStringOrNumber),
 *  outcome: yup.lazy(emptyStringOrNumber),
 * });
 */
export const emptyStringOrNumber: LazyBuilder = (value) =>
  value === '' ? yup.string() : yup.number().positive().integer('This field must be integer');

export function removeEmptyFields(data: FieldValues): FieldValues {
  return Object.entries(data).reduce((current, [key, value]) => {
    return value ? { ...current, [key]: value } : current;
  }, {});
}

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

const DATE_FORMAT = 'MM/DD/YYYY';
const HOUR_FORMAT = 'h:mm A';
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
  if (!dayjs(value).isValid()) return 'Invalid Date';
  return dayjs(value).fromNow();
}

/**
 * Join multiple classNames
 */
export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
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

export const formatToCurrency = (value: string, currency = '$'): string => {
  const result = replaceAll(value, ',', '').replace(new RegExp(/[^0-9]+/, 'g'), ',');
  return `${currency}${result.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/, 'g'), ',')}`;
};
