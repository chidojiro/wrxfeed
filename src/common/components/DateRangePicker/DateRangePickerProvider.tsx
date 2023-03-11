import { ReactUtils } from '@/common/utils';
import { useDateRangePicker } from './useDateRangePicker';

const [DateRangePickerProvider, useDateRangePickerContext] =
  ReactUtils.createContext<ReturnType<typeof useDateRangePicker>>();

export { useDateRangePickerContext, DateRangePickerProvider };
