import { format, isToday, isYesterday, parseISO } from 'date-fns';
import numeral from 'numeral';
import { FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import { LazyBuilder } from 'yup/lib/Lazy';

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

const isoDateFormat =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/;

const DATE_FORMAT = 'M/dd/yy';
export function formatDate(value: string | number | Date | undefined): string {
  if (!value) return 'Invalid Date';
  const isISODate = value === 'string' && isoDateFormat.test(value);
  const date = isISODate ? parseISO(value) : new Date(value);
  if (isToday(date)) {
    return `Today at ${format(date, 'K:mm a')}`;
  }

  if (isYesterday(date)) {
    return `Yesterday at ${format(date, 'K:mm a')}`;
  }
  return format(date, DATE_FORMAT);
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
  const result = replaceAll(value, ',', '');
  const result2 = `${result.replace(new RegExp(/[^0-9]+/, 'g'), ',')}`;
  return `${currency}${result2.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/, 'g'), ',')}`;
};

// return `${currency}${value
//   .replace(/(?!\.)\D/g, '')
//   .replace(/(?<=\..*)\./g, '')
//   .replace(/(?<=\.\d\d).*/g, '')
//   .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
