import { AssertUtils, DateUtils } from '@/common/utils';
import { groupBy } from 'lodash-es';
import { TargetPeriod } from './types';

export const getFullYearPeriods = (periods: TargetPeriod[] = []) => {
  const periodsGroupedByMonth = groupBy(periods, 'month');

  return new Array(12).fill(null).map<TargetPeriod>((_, index) => {
    const currentMonth = index + 1;

    const { year, amount, threshold } = periodsGroupedByMonth[currentMonth]?.[0] ?? {};

    const thisYear = DateUtils.getThisYear();

    return {
      month: currentMonth,
      year: year ?? thisYear,
      amount: amount ?? 0,
      threshold: threshold ?? 0,
    };
  });
};

export const isValidPeriods = (periods: TargetPeriod[]) =>
  periods.some((v: TargetPeriod) => !AssertUtils.isNullOrUndefined(v.amount));

export const isEmptyPeriods = (periods: TargetPeriod[]) =>
  periods.every((v: TargetPeriod) => !v.amount);
