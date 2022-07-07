import { Category, Department, Transaction } from '@/main/entity';
import { Target } from '@/target/types';

export type FeedItem = {
  id: number;
  type: string;
  year?: number;
  month?: number;
  prevMonthSpend?: number;
  department: Department;
  category: Category;
  depId?: number;
  catId?: number;
  transactions: Transaction[];
  lastInteraction: string;
  target: Target;
  hidden?: boolean;
};

export enum FeedType {
  TransFeed = 'TransFeed',
  TargetFeed = 'TargetFeed',
}
