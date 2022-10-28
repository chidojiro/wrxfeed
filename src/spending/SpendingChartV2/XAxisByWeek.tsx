import clsx from 'clsx';
import dayjs from 'dayjs';
import { range } from 'lodash-es';

export type XAxisByWeekProps = {
  hoveredIndex?: number;
};

export const XAxisByWeek = ({ hoveredIndex }: XAxisByWeekProps) => {
  return (
    <div
      className={clsx(
        'flex flex-row w-full text-xs text-Gray-6 justify-between pl-[48px] pr-[10px]',
        'justify-around',
        'relative',
      )}
    >
      <div className="absolute -left-1 text-Gray-6 top-1/2 transform -translate-y-1/2">Week of</div>
      {range(12)
        .reverse()
        .map((num: number) => (
          <div
            key={num}
            className={clsx('w-[25px] h-7 flex justify-center items-center', 'text-[11px]', {
              'opacity-50': hoveredIndex !== undefined && hoveredIndex !== num,
            })}
          >
            {dayjs().day(1).subtract(num, 'week').format('MM/DD')}
          </div>
        ))}
    </div>
  );
};
