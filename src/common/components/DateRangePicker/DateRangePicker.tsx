import { ClassName } from '@/common/types';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { Button } from '../Button';
import { DateRangePickerCalendar } from './DateRangePickerCalendar';
import { DateRangePickerProvider } from './DateRangePickerProvider';
import { DateRangePickerValue } from './types';
import { useDateRangePicker } from './useDateRangePicker';

export type DateRangePickerProps = ClassName & {
  value?: DateRangePickerValue;
  onChange?: (value: DateRangePickerValue) => void;
  defaultValue?: DateRangePickerValue;
  onClose?: () => void;
};

export const DateRangePicker = ({ className, onClose, ...restProps }: DateRangePickerProps) => {
  const DateRangePickerMethods = useDateRangePicker(restProps);
  const {
    viewingMonth,
    viewNextMonth,
    viewPreviousMonth,
    setSelectedRange,
    confirm,
    selectedRange,
  } = DateRangePickerMethods;

  return (
    <DateRangePickerProvider value={DateRangePickerMethods}>
      <div
        className={clsx('bg-white', 'w-[560px]', 'rounded', className)}
        style={{
          boxShadow: '0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31)',
        }}
      >
        <div className="flex gap-1">
          <DateRangePickerCalendar viewingMonth={viewingMonth} onPrev={viewPreviousMonth} />
          <DateRangePickerCalendar
            viewingMonth={dayjs(viewingMonth).add(1, 'month').toDate()}
            onNext={viewNextMonth}
          />
        </div>
        <div className="p-4 flex items-center justify-between">
          <Button className="text-Gray-3 text-sm font-semibold" onClick={onClose}>
            Cancel custom date
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" colorScheme="gray" onClick={() => setSelectedRange([])}>
              Clear
            </Button>
            <Button
              variant="solid"
              onClick={() => {
                confirm();
                onClose?.();
              }}
              disabled={selectedRange.length < 2}
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </DateRangePickerProvider>
  );
};
