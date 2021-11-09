import { Category, Department, Vendor } from '@main/entity/transaction.entity';

export type Subscription = {
  departments?: Department[];
  categories?: Category[];
  vendors?: Vendor[];
};
