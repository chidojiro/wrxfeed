import { LineChartData } from '@/main/types';
import { TargetMonth } from '@/target/types';

export const PROJECT_CLASS_NAME_PREFIX = 'gvt-';

export const DEFAULT_ITEMS_PER_INFINITE_LOAD = 10;

export const monthsInYear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const defaultTargetMonths: TargetMonth[] = monthsInYear.map((month) => ({ month }));

export const INITIAL_CHART_DATA: LineChartData = {
  data: [],
  lines: [],
  legends: [],
  maxValue: 0,
};

export const EMPTY_AMOUNT = '--';

// Needed as fallback value in cases it's a dependency of a hook
// The intention is to prevent unnecessary rerenders, or even infinite rerenders
export const EMPTY_ARRAY = [];

export const IS_DEMO = !!process.env.REACT_IS_DEMO;
