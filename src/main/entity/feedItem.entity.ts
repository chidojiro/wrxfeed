import { FeedType } from '@/feed/types';
import { Category, Department, Transaction, Comment, TransLineItem } from '@/main/entity';
import { Target } from '@/target/types';

export type FeedItem = {
  id: number;
  type: FeedType;
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
  isFallback?: boolean;
  lineItemId?: number;
  comments: Comment[];
  lineItem: TransLineItem;
};

export enum FeedRouteType {
  TransFeed = 'TransFeed',
  TargetFeed = 'TargetFeed',
}
