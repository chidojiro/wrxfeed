import { ClassName } from '@/common/types';
import { LineChartData } from '@/main/types';
import { TargetChart } from '@/target/TargetChart';
import clsx from 'clsx';
import { cloneDeep } from 'lodash-es';
import { defaultMonths } from '../constants';
import { Period, Spending, TrackingStatus } from '../types';
import { getLineChartDataInMonth, getMonthsLineChartData, isEmptyPeriods } from '../utils';
import { TooltipContent } from './TooltipContent';
import { XAxis } from './XAxis';

export type SpendingChartData = {
  periods?: Period[];
  trackingStatus?: TrackingStatus;
  spendings: Spending[];
};

export type SpendingChartProps = ClassName & {
  data: SpendingChartData;
  prevYearColor?: string;
};

export const SpendingChart = ({ className, data, prevYearColor }: SpendingChartProps) => {
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

  const showTarget = !!periods.length;

  return (
    <div className={clsx('flex flex-1 flex-col w-full h-full min-h-[185px]', className)}>
      {chartData && (
        <>
          <div className="relative flex flex-1 flex-col justify-center items-center w-auto p-4 h-[184px] border border-Gray-12 rounded-2.5xl">
            <TargetChart
              containerClass="flex flex-col mt-2"
              chartData={chartData}
              renderXAxis={() => <XAxis startMonth={startMonth} endMonth={endMonth} />}
              renderTooltip={(props) => (
                <TooltipContent
                  {...props}
                  trackingStatus={data.trackingStatus}
                  showTarget={showTarget}
                  overallTarget={overallTarget}
                />
              )}
              levelLabelClass="text-Gray-6 text-2xs font-normal"
              prevYearColor={prevYearColor}
              showTarget={showTarget}
            />
          </div>
        </>
      )}
    </div>
  );
};
