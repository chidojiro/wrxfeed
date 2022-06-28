import dayjs from 'dayjs';

const format = (date: Date | string, formatPattern = 'MM/DD/YY') => {
  try {
    return dayjs(date).format(formatPattern);
  } catch {
    return '';
  }
};

export const DateUtils = {
  format,
};
