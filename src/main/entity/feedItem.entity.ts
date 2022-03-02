import { Category, Department, Transaction } from '.';

export type FeedItem = {
  id: number;
  type: string;
  year?: number;
  month?: number;
  total?: number;
  firstDate?: string;
  lastDate?: string;
  department: Department;
  category: Category;
  depId?: number;
  catId?: number;
  transactions: Transaction[];
};
