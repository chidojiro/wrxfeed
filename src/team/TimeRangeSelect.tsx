import { Select } from '@/common/components';
import { Option } from '@/common/types';
import React from 'react';
import { TimeRange } from './types';

export type TimeRangeSelectProps = {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
};

export const TimeRangeSelect = ({ value, onChange }: TimeRangeSelectProps) => {
  return (
    <Select
      value={value}
      onChange={(value: string) => onChange(value as TimeRange)}
      className="text-Gray-6"
      options={
        [
          { label: 'Last 30 Days', value: 'last-30-days' },
          { label: 'Last 90 Days', value: 'last-90-days' },
          { label: 'Year To Date', value: 'year-to-date' },
        ] as Option<TimeRange>[]
      }
    />
  );
};
