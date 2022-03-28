import { Target, Category, Department, Transaction } from '@main/entity';

export type FeedItem = {
  id: number;
  type: string;
  year?: number;
  month?: number;
  total?: number;
  lastMonthTotal?: number;
  firstDate?: string;
  lastDate?: string;
  department: Department;
  category: Category;
  depId?: number;
  catId?: number;
  transactions: Transaction[];
  lastInteraction: string;
  target: Target;
};

export type ChartDataPoint = {
  name: string;
  [key: string]: number | string;
};

export type ChartLegend = {
  id: number | string;
  color: string;
  name: string;
  type?: string;
};

export type ChartLineProps = {
  name: string;
  type: string;
  dataKey: string;
  strokeWidth: number;
  stroke: string;
  dot: boolean;
};

export type ChartLevel = {
  id: number;
  value: number;
  title: string | number;
  isTarget?: boolean;
};
