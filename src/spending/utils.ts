import { INITIAL_CHART_DATA } from '@/common/constants';
import { AssertUtils, DateUtils, round } from '@/common/utils';
import { SPENDINGS_DATE_LIMIT, USE_PREV_YEAR_SPENDINGS } from '@/env';
import { ChartDataPoint, ChartLevel, ChartLineProps, LineChartData } from '@/main/types';
import { decimalLogic, DecimalType } from '@/main/utils';
import {
  TargetMonth,
  TargetPeriod,
  TargetSpending,
  TargetStatusConfig,
  TargetStatusType,
} from '@/target/types';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { groupBy, range, sumBy } from 'lodash-es';
import { DateRangeFilter } from '@/feed/types';
import { SpendingChartData } from './SpendingChart';
import { MonthData, Spending, TrackingStatus } from './types';

dayjs.extend(weekOfYear);

const Accent2 = '#6565FB';
const Accent9 = '#C2C2FA';

const DATA_DATE_FORMAT = 'MMM DD';
const BILLION = Math.pow(10, 9);
const MILLION = Math.pow(10, 6);
const THOUSAND = Math.pow(10, 3);

const getThisMonth = () => (USE_PREV_YEAR_SPENDINGS ? 11 : dayjs().month());

const getYearSpending = (spendings: TargetSpending[], year: number) =>
  spendings?.filter((cur) => cur.year === year).reduce((acc, { total }) => total + acc, 0) ?? 0;

export const getThisYearSpending = (spendings: TargetSpending[]) =>
  getYearSpending(spendings, DateUtils.getThisYear());

export const getLastYearSpending = (spendings: TargetSpending[]) =>
  getYearSpending(spendings, DateUtils.getThisYear() - 1);

