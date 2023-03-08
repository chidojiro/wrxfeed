import { useBreakpoint } from '@/common/hooks';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { range } from 'lodash-es';

export type XAxisProps = {
  startMonth: number;
  endMonth: number;
  bar?: boolean;
};

export const XAxis = ({ startMonth, endMonth, bar }: XAxisProps) => {
  const isMobile = useBreakpoint({ '768': false }) ?? true;

  const targetDate = dayjs().set('month', startMonth - 1);

  return startMonth === endMonth ? (
    <div
      className={clsx(
        'flex flex-row w-full text-xs text-Gray-6 font-semibold justify-around my-1 pl-[48px] pr-[10px]',
      )}
    >
      <div className="w-20 h-7 flex justify-center items-center">
        <p>{targetDate.date(7).format('MMM D')}</p>
      </div>
      <div className="w-20 h-7 flex justify-center items-center">
        <p>{targetDate.date(14).format('MMM D')}</p>
      </div>
      <div className="w-20 h-7 flex justify-center items-center">
        <p>{targetDate.date(21).format('MMM D')}</p>
      </div>
      <div className="w-20 h-7 flex justify-center items-center">
        <p>{targetDate.date(28).format('MMM D')}</p>
      </div>
    </div>
  ) : (
    <div
      className={clsx(
        'flex flex-row w-full text-xs text-Gray-6 font-semibold justify-between pl-[48px] pr-[10px]',
        { 'justify-around pl-[48px] pr-[10px]': bar, 'pl-[38px]': !bar },
      )}
    >
      {!bar && (
        <div className="w-[25px] h-7 flex justify-center items-center first:justify-start last:justify-end"></div>
      )}
      {range(startMonth, endMonth + 1).map((month: number) => (
        <div
          key={`x-${month}`}
          className="w-[25px] h-7 flex justify-center items-center first:justify-start last:justify-end"
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
