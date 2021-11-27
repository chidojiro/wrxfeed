import { Category, Department } from '.';

export type FeedItem = {
  id: number;
  type: string;
  department: Department;
  category: Category;
  depId?: number;
  catId?: number;
  year?: number;
  month?: number;
  total?: number;
  firstDate?: string;
  lastDate?: string;
};
