import { Department } from '@main/entity/transaction.entity';

export type Target = {
  id: number;
  month: number;
  year: number;
  amount: number;
  current: number;
  department: Department;
};

export type TargetFrontend = {
  id: number;
  title: string;
  color: string;
  isActive: boolean;
  month: number;
  year: number;
  amount: number;
  current: number;
  department: Department;
};
