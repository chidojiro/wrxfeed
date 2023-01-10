import { IS_DEMO } from '@/env';
import dayjs from 'dayjs';

const format = (date: Date | string, formatPattern = 'MM/DD/YY') => {
  try {
    return dayjs(date).format(formatPattern);
  } catch {
    return '';
  }
};

// TEMPORARY
const getThisYear = () => (IS_DEMO ? 2022 : 2023);

export const DateUtils = {
  format,
  getThisYear,
};
