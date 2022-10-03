import { INITIAL_CHART_DATA } from '@/common/constants';
import { AssertUtils, round } from '@/common/utils';
import { ChartDataPoint, ChartLevel, ChartLineProps, LineChartData } from '@/main/types';
import { decimalLogic, DecimalType } from '@/main/utils';
import { TargetMonth, TargetPeriod, TargetSpending, TargetStatusConfig } from '@/target/types';
import dayjs from 'dayjs';
import { groupBy, range } from 'lodash-es';
import { SpendingChartData } from './SpendingChart';
import { MonthData, Spending, TrackingStatus } from './types';

const Accent9 = '#C2C2FA';

const DATA_DATE_FORMAT = 'MMM DD';
const BILLION = Math.pow(10, 9);
const MILLION = Math.pow(10, 6);
const THOUSAND = Math.pow(10, 3);

const getYearSpending = (spendings: TargetSpending[], year: number) =>
  spendings?.filter((cur) => cur.year === year).reduce((acc, { total }) => total + acc, 0) ?? 0;

export const getThisYearSpending = (spendings: TargetSpending[]) =>
  getYearSpending(spendings, new Date().getFullYear());

export const getLastYearSpending = (spendings: TargetSpending[]) =>
  getYearSpending(spendings, new Date().getFullYear() - 1);

export const getLineChartDataInMonth = (
  data: SpendingChartData,
  targetMonth: TargetMonth,
  trackingStatus?: TrackingStatus,
): LineChartData => {
  const { spendings, periods = [] } = data;

  const overallTarget = !trackingStatus || isEmptyPeriods(periods);

  const targetDate = dayjs().set('month', targetMonth.month - 1);
  const isThisMonth = dayjs().month() === targetMonth.month - 1;

  const totalThisYear = getThisYearSpending(spendings ?? []);
  const totalLastYear = getLastYearSpending(spendings ?? []);
  const chartData: ChartDataPoint[] = Array(targetDate.daysInMonth())
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

  const targetLine =
    trackingStatus !== 'NOT_SET'
      ? {
          name: 'target',
          type: 'monotone',
          dataKey: 'target',
          strokeWidth: 2,
          strokeDasharray: '8 8',
          stroke: '#7D8490',
          fill: 'none',
          dot: false,
        }
      : {
          name: '',
          type: '',
          dataKey: '',
          strokeWidth: 0,
          strokeDasharray: '',
          stroke: '',
          fill: '',
          dot: false,
        };

  const lines: ChartLineProps[] = [
    targetLine,
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
      stroke: overallTarget ? Accent9 : dotStatusColor,
      dot: false,
      fill: overallTarget ? Accent9 : backgroundStatusColor,
    },
  ];

  let maxValue = Math.max(totalThisYear, totalLastYear, targetMonth.amount ?? 0);
  const positiveMax = Math.abs(maxValue);
  if (positiveMax >= BILLION) {
    maxValue = Math.ceil(positiveMax / BILLION) * BILLION; // Billion
  }
  if (positiveMax >= MILLION) {
    maxValue = Math.ceil(positiveMax / MILLION) * MILLION; // Millions
  }
  if (positiveMax >= THOUSAND) {
    const remember = THOUSAND;
    maxValue = Math.ceil(positiveMax / THOUSAND); // Thousands
    maxValue = Math.ceil(maxValue / 5) * 5 * remember;
  }
  return { data: chartData, legends: [], lines, maxValue };
};

