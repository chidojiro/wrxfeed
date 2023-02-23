import { TargetStatusType } from '@/target/types';
import { Entities } from '@/types';

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
  week?: number;
  day?: number;
  total: number;
  item?: { id: number; name: string; type: Entities };
};

export type MonthData = {
  month: number;
  amount?: number;
};
