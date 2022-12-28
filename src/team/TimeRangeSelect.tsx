import { Select } from '@/common/components';
import { Option } from '@/common/types';
import { DateRangeFilter } from '@/feed/types';

export type TimeRangeSelectProps = {
  value: DateRangeFilter;
  onChange: (value: DateRangeFilter) => void;
};

export const TimeRangeSelect = ({ value, onChange }: TimeRangeSelectProps) => {
  return (
    <Select
      value={value}
      onChange={(value: string) => onChange(value as DateRangeFilter)}
      className="text-Gray-6 flex-shrink-0"
      noBorder
      options={
        [
          { label: 'Last 30 Days', value: '30-days' },
          { label: 'Last 90 Days', value: '90-days' },
          { label: 'Year To Date', value: 'year-to-date' },
        ] as Option<DateRangeFilter>[]
      }
    />
  );
};
