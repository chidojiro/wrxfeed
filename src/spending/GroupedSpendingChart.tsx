import { ClassName } from '@/common/types';
import { DateRangeFilter } from '@/feed/types';
import { Target } from '@/target/types';
import React from 'react';
import { ChartInfo, SpendingChartV2 } from './SpendingChartV2';
import { Spending } from './types';
import { getChartDataByDateRange, getSortedTotalSpendings } from './utils';

export type GroupedSpendingChartProps = ClassName & {
  data: Spending[];
  highlightedItemId?: number;
  dateRange?: DateRangeFilter;
  target?: Target;
};

const OTHER_COLOR = '#B2B7BB';

export const GroupedSpendingChart = ({
  data,
  highlightedItemId,
  dateRange,
  target,
}: GroupedSpendingChartProps) => {
  const top10TotalSpendings = (dateRange ? getSortedTotalSpendings(data, dateRange) : []).slice(
    0,
    10,
  );

  const chartData = React.useMemo(() => {
    if (!dateRange) return [];

    return getChartDataByDateRange(data, dateRange);
  }, [data, dateRange]);

  return (
    <SpendingChartV2
      data={chartData}
      dateRange={dateRange}
      highlightedDataKey={
        highlightedItemId && !top10TotalSpendings.map(({ id }) => id).includes(highlightedItemId)
          ? -1
          : highlightedItemId
      }
      charts={
        [
          {
            type: 'BAR',
            color: '#EFF0F2',
            dataKey: 'previousYearTotal',
          },
          {
            type: 'BAR',
            color: '',
            stackedBars: [
              top10TotalSpendings.map(({ id, color }) => ({
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
