import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/outline';
import dayjs from 'dayjs';
import { Button } from '../Button';

export type DateRangePickerCalendarHeaderProps = {
  month: Date;
  onNext?: () => void;
  onPrev?: () => void;
};

export const DateRangePickerCalendarHeader = ({
  month,
  onNext,
  onPrev,
}: DateRangePickerCalendarHeaderProps) => {
  return (
    <div className="flex items-center justify-between py-4 px-9">
      <div className="w-4 text-Gray-6 flex items-center">
        {!!onPrev && (
          <Button className="w-full" onClick={onPrev}>
            <ChevronLeftIcon />
          </Button>
        )}
      </div>
      <div className="font-semibold">{dayjs(month).format('MMMM YYYY')}</div>
      <div className="w-4 text-Gray-6 flex items-center">
        {!!onNext && (
          <Button className="w-full" onClick={onNext}>
            <ChevronRightIcon />
          </Button>
        )}
      </div>
    </div>
  );
};
