import { AddSmallSolid } from '@/assets';
import {
  Button,
  DateRangePicker,
  DateRangePickerValue,
  Popover,
  Select,
} from '@/common/components';
import { Radio } from '@/common/components/Radio';
import { useDisclosure } from '@/common/hooks';
import { Option } from '@/common/types';
import { DateRangeFilter } from '@/feed/types';
import clsx from 'clsx';
import dayjs from 'dayjs';

export type DateRangeSelectProps = {
  value?: DateRangeFilter;
  onChange?: (value: DateRangeFilter) => void;
  variant?: 'outline' | 'text';
};

const convertDateRangeValueToString = (value: DateRangePickerValue) =>
  `${dayjs(value[0]).format('MMM DD, YYYY')} - ${dayjs(value[1]).format('MMM DD, YYYY')}`;

export const DateRangeSelect = ({ value, onChange, variant = 'text' }: DateRangeSelectProps) => {
  const popoverDisclosure = useDisclosure();

  return (
    <Popover
      open={popoverDisclosure.isOpen}
      onClose={popoverDisclosure.close}
      placement="bottom"
      trigger={
        <Select
          value={Array.isArray(value) ? convertDateRangeValueToString(value) : value}
          onChange={(value: string) => onChange?.(value as DateRangeFilter)}
          className={clsx('flex-shrink-0', { 'text-Gray-6': variant === 'text' })}
          noBorder={variant === 'text'}
          options={
            [
              { label: 'Last 30 Days', value: '30-days' },
              { label: 'Last 90 Days', value: '90-days' },
              { label: 'Year To Date', value: 'year-to-date' },
              {
                label: 'Custom Date',
                value: Array.isArray(value) ? convertDateRangeValueToString(value) : 'custom',
              },
            ] as Option<any>[]
          }
          renderSelectedItemLabel={({ label, value }) => {
            if (label === 'Custom Date') return value;

            return label;
          }}
          renderItem={({ selected, label, value, handleClick }) => {
            if (value.includes(' - ') || value === 'custom')
              return (
                <Button
                  className="flex items-center gap-2 border-t border-Gray-11 w-full py-2 px-4 text-Gray-3 text-sm"
                  onClick={popoverDisclosure.toggle}
                >
                  <AddSmallSolid width={20} height={20} />
                  <div>{label}</div>
                </Button>
              );

            return (
              <Button
                className="py-2 px-4 text-Gray-3 text-sm flex items-center gap-2"
                onClick={handleClick}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Radio checked={selected}></Radio>
                </div>
                <div className="text-sm">{label}</div>
              </Button>
            );
          }}
        />
      }
    >
      {popoverDisclosure.isOpen && (
        <DateRangePicker
          value={typeof value !== 'string' ? value : undefined}
          onChange={onChange}
          onClose={popoverDisclosure.close}
        />
      )}
    </Popover>
  );
};
