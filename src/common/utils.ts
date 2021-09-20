import numeral from 'numeral';
import { FieldValues } from 'react-hook-form';
import * as yup from 'yup';
import { LazyBuilder } from 'yup/lib/Lazy';

export function formatNumber(n?: number): string {
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
