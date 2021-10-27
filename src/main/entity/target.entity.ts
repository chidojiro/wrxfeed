import { Department } from '@main/entity/transaction.entity';

export type Target = {
  id: number;
  month: number;
  year: number;
  amount: string;
  depId: number;
  department: Department;
  total: string;
};
