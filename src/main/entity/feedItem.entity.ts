import { Target, Category, Department, Transaction } from '@main/entity';

export type FeedItem = {
  id: number;
  type: string;
  year?: number;
  month?: number;
  // total?: number;
  lastMonthTotal?: number;
  // firstDate?: string;
  // lastDate?: string;
  department: Department;
  category: Category;
  depId?: number;
  catId?: number;
  transactions: Transaction[];
  lastInteraction: string;
  target: Target;
};
