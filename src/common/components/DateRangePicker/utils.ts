import dayjs from 'dayjs';
import { ViewableDate } from './types';

const getDatesOfMonth = (dayjsDate: dayjs.Dayjs) => {
  const lastDateOfMonth = dayjsDate.endOf('month').date();

  return new Array(lastDateOfMonth).fill(null).map((_, idx) => trimTime(dayjsDate.date(idx + 1)));
};

const trimTime = (day: dayjs.Dayjs) => day.hour(0).minute(0).second(0).millisecond(0);

export const getViewableCalendarDates = (month: Date): ViewableDate[] => {
  const viewingMonth = dayjs(month);

  const firstDayjsOfMonth = viewingMonth.startOf('month');
  const lastDayjsOfMonth = viewingMonth.endOf('month');

  const lastMonthDates = getDatesOfMonth(viewingMonth.month(viewingMonth.month() - 1));
  const thisMonthDates = getDatesOfMonth(viewingMonth);
  const nextMonthDates = getDatesOfMonth(viewingMonth.month(viewingMonth.month() + 1));

  const firstDayOfMonth = (firstDayjsOfMonth.day() || 7) - 1;
  const lastDayOfMonth = (lastDayjsOfMonth.day() || 7) - 1;

  return [
    (lastMonthDates.slice(lastMonthDates.length - firstDayOfMonth) ?? []).map((date) => ({
      date: date.toDate(),
      inMonth: 'PREVIOUS_MONTH',
    })),
    thisMonthDates.map((date) => ({ date: date.toDate(), inMonth: 'CURRENT_MONTH' })),
    (nextMonthDates.slice(0, 6 - lastDayOfMonth) ?? []).map((date) => ({
      date: date.toDate(),
      inMonth: 'NEXT_MONTH',
    })),
    ,
  ].flat() as any;
};