export const getLineChartDataInMonth = (
  data: SpendingChartData,
  targetMonth: TargetMonth,
  trackingStatus: TrackingStatus,
): LineChartData => {
  const { spendings } = data;

  const targetDate = dayjs().set('month', targetMonth.month - 1);
  const isThisMonth = getThisMonth() === targetMonth.month - 1;

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
      stroke: trackingStatus === TargetStatusType.NotSet ? Accent2 : dotStatusColor,
      dot: false,
      fill: trackingStatus === TargetStatusType.NotSet ? Accent9 : backgroundStatusColor,
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

  const { spendings } = data;

  const monthFormat = 'MMM';
  const thisMonth = getThisMonth();
  let cumulativeThisYear = 0;
  let cumulativeLastYear = 0;
  let cumulativeTarget = 0;

  const thisYearSpendings =
    spendings?.filter((item) => item.year === DateUtils.getThisYear()) ?? [];
  const lastYearSpendings =
    spendings?.filter((item) => item.year === DateUtils.getThisYear() - 1) ?? [];

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

  let chartData: ChartDataPoint[] = months.reduce<ChartDataPoint[]>(
    (preVal, monthData, index) => {
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
    },
    [{ name: '', lastYear: 0, thisYear: 0, target: 0 }],
  );

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
      stroke: trackingStatus === TargetStatusType.NotSet ? Accent2 : dotStatusColor,
      dot: false,
      fill: trackingStatus === TargetStatusType.NotSet ? Accent9 : backgroundStatusColor,
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
  const THIS_YEAR = DateUtils.getThisYear();
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
  year = DateUtils.getThisYear(),
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

const COLORS = [
  '#2C0594',
  '#6565FB',
  '#BD86F3',
  '#BF43A4',
  '#801BAF',
  '#EF8482',
  '#FCCD25',
  '#FFA31D',
  '#319DB0',
  '#225959',
];

const dateFormat = 'YYYY-MM-DD';

const getChartDate = ({
  year,
  month,
  week,
  day,
}: {
  year: number;
  month?: number;
  week?: number;
  day?: number;
}) => {
  let tempDate = trimTime(dayjs().year(year));

  if (week) {
    return tempDate.week(week).day(0).format(dateFormat);
  }

  if (month) {
    tempDate = tempDate.month(month - 1);
  }

  if (day) {
    tempDate = tempDate.date(day);
  } else {
    tempDate = tempDate.date(1);
  }

  return tempDate.format(dateFormat);
};

export const getSpendingsGroupedByYear = (spendings: Spending[]) => {
  const spendingsGroupedByYear = groupBy(spendings, ({ year }) => year);

  return spendingsGroupedByYear;
};

export const getSpendingsGroupedByDate = (spendings: Spending[]) => {
  const spendingsGroupedByDate = groupBy(spendings, ({ year, month, week, day }) =>
    getChartDate({ year, month, week, day }),
  );

  return spendingsGroupedByDate;
};

export const getSortedTotalSpendings = (spendings: Spending[], dateRange: DateRangeFilter) => {
  const { from, to } = convertDateRangeToFromTo({ dateRange }, true);

  const activeSpendings = spendings.filter(({ year, month, week, day }) =>
    dayjs(getChartDate({ year, month, week, day })).isBetween(from, to, 'day', '[]'),
  );

  const spendingsGroupedById = groupBy(activeSpendings, 'item.id');

  const sortedTotalSpendings = Object.entries(spendingsGroupedById)
    .map(([id, spendings]) => ({
      id: +id,
      name: spendings[0].item?.name,
      total: spendings.reduce((total, spending) => total + spending.total, 0),
    }))
    .sort((a, b) => b.total - a.total)
    .map((item, idx) => ({ ...item, color: COLORS[idx] }));

  return sortedTotalSpendings;
};

const getPreviousYearDate = (date: string, timelineUnit: string) => {
  const week = dayjs(date).week();
  const month = dayjs(date).month();
  const year = dayjs(date).year() - 1;

  let tempDate = dayjs(date).year(year);

  if (timelineUnit === 'week') {
    tempDate = tempDate.week(week).day(0);
  } else if (timelineUnit === 'month') {
    tempDate = tempDate.month(month).date(1);
  }

  return tempDate.format(dateFormat);
};

export const getChartDataByDateRange = (spendings: Spending[], dateRange: DateRangeFilter) => {
  const timelineUnit = getChartTimelineUnit(dateRange);

  const top10TotalSpendings = getSortedTotalSpendings(spendings, dateRange).slice(0, 10);
  const top10TotalSpendingsIds = top10TotalSpendings.map(({ id }) => id);

  const { from, to } = convertDateRangeToFromTo({ dateRange }, true);

  const spendingsGroupedByDate = getSpendingsGroupedByDate(spendings);

  const data = range(dayjs(to).diff(from, timelineUnit) + 1).map((idx) => {
    const offset = idx;

    const currentDate = (() => {
      let tempDate = dayjs(from);

      if (timelineUnit === 'day') {
        tempDate = tempDate.add(offset, timelineUnit);
      } else if (timelineUnit === 'week') {
        tempDate = tempDate.day(0).add(offset, timelineUnit);
      } else {
        tempDate = tempDate.date(1).add(offset, timelineUnit);
      }

      return tempDate.format(dateFormat);
    })();

    const previousYearDate = getPreviousYearDate(currentDate, timelineUnit);

    const currentDateSpendings = spendingsGroupedByDate[currentDate];

    const currentDateSpendingsGroupedById = groupBy(currentDateSpendings, ({ item }) => item?.id);

    const { top10TotalGroupedById, othersTotal } = Object.entries(
      currentDateSpendingsGroupedById,
    ).reduce(
      ({ top10TotalGroupedById, othersTotal }, [id, spends]) => {
        if (!top10TotalSpendingsIds.includes(+id)) {
          return {
            top10TotalGroupedById,
            othersTotal: othersTotal + sumBy(spends, 'total'),
          };
        }

        return {
          top10TotalGroupedById: {
            ...top10TotalGroupedById,
            [id]: sumBy(spends, 'total'),
          },
          othersTotal,
        };
      },
      { top10TotalGroupedById: {}, othersTotal: 0 },
    );

    const getName = () => {
      const isDifferentYear = dayjs(from).year() !== dayjs(to).year();

      if (timelineUnit === 'day' || timelineUnit === 'week') {
        if (isDifferentYear) return dayjs(currentDate).format('M/D\nYYYY');

        return dayjs(currentDate).format('M/D');
      }

      if (isDifferentYear) return dayjs(currentDate).format('MMM\nYYYY');

      return dayjs(currentDate).format('MMM');
    };

    return {
      name: getName(),
      unit: timelineUnit,
      date: currentDate,
      currentYearTotal: sumBy(spendingsGroupedByDate[currentDate] ?? [], 'total'),
      previousYearTotal: sumBy(spendingsGroupedByDate[previousYearDate] ?? [], 'total'),
      ...top10TotalGroupedById,
      '-1': othersTotal,
      items: [top10TotalSpendings, { id: -1, name: 'Other' }].flat(),
    };
  });

  return data;
};

export const getChartTimelineUnit = (dateRange: DateRangeFilter) => {
  if (Array.isArray(dateRange)) {
    const [from, to] = dateRange;

    if (dayjs(to).diff(from, 'day') < 30) {
      return 'day';
    }

    if (dayjs(to).diff(from, 'day') < 90) {
      return 'week';
    }

    return 'month';
  } else {
    switch (dateRange) {
      case '30-days':
        return 'day';
      case '90-days':
        return 'week';
      default:
        return 'month';
    }
  }
};

const trimTime = (day: dayjs.Dayjs) => day.hour(0).minute(0).second(0).millisecond(0);

export const convertDateRangeToFromTo = (
  {
    dateRange,
    from,
    to,
  }: {
    dateRange: DateRangeFilter;
    from?: string;
    to?: string;
  },
  force = false,
) => {
  const format = 'YYYY-MM-DD';

  if (force) {
    return {
      dateRange: 'custom' as const,
      from: trimTime(
        (() => {
          switch (dateRange) {
            case '30-days':
              return trimTime(dayjs(SPENDINGS_DATE_LIMIT).subtract(29, 'day'));
            case '90-days':
              return dayjs(SPENDINGS_DATE_LIMIT).subtract(89, 'day');
            case 'year-to-date':
              return dayjs(SPENDINGS_DATE_LIMIT).date(1).month(0);
            default:
              return dayjs(dateRange[0]);
          }
        })(),
      ).format(format),
      to: trimTime(
        (() => {
          switch (dateRange) {
            case 'year-to-date':
              return dayjs(SPENDINGS_DATE_LIMIT).month(11).date(31);
            case '30-days':
            case '90-days':
              return dayjs(SPENDINGS_DATE_LIMIT);
            default:
              return dayjs(dateRange[1]);
          }
        })(),
      ).format(format),
    };
  }

  return {
    dateRange: typeof dateRange === 'string' ? dateRange : 'custom',
    from: from ?? (Array.isArray(dateRange) ? dayjs(dateRange[0]).format(format) : undefined),
    to: to ?? (Array.isArray(dateRange) ? dayjs(dateRange[1]).format(format) : undefined),
  };
};