export const getChartLevels = (maxValue: number): ChartLevel[] => {
  const numberLevel = 5;
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

export const getMonthsLineChartData = (
  data: SpendingChartData,
  months: MonthData[],
  trackingStatus?: TrackingStatus,
): LineChartData => {
  if (!data) return INITIAL_CHART_DATA;

  const { periods = [], spendings } = data;

  const overallTarget = !trackingStatus || isEmptyPeriods(periods);

  const monthFormat = 'MMM';
  const thisMonth = dayjs().month();
  let cumulativeThisYear = 0;
  let cumulativeLastYear = 0;
  let cumulativeTarget = 0;

  const thisYearSpendings =
    spendings?.filter((item) => item.year === new Date().getFullYear()) ?? [];
  const lastYearSpendings =
    spendings?.filter((item) => item.year === new Date().getFullYear() - 1) ?? [];

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
  const availableTargets = months.filter((item) => item?.amount !== undefined);
  const startMonth = availableTargets[0]?.month ?? 1;
  const endMonth = availableTargets[availableTargets.length - 1]?.month ?? 12;

  let chartData: ChartDataPoint[] = months.reduce<ChartDataPoint[]>((preVal, monthData, index) => {
    // Out of month range
    if (monthData.month < startMonth || monthData.month > endMonth) {
      return preVal;
    }
    const month = dayjs().month(index).format(monthFormat);
    // Calculate cumulative values
    cumulativeThisYear += round(
      thisYearSorted.find(({ month }) => month === monthData.month)?.total ?? 0,
      2,
    );
    cumulativeLastYear += round(
      lastYearSorted.find(({ month }) => month === monthData.month)?.total ?? 0,
      2,
    );
    cumulativeTarget += round(monthData?.amount ?? 0, 2);

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
  if (chartData.length === 1) {
    chartData = [chartData[0], chartData[0]];
  }

  // Data points is 0 (target wasn't set) => show previous year and current year spending data
  if (chartData.length === 0) {
    chartData = lastYearSorted.map((lastYearData, index) => {
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

  const targetLine =
    trackingStatus !== 'NOT_SET'
      ? {
          name: 'target',
          type: 'monotone',
          dataKey: 'target',
          strokeWidth: 2,
          strokeDasharray: '8 8',
          stroke: '#7D8490',
          fill: 'none',
          dot: false,
        }
      : {
          name: '',
          type: '',
          dataKey: '',
          strokeWidth: 0,
          strokeDasharray: '',
          stroke: '',
          fill: '',
          dot: false,
        };

  const lines: ChartLineProps[] = [
    targetLine,
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
      stroke: overallTarget ? Accent9 : dotStatusColor,
      dot: false,
      fill: overallTarget ? Accent9 : backgroundStatusColor,
    },
  ];

  return {
    data: chartData,
    legends: [],
    lines,
    maxValue,
    metadata: { currentSpend: cumulativeThisYear },
  };
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

export const isEmptyPeriods = (periods: TargetPeriod[]) =>
  periods.every((v: TargetPeriod) => !v.amount);

export const getCurrentSpendings = (
  spendings: Spending[],
  periods: TargetPeriod[],
  year = new Date().getFullYear(),
) => {
  const yearSpendingsGroupedByMonth = groupBy(
    spendings.filter((spending) => spending.year === year),
    'month',
  );
  const spendingsSortedByMonth = new Array(12)
    .fill(null)
    .map((_, idx) => ({ ...yearSpendingsGroupedByMonth[idx + 1]?.[0], month: idx + 1 }));

  const periodsGroupedByMonth = groupBy(
    periods.filter((spending) => spending.year === year),
    'month',
  );
  const periodsSortedByMonth = new Array(12)
    .fill(null)
    .map((_, idx) => ({ ...periodsGroupedByMonth[idx + 1]?.[0], month: idx + 1 }));

  const firstMeaningfulPeriodMonth = periodsSortedByMonth.findIndex(
    ({ amount }) => !AssertUtils.isNullOrUndefined(amount),
  );

  const lastMeaningfulPeriodMonth =
    periodsSortedByMonth.length -
    1 -
    periodsSortedByMonth
      .slice()
      .reverse()
      .findIndex(({ amount }) => !AssertUtils.isNullOrUndefined(amount));

  return (
    spendingsSortedByMonth
      .slice(firstMeaningfulPeriodMonth, lastMeaningfulPeriodMonth + 1)
      .reduce((total, target) => total + (target.total ?? 0), 0) ?? 0
  );
};