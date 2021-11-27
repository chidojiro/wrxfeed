import { Category, Department, Transaction, Vendor } from '.';

export type FeedItem = {
  id: number;
  status?: string;
  startTime: string;
  endTime?: string;
  department: Department;
  category: Category;
  vendor: Vendor;
  currency: string;
  transactions?: Transaction[];
  amount: number;
  commentCount: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};
