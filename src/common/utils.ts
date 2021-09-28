import { AvatarProps } from '@mui/material';
import { format, isToday, isYesterday, parseISO } from 'date-fns';
import numeral from 'numeral';
import { FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import { LazyBuilder } from 'yup/lib/Lazy';

export function formatCurrency(n?: number): string {
  return n ? numeral(n).format('0,0.[00]') : '0';
}

export function hasSubArray(master: string[], sub: string[]): boolean {
  return master && sub && sub.every((value, index) => master.indexOf(value, index) + 1 > 0);
}

export async function sleep(milisecond: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, milisecond));
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
  /* eslint-enable no-bitwise */

  return color;
}

/**
 * Get avatar props with color based on name for MUI Avatar
 */
export function stringAvatar(name: string): AvatarProps {
  let initials = '';
  if (name.split(' ').length) {
    initials += name.split(' ')[0][0];
  }

  if (name.split(' ').length > 1) {
    initials += name.split(' ')[1][0];
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
      color: 'white',
    },
    children: initials,
  };
}

const isoDateFormat =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/;

const DATE_FORMAT = 'M/dd/yyyy';
export function formatDate(value: string | number | Date): string {
  if (!value) return 'Invalid Date';
  const isISODate = value === 'string' && isoDateFormat.test(value);
  const date = isISODate ? parseISO(value) : new Date(value);
  if (isToday(date)) {
    return `Today at ${format(date, 'kk:mm')}`;
  }

  if (isYesterday(date)) {
    return `Yesterday at ${format(date, 'kk:mm')}`;
  }
  return format(date, DATE_FORMAT);
}
