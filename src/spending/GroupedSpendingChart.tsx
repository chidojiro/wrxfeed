import { sum, sumBy, uniqBy } from 'lodash-es';
import { SpendingChartV2 } from './SpendingChartV2/SpendingChartV2';
import { SpendingsReport } from './types';
import { getThisYearTotalsGroupedByItem } from './utils';

export type GroupedSpendingChartProps = {
  data: SpendingsReport;
  highlightedItemId?: number;
};

const OTHER_COLOR = '#029B80';

export const GroupedSpendingChart = ({ data, highlightedItemId }: GroupedSpendingChartProps) => {
  const { curYearSpends, prevYearSpends } = data;

  const uniqueItems = uniqBy(
    curYearSpends.map(({ item }) => item),
    'id',
  ).filter(Boolean);

  const thisYearTotals = getThisYearTotalsGroupedByItem(curYearSpends);

  const chartData = new Array(12).fill(null).map((_, idx) => {
    const month = idx + 1;

    return {
      month,
      thisYearTotal: sumBy(
        curYearSpends.filter((spend) => spend.month === month),
        'total',
      ),
      lastYearTotal: sumBy(
        prevYearSpends.filter((spend) => spend.month === month),
        'total',
      ),
      ...uniqueItems.reduce(
        (acc, cur) => ({
          ...acc,
          [cur!.id]:
            curYearSpends.find((spend) => spend.month === month && spend.item?.id === cur?.id)
              ?.total ?? 0,
        }),
        {},
      ),
      // Others
      '-1': sum(
        uniqueItems
          .slice(10)
          .map(
            (item) =>
              curYearSpends.find((spend) => spend.month === month && spend.item?.id === item?.id)
                ?.total ?? 0,
          ),
      ),
      items: [uniqueItems, { id: -1, name: 'Other' }].flat(),
    };
  });

  return (
    <SpendingChartV2
      data={chartData}
      barGap={-36}
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
