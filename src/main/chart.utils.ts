/* eslint-disable no-param-reassign */
import { INITIAL_CHART_DATA } from '@/common/constants';
import { round } from '@/common/utils';
import { ChartDataPoint, ChartLevel, ChartLineProps, LineChartData } from '@/main/types';
import {
  Target,
  TargetMonth,
  TargetPeriod,
  TargetSpending,
  TargetStatusConfig,
  TargetStatusType,
} from '@/target/types';
import dayjs from 'dayjs';
import { range } from 'lodash-es';
import { decimalLogic, DecimalType } from './utils';

const DATA_DATE_FORMAT = 'MMM DD';

const getYearSpending = (target: Target, year: number) =>
  target.spendings?.filter((cur) => cur.year === year).reduce((acc, { total }) => total + acc, 0) ??
  0;

export const getThisYearSpending = (target: Target) =>
  getYearSpending(target, new Date().getFullYear());

export const getLastYearSpending = (target: Target) =>
  getYearSpending(target, new Date().getFullYear() - 1);

export const getLineChartDataInMonth = (
  target: Target,
  targetMonth: TargetMonth,
  trackingStatus?: TargetStatusType,
  overallTarget?: number,
): LineChartData => {
  const targetDate = dayjs().set('month', targetMonth.month - 1);
  const isThisMonth = dayjs().month() === targetMonth.month - 1;

  const totalThisYear = getThisYearSpending(target);
  const totalLastYear = getLastYearSpending(target);
  const data: ChartDataPoint[] = Array(targetDate.daysInMonth())
    .fill({
      name: '',
      thisYear: 0,
      lastYear: 0,
      target: targetMonth.amount ?? 0,
    })
    .map((_, index) => {
      const dayName = dayjs(targetDate)
        .date(index + 1)
        .format(DATA_DATE_FORMAT);

      // Don't draw data line if date index greater than today
      if (isThisMonth && index > targetDate.date() - 1) {
        return {
          name: dayName,
          lastYear: totalLastYear,
          target: targetMonth.amount ?? 0,
        };
      }
      return {
        name: dayName,
        thisYear: totalThisYear,
        lastYear: totalLastYear,
        target: targetMonth.amount ?? 0,
      };
    });

  let dotStatusColor = '#34D399';
  let backgroundStatusColor = '#D1FAE5';
  if (trackingStatus) {
    const { dot, background } = TargetStatusConfig[trackingStatus];
    dotStatusColor = dot;
    backgroundStatusColor = background;
  }
  const lines: ChartLineProps[] = [
    {
      name: 'target',
      type: 'monotone',
      dataKey: 'target',
      strokeWidth: 2,
      strokeDasharray: '8 8',
      stroke: '#7D8490',
      fill: '#FFFFFF',
      dot: false,
    },
    {
      name: 'lastYear',
      type: 'monotone',
      dataKey: 'lastYear',
      strokeWidth: 0,
      stroke: '#F3F4F6',
      dot: false,
      fill: '#F3F4F6',
      opacity: 0.8,
    },
    {
      name: 'thisYear',
      type: 'monotone',
      dataKey: 'thisYear',
      strokeWidth: 3,
      stroke: overallTarget !== 0 ? dotStatusColor : '#818CF8',
      dot: false,
      fill: overallTarget !== 0 ? backgroundStatusColor : '#818CF8',
    },
  ];

  let maxValue = Math.max(totalThisYear, totalLastYear, targetMonth.amount ?? 0);
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
  target: Target,
  targetMonths: TargetMonth[],
  trackingStatus?: TargetStatusType,
  overallTarget?: number,
): LineChartData => {
  if (!target) return INITIAL_CHART_DATA;

  const monthFormat = 'MMM';
  const thisMonth = dayjs().month();
  let cumulativeThisYear = 0;
  let cumulativeLastYear = 0;
  let cumulativeTarget = 0;

  const thisYearSpendings =
    target.spendings?.filter((item) => item.year === new Date().getFullYear()) ?? [];
  const lastYearSpendings =
    target.spendings?.filter((item) => item.year === new Date().getFullYear() - 1) ?? [];

  const thisYearSorted = thisYearSpendings?.sort((a, b) => (a?.month ?? 0) - (b?.month ?? 0));
  const lastYearSorted = range(0, 12).map((monthIdx) => {
    const lastYearData = lastYearSpendings.find((e) => e?.month - 1 === monthIdx);
    return (
      lastYearData || {
        year: thisYearSpendings[0]?.year || dayjs().year() - 1,
        month: monthIdx + 1,
        total: 0,
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

  let dotStatusColor = '#34D399';
  let backgroundStatusColor = '#D1FAE5';
  if (trackingStatus) {
    const { dot, background } = TargetStatusConfig[trackingStatus];
    dotStatusColor = dot;
    backgroundStatusColor = background;
  }
  const lines: ChartLineProps[] = [
    {
      name: 'target',
      type: 'monotone',
      dataKey: 'target',
      strokeWidth: 2,
      strokeDasharray: '8 8',
      stroke: '#7D8490',
      fill: '#FFFFFF',
      dot: false,
    },
    {
      name: 'lastYear',
      type: 'monotone',
      dataKey: 'lastYear',
      strokeWidth: 0,
      stroke: '#F3F4F6',
      dot: false,
      fill: '#F3F4F6',
      opacity: 0.8,
    },
    {
      name: 'thisYear',
      type: 'monotone',
      dataKey: 'thisYear',
      strokeWidth: 3,
      stroke: overallTarget !== 0 ? dotStatusColor : '#818CF8',
      dot: false,
      fill: overallTarget !== 0 ? backgroundStatusColor : '#818CF8',
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
