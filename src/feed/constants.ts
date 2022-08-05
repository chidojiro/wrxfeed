import { Category } from '@/main/entity/transaction.entity';
import { FeedItem } from '@/main/entity';
import { fallbackDepartment } from '@/team/constants';
import { fallbackTarget } from '@/target/constants';

export const fallbackCategory: Category = {
  id: 1,
  name: '',
};

export const fallbackFeed: FeedItem = {
  id: 1,
  type: 'target',
  department: fallbackDepartment,
  category: fallbackCategory,
  transactions: [],
  lastInteraction: '',
  target: fallbackTarget,
  hidden: false,
  isFallback: true,
};
