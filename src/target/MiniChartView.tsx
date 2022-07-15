import { defaultTargetMonths } from '@/common/constants';
import { getLineChartDataInMonth, getTargetMonthsLineChartData } from '@/main/chart.utils';
import { LineChartData } from '@/main/types';
import { decimalLogic, DecimalType } from '@/main/utils';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { cloneDeep, range } from 'lodash-es';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { TargetChart } from './TargetChart';
import { Target, TargetPeriod } from './types';

interface MiniChartViewProps {
  className?: string;
  target: Target;
  onEdit?: () => void;
  legendLabelClass?: string;
  xAxisClass?: string;
  showLegends?: boolean;
  overallTarget?: number;
}

export const MiniChartView = ({
  className = '',
  target,
  legendLabelClass = '',
  xAxisClass = '',
  showLegends = false,
  overallTarget = 0,
}: MiniChartViewProps) => {
  const targetMonths = (() => {
    const { periods, props } = target;
    if (periods?.length > 0 && props?.length > 0) {
      const dataMonth = cloneDeep(defaultTargetMonths);
      periods.forEach((period: TargetPeriod) => {
        if (
          period?.amount !== undefined &&
          dataMonth[period?.month - 1] &&
          dataMonth[period?.month - 1]
        ) {
          dataMonth[period?.month - 1].amount = period?.amount;
        }
      });
      return dataMonth;
    }

    return defaultTargetMonths;
  })();

  const updatedTargetMonths = targetMonths.filter((item) => item?.amount !== undefined);
  const startMonth = updatedTargetMonths[0]?.month ?? 1;
  const endMonth = updatedTargetMonths[updatedTargetMonths.length - 1]?.month ?? 12;

  const chartData: LineChartData = (() => {
    if (startMonth === endMonth) {
      return getLineChartDataInMonth(
        target,
        targetMonths[startMonth - 1],
        target?.trackingStatus,
        overallTarget,
      );
    }
    return getTargetMonthsLineChartData(
      target,
      targetMonths,
      target?.trackingStatus,
      overallTarget,
    );
  })();

  const renderChartLegends = () => {
    return (
      <div className="flex flex-row justify-center mt-2 py-2 px-[50px] h-full space-x-8">
        <div className="flex flex-row items-center space-x-2">
          <div className="w-4 h-1 dashed-line-target" />
          <p className={clsx('text-xs text-Gray-6', legendLabelClass)}>Target</p>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <div className="w-4 h-1 bg-Accent-2" />
          <p className={clsx('text-xs text-Gray-6', legendLabelClass)}>Current</p>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <div className="w-4 h-1 bg-Gray-11" />
          <p className={clsx('text-xs text-Gray-6', legendLabelClass)}>Last Year</p>
        </div>
      </div>
    );
  };

  const renderXAxis = () => {
    const targetDate = dayjs().set('month', startMonth - 1);
    return startMonth === endMonth ? (
      <div
        className={clsx(
          'flex flex-row w-full text-xs text-Gray-6 font-semibold justify-around my-1 pl-[90px]',
          xAxisClass,
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
          xAxisClass,
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
                <div className="w-1 h-1 rounded bg-system-alert" />
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
                <div className="w-1 h-1 rounded bg-Accent-2" />
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
          <div className="relative flex flex-1 flex-col justify-center items-center w-auto mx-[-8px] pr-4 pb-1 pl-2 pt-1 h-[184px] border border-Gray-12 rounded-2.5xl">
            <TargetChart
              containerClass="flex flex-col mt-2"
              chartData={chartData}
              renderXAxis={renderXAxis}
              renderTooltip={renderTooltipContent}
              levelLabelClass="text-Gray-6 text-2xs font-normal"
            />
          </div>
          {showLegends && renderChartLegends()}
        </>
      )}
    </div>
  );
};
