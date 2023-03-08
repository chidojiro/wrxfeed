import dayjs from 'dayjs';
import { range } from 'lodash-es';

export type DateRangePickerCalendarDaysProps = {
  //
};

export const DateRangePickerCalendarDays = ({}: DateRangePickerCalendarDaysProps) => {
  return (
    <div className="flex w-full">
      {range(7).map((idx) => (
        <div key={idx} className="flex flex-1 items-center justify-center h-8 text-sm">
          {dayjs()
            .day(idx + 1)
            .format('ddd')}
        </div>
      ))}
    </div>
  );
};
