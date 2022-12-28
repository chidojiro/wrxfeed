import { ClassName } from '@/common/types';
import { DateRangeFilter } from '@/feed/types';
import { Target } from '@/target/types';
import React from 'react';
import { ChartInfo, SpendingChartV2 } from './SpendingChartV2';
import { SpendingsReport } from './types';
import { getChartDataByPeriod, getThisYearTotalsGroupedByItem } from './utils';

export type GroupedSpendingChartProps = ClassName & {
  data: SpendingsReport;
  highlightedItemId?: number;
  dateRange?: DateRangeFilter;
  target?: Target;
};

const OTHER_COLOR = '#B2B7BB';

export const GroupedSpendingChart = ({
  data,
  highlightedItemId,
  dateRange,
  className,
  target,
}: GroupedSpendingChartProps) => {
  const { curYearSpends } = data;

  const thisYearTotals = getThisYearTotalsGroupedByItem(curYearSpends);

  const chartData = React.useMemo(() => {
    if (dateRange === '30-days') return getChartDataByPeriod('day', data);

    if (dateRange === '90-days') return getChartDataByPeriod('week', data);

    return getChartDataByPeriod('month', data);
  }, [data, dateRange]);

  return (
    <SpendingChartV2
      data={chartData}
      dateRange={dateRange}
      highlightedDataKey={
        highlightedItemId &&
        !thisYearTotals
          .slice(0, 10)
          .map(({ id }) => id)
          .includes(highlightedItemId)
          ? -1
          : highlightedItemId
      }
      charts={
        [
          {
            type: 'BAR',
            color: '#EFF0F2',
            dataKey: 'lastYearTotal',
          },
          {
            type: 'BAR',
            color: '',
            stackedBars: [
              thisYearTotals.slice(0, 10).map(({ id, color }) => ({
                dataKey: id.toString(),
                color,
              })),
              { dataKey: '-1', color: OTHER_COLOR },
            ].flat(),
          },
          target && {
            type: 'AREA',
            stroke: '#374151',
            dataKey: 'target',
            fill: 'transparent',
          },
        ].filter(Boolean) as ChartInfo[]
      }
    />
  );
};
