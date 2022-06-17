/* eslint-disable no-param-reassign */
import dayjs from 'dayjs';
import { Transaction, TargetMonth, TargetSpending } from '@main/entity';
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
  let cumulativeThisYear = 0;
  let cumulativeLastYear = 0;
  let cumulativeTarget = 0;

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

  // Find start / end month
  const availableTargets = targetMonths.filter((item) => item?.amount !== undefined);
  const startMonth = availableTargets[0]?.month ?? 1;
  const endMonth = availableTargets[availableTargets.length - 1]?.month ?? 12;

  let data: ChartDataPoint[] = targetMonths.reduce<ChartDataPoint[]>((preVal, target, index) => {
    // Out of month range
    if (target.month < startMonth || target.month > endMonth) {
      return preVal;
    }
    const month = dayjs().month(index).format(monthFormat);
    // Calculate cumulative values
    cumulativeThisYear += round(thisYearSorted[index]?.total ?? 0, 2);
    cumulativeLastYear += round(lastYearSorted[index]?.total ?? 0, 2);
    cumulativeTarget += round(target?.amount ?? 0, 2);

    // Generate data point
    const dataPoint =
      index > thisMonth
        ? {
            name: month,
            lastYear: cumulativeLastYear,
            target: cumulativeTarget,
          }
        : {
            name: month,
            thisYear: cumulativeThisYear,
            lastYear: cumulativeLastYear,
            target: cumulativeTarget,
          };
    return [...preVal, dataPoint];
  }, []);

  // Duplicate data point to draw a line if there is one data point
  if (data.length === 1) {
    data = [data[0], data[0]];
  }

  // Data points is 0 (target wasn't set) => show previous year and current year spending data
  if (data.length === 0) {
    data = lastYearSorted.map((lastYearData, index) => {
      const month = dayjs().month(index).format(monthFormat);
      // Calculate cumulative values
      cumulativeThisYear += round(thisYearSorted[index]?.total ?? 0, 2);
      cumulativeLastYear += round(lastYearData?.total ?? 0, 2);

      return index > thisMonth
        ? {
            name: month,
            lastYear: cumulativeLastYear,
            target: 0,
          }
        : {
            name: month,
            thisYear: cumulativeThisYear,
            lastYear: cumulativeLastYear,
            target: 0,
          };
    });
  }

  const maxValue = Math.max(cumulativeThisYear, cumulativeLastYear, cumulativeTarget);

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

  return { data, legends: [], lines, maxValue, metadata: { currentSpend: cumulativeThisYear } };
};

export const getSpendingByYear = (
  spendings: TargetSpending[] | undefined,
): { thisYear: TargetPeriod[]; lastYear: TargetPeriod[] } => {
  if (!spendings) {
    return {
      thisYear: [],
      lastYear: [],
    };
  }
  const THIS_YEAR = new Date().getFullYear();
  const thisYear = spendings?.filter((item: TargetSpending) => {
    if (item.year === THIS_YEAR) {
      return {
        month: item.month,
        year: item.year,
        threshold: item.total,
      };
    }
    return false;
  });
  const lastYear = spendings?.filter((item: TargetSpending) => {
    if (item.year === THIS_YEAR - 1) {
      return {
        month: item.month,
        year: item.year,
        threshold: item.total,
      };
    }
    return false;
  });
  return {
    thisYear: thisYear ?? [],
    lastYear: lastYear ?? [],
  };
};
