import { USE_PREV_YEAR_SPENDINGS } from '@/env';
import dayjs from 'dayjs';

const format = (date: Date | string, formatPattern = 'MM/DD/YY') => {
  try {
    return dayjs(date).format(formatPattern);
  } catch {
    return '';
  }
};

export const getThisYear = () => (USE_PREV_YEAR_SPENDINGS ? 2022 : 2023);

export const DateUtils = {
  format,
  getThisYear,
};
