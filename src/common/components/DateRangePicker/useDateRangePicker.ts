import { EMPTY_ARRAY } from '@/common/constants';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import { useControllableState } from '../../hooks';
import { DateRangePickerValue } from './types';

dayjs.extend(utc);
dayjs.extend(timezone);

type UseDateTimePickerProps = {
  value?: DateRangePickerValue;
  onChange?: (value: DateRangePickerValue) => void;
  defaultValue?: DateRangePickerValue;
};

export const trimTime = (date: dayjs.Dayjs | Date) => {
  const dateAsDayjs = dayjs(date);

  return dateAsDayjs.hour(0).minute(0).second(0).millisecond(0);
};

const convertToViewingMonth = (date: Date) => trimTime(dayjs(date).date(1)).toDate();

const isSameDay = (date1: Date, date2: Date) => date1.toDateString() === date2.toDateString();

export const useDateRangePicker = ({
  value: valueProp,
  onChange,
  defaultValue,
}: UseDateTimePickerProps) => {
  const todayRef = React.useRef(trimTime(dayjs()).toDate());

  const [value, setValue] = useControllableState({
    value: valueProp,
    onChange,
    defaultValue,
  });

  const defaultSelectedDate = value ?? EMPTY_ARRAY;
  const [selectedRange, setSelectedRange] = React.useState<Date[]>(defaultSelectedDate);

  const handleDateClick = React.useCallback((date: Date) => {
    setSelectedRange((prev) => {
      if (prev.length === 2 || !prev.length) {
        return [trimTime(date).toDate()];
      }

      if (trimTime(prev[0]).isAfter(trimTime(date))) return [date, ...prev];

      return [...prev, date];
    });
  }, []);

  const defaultViewingMonth = convertToViewingMonth(
    selectedRange?.[0] ? selectedRange[0] : todayRef.current,
  );
  const [viewingMonth, setViewingMonth] = React.useState(defaultViewingMonth);

  const viewNextMonth = React.useCallback(() => {
    setViewingMonth((prev) =>
      dayjs(prev)
        .month(dayjs(prev).month() + 1)
        .toDate(),
    );
  }, []);

  const viewPreviousMonth = React.useCallback(() => {
    setViewingMonth((prev) =>
      dayjs(prev)
        .month(dayjs(prev).month() - 1)
        .toDate(),
    );
  }, []);

  const confirm = React.useCallback(() => {
    if (selectedRange.length === 2) setValue(selectedRange as any);
  }, [selectedRange, setValue]);

  const checkIsSelected = React.useCallback(
    (date) => !!selectedRange.find((selectedDate) => isSameDay(selectedDate, date)),
    [selectedRange],
  );

  const checkIsInRange = React.useCallback(
    (date) =>
      selectedRange.length === 2 &&
      !trimTime(date).isBefore(selectedRange[0]) &&
      !trimTime(date).isAfter(selectedRange[1]),
    [selectedRange],
  );

  return React.useMemo(
    () => ({
      today: todayRef.current,
      selectedRange,
      handleDateClick,
      viewingMonth,
      viewNextMonth,
      viewPreviousMonth,
      confirm,
      setViewingMonth,
      checkIsSelected,
      checkIsInRange,
      setSelectedRange,
    }),
    [
      checkIsInRange,
      checkIsSelected,
      confirm,
      handleDateClick,
      selectedRange,
      viewNextMonth,
      viewPreviousMonth,
      viewingMonth,
      setSelectedRange,
    ],
  );
};
