/* eslint-disable no-param-reassign */
import dayjs from 'dayjs';
import { Transaction, TargetMonth } from '@main/entity';
import { ChartDataPoint, ChartLineProps, ChartLevel, LineChartData } from '@main/types';
import { TargetPeriod } from '@api/types';
import { round } from '@common/utils';
import range from 'lodash.range';
import { decimalLogic, DecimalType } from './utils';

const ITEM_DATE_FORMAT = 'YYYY-MM-DD';
const DATA_DATE_FORMAT = 'MMM DD';

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

export const getLineChartDataInMonth = (
  thisYearTrans: Transaction[],
  lastYearTrans: Transaction[],
  target: TargetMonth,
): LineChartData => {
  const monthFormat = 'MMM';
  const targetDate = dayjs().set('month', target.month - 1);
  const monthStr: string = targetDate.format(monthFormat);
  const isThisMonth = dayjs().month() === target.month - 1;

  const thisYearTransMatrix = hashTransactionsByMonths(thisYearTrans, monthFormat)[monthStr];
  const lastYearTransMatrix = hashTransactionsByMonths(lastYearTrans, monthFormat)[monthStr];
  let totalThisYear = 0;
  let totalLastYear = 0;
  const data: ChartDataPoint[] = Array(targetDate.daysInMonth())
    .fill({
      name: '',
      thisYear: 0,
      lastYear: 0,
      target: target.amount ?? 0,
    })
    .map((_, index) => {
      const dayName = dayjs(targetDate)
        .date(index + 1)
        .format(DATA_DATE_FORMAT);

      // Total by month
      totalThisYear += Math.round(
        thisYearTransMatrix?.[index]?.reduce((total, item) => total + (item?.amountUsd ?? 0), 0) ??
          0,
      );
      totalLastYear += Math.round(
        lastYearTransMatrix?.[index]?.reduce((total, item) => total + (item?.amountUsd ?? 0), 0) ??
          0,
      );
      // Don't draw data line if date index greater than today
      if (isThisMonth && index > targetDate.date() - 1) {
        return {
          name: dayName,
          lastYear: totalLastYear,
          target: target.amount ?? 0,
        };
      }
      return {
        name: dayName,
        thisYear: totalThisYear,
        lastYear: totalLastYear,
        target: target.amount ?? 0,
      };
    });
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

  let maxValue = Math.max(totalThisYear, totalLastYear, target.amount ?? 0);
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
  return { data, legends: [], lines, maxValue };
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
      title: decimalLogic(valueForThisLevel, DecimalType.ChartAxis, '$'),
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
  const lastYearSorted = range(0, 12).map((monthIdx) => {
    const lastYearData = lastYearSpend.find((e) => e?.month - 1 === monthIdx);
    return (
      lastYearData || {
        year: lastYearSpend[0]?.year || dayjs().year() - 1,
        month: monthIdx + 1,
        amount: 0,
      }
    );
  });

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
            target: round(targetMonth?.amount ?? 0, 2),
          }
        : {
            name: month,
            thisYear: round(thisYearSorted[indexFlag]?.total ?? 0, 2),
            lastYear: round(lastYearSorted[indexFlag]?.total ?? 0, 2),
            target: round(targetMonth?.amount ?? 0, 2),
          };
    // Find max value
    if (targetMonth?.amount !== undefined) {
      maxValue = Math.max(
        maxValue,
        round(thisYearSorted[indexFlag]?.total ?? 0),
        round(lastYearSpend[indexFlag]?.total ?? 0),
        round(targetMonth?.amount ?? 0),
      );
    }
    // Only add months in selected range (start and end with non-zero amount)
    // Criteria 1: Start month didn't set and the month doesn't have a target amount (undefined) => ignore
    if (startMonth === -1 && targetMonth?.amount === undefined) {
      return preVal;
    }
    // Criteria 2: Start month didn't set and the month has a target amount
    if (startMonth === -1 && targetMonth?.amount !== undefined) {
      // Set start month
      startMonth = indexFlag;
      // Sum total this year spend
      totalThisYearSpend += dataPoint.thisYear ?? 0;
      // Add data point
      return [dataPoint];
    }
    /** *** Start month has been set => reverse array until reach start month **** */
    // Criteria 3: End month didn't set and the month doesn't have a target amount (undefined) => ignore
    if (endMonth === -1 && targetMonth?.amount === undefined) {
      return preVal;
    }
    // Criteria 4: End month didn't set and the month has a target amount
    if (endMonth === -1 && targetMonth?.amount !== undefined) {
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

  // Data points is 0 (target wasn't set) => show previous year and current year spending data
  if (data.length === 0) {
    data = lastYearSorted.map((lastYearData, index) => {
      const month = dayjs().month(index).format(monthFormat);
      // Find max value
      maxValue = Math.max(
        maxValue,
        round(thisYearSorted[index]?.total ?? 0),
        round(lastYearData?.total ?? 0),
      );
      return index > thisMonth
        ? {
            name: month,
            lastYear: round(lastYearData?.total ?? 0, 2),
            target: 0,
          }
        : {
            name: month,
            thisYear: round(thisYearSorted[index]?.total ?? 0, 2),
            lastYear: round(lastYearData?.total ?? 0, 2),
            target: 0,
          };
    });
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
