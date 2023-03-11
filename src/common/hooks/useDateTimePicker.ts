import dayjs from 'dayjs';
import { padStart } from 'lodash-es';
import React from 'react';
import { useControllableState } from '../hooks';

type UseDateTimePickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
};

export const trimTime = (day: dayjs.Dayjs) => day.hour(0).minute(0).second(0).millisecond(0);

const convertToViewingMonth = (day: dayjs.Dayjs) => trimTime(day.date(1));

export const useDateTimePicker = ({
  value: valueProp,
  onChange,
  defaultValue,
}: UseDateTimePickerProps) => {
  const todayRef = React.useRef(trimTime(dayjs()));

  const [value, setValue] = useControllableState({
    value: valueProp,
    onChange,
    defaultValue: defaultValue ?? todayRef.current.toISOString(),
  });

  const valueDate = dayjs(value);

  const defaultSelectedDate = value ? trimTime(valueDate) : todayRef.current;
  const [selectedDate, setSelectedDate] = React.useState(defaultSelectedDate);

  const defaultSelectedTime = value
    ? `${padStart(valueDate.hour().toString(), 2, '0')}:${padStart(
        valueDate.minute().toString(),
        2,
        '0',
      )}`
    : '00:00';
  const [selectedTime, setSelectedTime] = React.useState<string>(defaultSelectedTime);

  const defaultViewingMonth = convertToViewingMonth(value ? trimTime(valueDate) : todayRef.current);
  const [viewingMonth, setViewingMonth] = React.useState(defaultViewingMonth);

  const viewNextMonth = React.useCallback(() => {
    setViewingMonth((prev) => dayjs(prev).month(prev.month() + 1));
  }, []);

  const viewPreviousMonth = React.useCallback(() => {
    setViewingMonth((prev) => dayjs(prev).month(prev.month() - 1));
  }, []);

  const apply = React.useCallback(() => {
    const [selectedHour, selectedMinute] = selectedTime.split(':');

    setValue(dayjs(selectedDate).hour(+selectedHour).minute(+selectedMinute).toISOString());
  }, [selectedDate, selectedTime, setValue]);

  const getDatesOfMonth = React.useCallback((dayjsDate: dayjs.Dayjs) => {
    const lastDateOfMonth = dayjsDate.endOf('month').date();

    return new Array(lastDateOfMonth).fill(null).map((_, idx) => trimTime(dayjsDate.date(idx + 1)));
  }, []);

  const viewingDates = React.useMemo(() => {
    const firstDayjsOfMonth = viewingMonth.startOf('month');
    const lastDayjsOfMonth = viewingMonth.endOf('month');

    const lastMonthDates = getDatesOfMonth(viewingMonth.month(viewingMonth.month() - 1));
    const thisMonthDates = getDatesOfMonth(viewingMonth);
    const nextMonthDates = getDatesOfMonth(viewingMonth.month(viewingMonth.month() + 1));

    const firstDayOfMonth = (firstDayjsOfMonth.day() || 7) - 1;
    const lastDayOfMonth = (lastDayjsOfMonth.day() || 7) - 1;

    return [
      lastMonthDates.slice(lastMonthDates.length - firstDayOfMonth),
      thisMonthDates,
      nextMonthDates.slice(0, 6 - lastDayOfMonth),
    ].flat();
  }, [getDatesOfMonth, viewingMonth]);

  return React.useMemo(
    () => ({
      viewingDates,
      today: todayRef.current,
      selectedDate,
      selectDate: setSelectedDate,
      selectedTime,
      selectTime: setSelectedTime,
      viewingMonth,
      viewNextMonth,
      viewPreviousMonth,
      apply,
      setViewingMonth,
    }),
    [
      apply,
      selectedDate,
      selectedTime,
      viewNextMonth,
      viewPreviousMonth,
      viewingDates,
      viewingMonth,
      setViewingMonth,
    ],
  );
};
