import { ClassName } from '@/common/types';
import { LineChartData } from '@/main/types';
import { decimalLogic, DecimalType } from '@/main/utils';
import { TargetChart } from '@/target/TargetChart';
import { TargetStatusConfig } from '@/target/types';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { cloneDeep, range } from 'lodash-es';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { defaultMonths } from './constants';
import { Period, Spending, TrackingStatus } from './types';
import { getLineChartDataInMonth, getMonthsLineChartData, isEmptyPeriods } from './utils';

export type SpendingChartData = {
  periods?: Period[];
  trackingStatus?: TrackingStatus;
  spendings: Spending[];
};

export type SpendingChartProps = ClassName & {
  data: SpendingChartData;
  onEdit?: () => void;
  showLegends?: boolean;
};

export const SpendingChart = ({ className, data }: SpendingChartProps) => {
  const { periods = [], trackingStatus } = data;
  const overallTarget = !trackingStatus || isEmptyPeriods(periods);

  const months = (() => {
    if (periods?.length > 0) {
      const dataMonth = cloneDeep(defaultMonths);

      periods?.forEach((period) => {
        if (period?.amount !== undefined && dataMonth[period?.month - 1]) {
          dataMonth[period?.month - 1].amount = period?.amount;
        }
      });

      return dataMonth;
    }

    return defaultMonths;
  })();

  const updatedMonths = months.filter((item) => item?.amount !== undefined);
  const startMonth = updatedMonths[0]?.month ?? 1;
  const endMonth = updatedMonths[updatedMonths.length - 1]?.month ?? 12;

  const chartData: LineChartData = (() => {
    if (startMonth === endMonth) {
      return getLineChartDataInMonth(data, months[startMonth - 1], trackingStatus);
    }
    return getMonthsLineChartData(data, months, trackingStatus);
  })();

  const renderXAxis = () => {
    const targetDate = dayjs().set('month', startMonth - 1);
    return startMonth === endMonth ? (
      <div
        className={clsx(
          'flex flex-row w-full text-xs text-Gray-6 font-semibold justify-around my-1 pl-[90px]',
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
          'flex flex-row w-full text-xs text-Gray-6 font-semibold justify-between pl-[38px]',
        )}
      >
        {range(startMonth, endMonth + 1).map((month: number) => (
          <div
            key={`x-${month}`}
            className="w-[25px] h-7 flex justify-center items-center first:justify-start last:justify-end"
          >
            <p>
              {dayjs()
                .month(month - 1)
                .format('MMM')}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderTooltipContent = (props: TooltipProps<ValueType, NameType>) => {
    const { active, payload } = props;
    if (active && payload) {
      const dataPoints = payload[0]?.payload;
      return (
        <div className="flex bg-primary p-2 rounded-sm">
          <div className="flex flex-col space-y-1">
            <div className="flex flex-row items-center">
              <p className="text-white text-3xs font-semibold">{dataPoints?.name ?? 'unknown'}</p>
            </div>
            <div
              key="target"
              className="flex flex-row flex-grow justify-between items-center space-x-10"
            >
              <div className="flex flex-row items-center space-x-1">
                <div className="w-1 h-1 rounded bg-Gray-6" />
                <p className="text-white text-2xs">Target</p>
              </div>
              <p className="text-white text-2xs text-right font-semibold">
                {decimalLogic(dataPoints?.target ?? 0, DecimalType.SummedNumbers, '$')}
              </p>
            </div>
            <div
              key="this-year"
              className="flex flex-row flex-grow justify-between items-center space-x-10"
            >
              <div className="flex flex-row items-center space-x-1">
                <div
                  className="w-1 h-1 rounded"
                  style={{
                    background: overallTarget
                      ? '#818CF8'
                      : TargetStatusConfig[data.trackingStatus!].dot,
                  }}
                />
                <p className="text-white text-2xs">Current</p>
              </div>
              <p className="text-white text-2xs text-right font-semibold">
                {decimalLogic(dataPoints?.thisYear ?? 0, DecimalType.SummedNumbers, '$')}
              </p>
            </div>
            <div
              key="last-year"
              className="flex flex-row flex-grow justify-between items-center space-x-10"
            >
              <div className="flex flex-row items-center space-x-1">
                <div className="w-1 h-1 rounded bg-Gray-11" />
                <p className="text-white text-2xs">Last Year</p>
              </div>
              <p className="text-white text-2xs text-right font-semibold">
                {decimalLogic(dataPoints?.lastYear ?? 0, DecimalType.SummedNumbers, '$')}
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={clsx('flex flex-1 flex-col w-full h-full', className)}>
      {chartData && (
        <>
          <div className="relative flex flex-1 flex-col justify-center items-center w-auto p-4 h-[184px] border border-Gray-12 rounded-2.5xl">
            <TargetChart
              containerClass="flex flex-col mt-2"
              chartData={chartData}
              renderXAxis={renderXAxis}
              renderTooltip={renderTooltipContent}
              levelLabelClass="text-Gray-6 text-2xs font-normal"
            />
          </div>
        </>
      )}
    </div>
  );
};
