import clsx from 'clsx';
import dayjs from 'dayjs';
import { range } from 'lodash-es';

export type XAxisByDayProps = {
  hoveredIndex?: number;
};

export const XAxisByDay = ({ hoveredIndex }: XAxisByDayProps) => {
  return (
    <div
      className={clsx(
        'flex flex-row w-full text-xs text-Gray-6 font-semibold justify-between pl-[40px] pr-[20px]',
        'justify-around',
      )}
    >
      {range(15)
        .reverse()
        .map((num: number) => (
          <div
            key={num}
            className={clsx('w-[25px] h-7 flex justify-center items-center', 'text-2xs', {
              'opacity-50': hoveredIndex !== undefined && hoveredIndex !== num,
            })}
          >
            {dayjs()
              .subtract(num * 2, 'day')
              .format('MM/DD')}
          </div>
        ))}
    </div>
  );
};
