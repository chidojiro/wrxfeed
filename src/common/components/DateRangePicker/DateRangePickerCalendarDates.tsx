import clsx from 'clsx';
import dayjs from 'dayjs';
import React from 'react';
import { Button } from '../Button';
import { useDateRangePickerContext } from './DateRangePickerProvider';
import { ViewableDate } from './types';

export type DateRangePickerCalendarDatesProps = {
  viewableDates: ViewableDate[];
  showNext?: boolean;
  showPrev?: boolean;
};

export const DateRangePickerCalendarDates = ({
  viewableDates,
  showNext,
  showPrev,
}: DateRangePickerCalendarDatesProps) => {
  const { checkIsInRange, checkIsSelected, handleDateClick, selectedRange } =
    useDateRangePickerContext();

  const renderViewableDate = ({ date, inMonth }: ViewableDate) => {
    if (!showPrev && inMonth === 'PREVIOUS_MONTH')
      return <div key={date.toString()} className="h-6" />;

    if (!showNext && inMonth === 'NEXT_MONTH') return <div key={date.toString()} className="h-6" />;

    return (
      <Button
        key={date.toString()}
        className={clsx('relative text-sm my-[3px] mx-[0.4px]', {
          'text-Gray-6': inMonth !== 'CURRENT_MONTH',

          'bg-Accent-3': checkIsInRange(date),
        })}
        onClick={() => handleDateClick(date)}
      >
        {selectedRange?.[0] && dayjs(selectedRange[0]).isSame(date) && (
          <div className="absolute left-0 top-0 h-full bg-white w-1/2"></div>
        )}
        <div
          className={clsx(
            'relative z-10 w-6 h-6 rounded-full mx-auto flex items-center justify-center',
            {
              'text-white bg-Accent-2': checkIsSelected(date),
            },
          )}
        >
          {date.getDate()}
        </div>
        {selectedRange?.[1] && dayjs(selectedRange[1]).isSame(date) && (
          <div className="absolute right-0 top-0 h-full bg-white w-1/2"></div>
        )}
      </Button>
    );
  };

  return <div className="grid grid-cols-7">{viewableDates.map(renderViewableDate)}</div>;
};
