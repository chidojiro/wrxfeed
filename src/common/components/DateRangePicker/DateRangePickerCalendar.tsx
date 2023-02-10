import React from 'react';
import { DateRangePickerCalendarDates } from './DateRangePickerCalendarDates';
import { DateRangePickerCalendarDays } from './DateRangePickerCalendarDays';
import { DateRangePickerCalendarHeader } from './DateRangePickerCalendarHeader';
import { getViewableCalendarDates } from './utils';

export type DateRangePickerCalendarProps = {
  viewingMonth: Date;
  onNext?: () => void;
  onPrev?: () => void;
};

export const DateRangePickerCalendar = ({
  viewingMonth,
  onNext,
  onPrev,
}: DateRangePickerCalendarProps) => {
  const viewableDates = getViewableCalendarDates(viewingMonth);

  return (
    <div className="flex-1 flex flex-col">
      <DateRangePickerCalendarHeader month={viewingMonth} onNext={onNext} onPrev={onPrev} />
      <div className="py-2 px-3 border-t border-b border-Gray-11 flex-1">
        <DateRangePickerCalendarDays />
        <div className="h-44">
          <DateRangePickerCalendarDates
            viewableDates={viewableDates}
            showNext={!!onNext}
            showPrev={!!onPrev}
          />
        </div>
      </div>
    </div>
  );
};
