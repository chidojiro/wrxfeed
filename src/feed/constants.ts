import { Category } from '@/main/entity/transaction.entity';
import { FeedItem, TranStatus } from '@/main/entity';
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
  comments: [],
  lineItem: {
    id: 0,
    company: {
      id: 0,
      name: '',
    },
    transId: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    externalId: '',
    item: '',
    departmentName: '',
    departmentId: 0,
    transStatus: TranStatus.Cancelled,
  },
};
