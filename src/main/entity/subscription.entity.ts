import { Insight } from '@/insight/types';
import { Category, Department } from '@/main/entity/transaction.entity';
import { Vendor } from '@/vendor/types';

export type Subscription = {
  departments: Department[];
  categories: Category[];
  vendors: Vendor[];
  insights: Insight[];
};
