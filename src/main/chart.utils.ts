/* eslint-disable no-param-reassign */
import dayjs from 'dayjs';
import { Transaction } from '@main/entity';
import {
  ChartDataPoint,
  ChartLegend,
  ChartLineProps,
  ChartLevel,
  LineChartData,
} from '@main/types';
import { nFormatter } from './utils';

const ITEM_DATE_FORMAT = 'YYYY-MM-DD';
const DATA_DATE_FORMAT = 'MMM DD, YYYY';

/**
 * Group transactions by month
 * A group of month will contain full date of month [1,...,31]
 * Ex: {'Mar': [[], [<trans>, <trans>], ...], 'Apr': [[<trans>], [<trans>], ...]}
 */
export const hashTransactionsByMonths = (
  trans: Transaction[],
  monthFormat = 'MMM',
): { [key: string]: Transaction[][] } => {
  return trans.reduce<{ [key: string]: Transaction[][] }>((preHash, currentTran) => {
    const itemDate = dayjs(currentTran.transDate, ITEM_DATE_FORMAT);
    if (!itemDate.isValid()) return preHash;
    const month = itemDate.format(monthFormat);
    const date = itemDate.date();
    if (preHash[month]) {
      preHash[month][date - 1] = [...preHash[month][date - 1], currentTran];
    } else {
      preHash[month] = Array(31).fill([]);
      preHash[month][date - 1] = [...preHash[month][date - 1], currentTran];
    }
    return preHash;
  }, {});
};

export const getLineChartDataInMonth = (trans: Transaction[]): LineChartData<Transaction[]> => {
  const monthFormat = 'MMM';
  const today = dayjs(new Date());
  const currentMonth: string = today.format(monthFormat);
  const pre1Month: string = today.subtract(1, 'month').format(monthFormat);
  const pre2Month: string = today.subtract(2, 'month').format(monthFormat);

  const transHashByMonths = hashTransactionsByMonths(trans, monthFormat);
  let totalCurrentMonth = 0;
  let totalPre1Month = 0;
  let totalPre2Month = 0;
  const data: ChartDataPoint<Transaction[]>[] = Array(31) // 3 months always contain 1 month with 31 days
    .fill({
      name: '',
      [currentMonth]: 0,
      [pre1Month]: 0,
      [pre2Month]: 0,
    })
    .map((_, index) => {
      const dayName = dayjs(today)
        .date(index + 1)
        .format(DATA_DATE_FORMAT);

      // Total by month
      totalCurrentMonth += Math.round(
        transHashByMonths[currentMonth]?.[index]?.reduce(
          (total, item) => total + (item?.amountUsd ?? 0),
          0,
        ) ?? 0,
      );
      totalPre1Month += Math.round(
        transHashByMonths[pre1Month]?.[index]?.reduce(
          (total, item) => total + (item?.amountUsd ?? 0),
          0,
        ) ?? 0,
      );
      totalPre2Month += Math.round(
        transHashByMonths[pre2Month]?.[index]?.reduce(
          (total, item) => total + (item?.amountUsd ?? 0),
          0,
        ) ?? 0,
      );
      // Top 3 transactions this date of month
      const topTrans = transHashByMonths[currentMonth]?.[index]
        ?.sort((a, b) => (b?.amountUsd ?? 0) - (a?.amountUsd ?? 0))
        .slice(0, 3);
      // Don't draw data line if date index greater than today
      if (index > today.date() - 1) {
        return {
          name: dayName,
          [pre1Month]: totalPre1Month,
          [pre2Month]: totalPre2Month,
        };
      }
      return {
        name: dayName,
        topTrans,
        [currentMonth]: totalCurrentMonth,
        [pre1Month]: totalPre1Month,
        [pre2Month]: totalPre2Month,
      };
    });
  const legends: ChartLegend[] = [
    {
      id: `chartLegends-${currentMonth}`,
      color: '#6565FB',
      name: currentMonth,
      type: '',
    },
    {
      id: `chartLegends-${pre1Month}`,
      color: '#BEC1C7',
      name: pre1Month,
      type: '',
    },
    {
      id: `chartLegends-${pre2Month}`,
      color: '#EFEFF1',
      name: pre2Month,
      type: '',
    },
    {
      id: 'TargetLine',
      color: '',
      name: 'Target',
      type: 'dashed-line-legend',
    },
  ];
  const lines: ChartLineProps[] = [
    {
      name: pre2Month,
      type: 'linear',
      dataKey: pre2Month,
      strokeWidth: 4,
      stroke: '#E7E8EC',
      dot: false,
    },
    {
      name: pre1Month,
      type: 'linear',
      dataKey: pre1Month,
      strokeWidth: 4,
      stroke: '#C5C8CD',
      dot: false,
    },
    {
      name: currentMonth,
      type: 'linear',
      dataKey: currentMonth,
      strokeWidth: 4,
      stroke: '#6565FB',
      dot: false,
    },
  ];

  let maxValue = Math.max(totalCurrentMonth, totalPre1Month, totalPre2Month);
  const positiveMax = Math.abs(maxValue);
  if (positiveMax >= 1000000000) {
    maxValue = Math.ceil(positiveMax / 1000000000) * 1000000000; // Billion
  }
  if (positiveMax >= 1000000) {
    maxValue = Math.ceil(positiveMax / 1000000) * 1000000; // Millions
  }
  if (positiveMax >= 1000) {
    const remember = 1000;
    maxValue = Math.ceil(positiveMax / 1000); // Thousands
    maxValue = Math.ceil(maxValue / 5) * 5 * remember;
  }
  return { data, legends, lines, maxValue, metadata: { totalCurrentMonth } };
};

export const getChartLevels = (maxValue: number): ChartLevel[] => {
  // const maxAndTarget = maxValue - targetAmount;
  const numberLevel = 5; // Math.floor(maxValue / maxAndTarget);
  // if (numberLevel > 5) {
  //   numberLevel = 5;
  // }
  // if (numberLevel < 4) {
  //   numberLevel *= 2;
  // }
  const levelValue = maxValue / numberLevel;

  const levels: ChartLevel[] = [];
  for (let index = 0; index < numberLevel + 1; index += 1) {
    const valueForThisLevel = Math.ceil(levelValue * index);
    levels.push({
      id: index,
      value: valueForThisLevel,
      title: nFormatter(valueForThisLevel),
      isTarget: false,
    });
  }
  return levels;
};
