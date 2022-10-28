import { useBreakpoint } from '@/common/hooks';
import { DateRangeFilter } from '@/feed/types';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { range } from 'lodash-es';

export type XAxisByMonthProps = {
  bar?: boolean;
  hoveredIndex?: number;
  dateRange?: DateRangeFilter;
};

const START_MONTH = 1;
const END_MONTH = 12;

export const XAxisByMonth = ({ hoveredIndex }: XAxisByMonthProps) => {
  const isMobile = useBreakpoint({ '768': false }) ?? true;

  return (
    <div
      className={clsx(
        'flex flex-row w-full text-xs text-Gray-6 font-semibold justify-between pl-[48px] pr-[10px]',
        'justify-around',
      )}
    >
      {range(START_MONTH, END_MONTH + 1).map((month: number, idx) => (
        <div
          key={month}
          className={clsx(
            'w-[25px] h-7 flex justify-center items-center first:justify-start last:justify-end',
            { 'opacity-50': hoveredIndex !== undefined && hoveredIndex !== idx },
          )}
        >
          <p>
            {isMobile
              ? dayjs()
                  .month(month - 1)
                  .format('MMM')
                  .slice(0, 1)
              : dayjs()
                  .month(month - 1)
                  .format('MMM')}
          </p>
        </div>
      ))}
    </div>
  );
};
