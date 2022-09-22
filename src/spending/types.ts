import { TargetStatusType } from '@/target/types';

export type Period = {
  month: number;
  year: number;
  amount?: number;
  threshold?: number;
  total?: number;
};

export type TrackingStatus = TargetStatusType;

export type Spending = {
  year: number;
  month: number;
  total: number;
};

export type MonthData = {
  month: number;
  amount?: number;
};

export type SpendingsReport = {
  curYearSpends: Spending[];
  prevYearSpends: Spending[];
};
