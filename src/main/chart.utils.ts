/* eslint-disable no-param-reassign */
import dayjs from 'dayjs';
import { Transaction, TargetMonth } from '@main/entity';
import {
  ChartDataPoint,
  ChartLegend,
  ChartLineProps,
  ChartLevel,
  LineChartData,
} from '@main/types';
import { TargetPeriod } from '@api/types';
import { round } from '@common/utils';
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

export const getTargetMonthsLineChartData = (
  thisYearSpend: TargetPeriod[],
  lastYearSpend: TargetPeriod[],
  targetMonths: TargetMonth[],
): LineChartData => {
  const monthFormat = 'MMM';
  const thisMonth = dayjs().month();
  const targetMonthsSize = targetMonths.length;
  let startMonth = -1;
  let endMonth = -1;
  let maxValue = 0;
  let totalThisYearSpend = 0;

  const thisYearSorted = thisYearSpend?.sort((a, b) => (a?.month ?? 0) - (b?.month ?? 0));
  const lastYearSorted = lastYearSpend?.sort((a, b) => (a?.month ?? 0) - (b?.month ?? 0));

  let data: ChartDataPoint[] = targetMonths.reduce<ChartDataPoint[]>((preVal, _, index) => {
    // start month has been set => reverse array to find end month index
    const indexFlag: number = startMonth !== -1 ? targetMonthsSize - index + startMonth : index;
    const targetMonth: TargetMonth = targetMonths[indexFlag];
    const month = dayjs().month(indexFlag).format(monthFormat);
    // Generate data point
    const dataPoint =
      indexFlag > thisMonth
        ? {
            name: month,
            lastYear: round(lastYearSorted[indexFlag]?.total ?? 0, 2),
            target: round(targetMonth.amount ?? 0, 2),
          }
        : {
            name: month,
            thisYear: round(thisYearSorted[indexFlag]?.total ?? 0, 2),
            lastYear: round(lastYearSorted[indexFlag]?.total ?? 0, 2),
            target: round(targetMonth.amount ?? 0, 2),
          };
    // Find max value
    if (targetMonth.amount) {
      maxValue = Math.max(
        maxValue,
        round(thisYearSorted[indexFlag]?.total ?? 0),
        round(lastYearSpend[indexFlag]?.total ?? 0),
        round(targetMonth.amount ?? 0),
      );
    }
    // Only add months in selected range (start and end with non-zero amount)
    // Criteria 1: Start month didn't set and the month doesn't have a target amount (0) => ignore
    if (startMonth === -1 && !targetMonth.amount) {
      return preVal;
    }
    // Criteria 2: Start month didn't set and the month has a target amount
    if (startMonth === -1 && targetMonth.amount) {
      // Set start month
      startMonth = indexFlag;
      // Sum total this year spend
      totalThisYearSpend += dataPoint.thisYear ?? 0;
      // Add data point
      return [dataPoint];
    }
    /** *** Start month has been set => reverse array until reach start month **** */
    // Criteria 3: End month didn't set and the month doesn't have a target amount (0) => ignore
    if (endMonth === -1 && !targetMonth.amount) {
      return preVal;
    }
    // Criteria 4: End month didn't set and the month has a target amount
    if (endMonth === -1 && targetMonth.amount) {
      // Set end month
      endMonth = indexFlag;
      // Sum total this year spend
      totalThisYearSpend += dataPoint.thisYear ?? 0;
      // Add data point
      return [...preVal, dataPoint];
    }
    // Criteria 4: Start month and end month have been set => just add data point at second position
    preVal.splice(1, 0, dataPoint);
    // Sum total this year spend
    totalThisYearSpend += dataPoint.thisYear ?? 0;
    return preVal;
  }, []);

  // Duplicate data point to draw a line if there is one data point
  if (data.length === 1) {
    data = [data[0], data[0]];
  }

  const lines: ChartLineProps[] = [
    {
      name: 'target',
      type: 'linear',
      dataKey: 'target',
      strokeWidth: 2,
      strokeDasharray: '8 8',
      stroke: '#FF5F68',
      dot: false,
    },
    {
      name: 'lastYear',
      type: 'linear',
      dataKey: 'lastYear',
      strokeWidth: 3,
      stroke: '#DFE1E6',
      dot: false,
    },
    {
      name: 'thisYear',
      type: 'linear',
      dataKey: 'thisYear',
      strokeWidth: 3,
      stroke: '#6565FB',
      dot: false,
    },
  ];

  return { data, legends: [], lines, maxValue, metadata: { currentSpend: totalThisYearSpend } };
};
