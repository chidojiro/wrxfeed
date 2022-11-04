import { DateRangeFilter } from '@/feed/types';
import React from 'react';
import { SpendingChartV2 } from './SpendingChartV2/SpendingChartV2';
import { SpendingsReport } from './types';
import {
  getChartDataByDay,
  getChartDataByMonth,
  getChartDataByWeek,
  getThisYearTotalsGroupedByItem,
} from './utils';

export type GroupedSpendingChartProps = {
  data: SpendingsReport;
  highlightedItemId?: number;
  dateRange?: DateRangeFilter;
};

const OTHER_COLOR = '#B2B7BB';

export const GroupedSpendingChart = ({
  data,
  highlightedItemId,
  dateRange,
}: GroupedSpendingChartProps) => {
  const { curYearSpends } = data;

  const thisYearTotals = getThisYearTotalsGroupedByItem(curYearSpends);

  const chartData = React.useMemo(() => {
    if (dateRange === '30-days') return getChartDataByDay(data);

    if (dateRange === '90-days') return getChartDataByWeek(data);

    return getChartDataByMonth(data);
  }, [data, dateRange]);

  return (
    <SpendingChartV2
      data={chartData as any}
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
      charts={[
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
      ]}
    />
  );
};
