import { sumBy, uniqBy } from 'lodash-es';
import { SpendingChartV2 } from './SpendingChartV2/SpendingChartV2';
import { SpendingsReport } from './types';
import { getThisYearTotalsGroupedByItem } from './utils';

export type GroupedSpendingChartProps = {
  data: SpendingsReport;
};

export const GroupedSpendingChart = ({ data }: GroupedSpendingChartProps) => {
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
      items: uniqueItems,
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
          stackedBars: thisYearTotals.map(({ id, color }) => ({
            dataKey: id.toString(),
            color,
          })),
        },
      ]}
    />
  );
};
