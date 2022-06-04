import { TargetProp, TargetPeriod } from '@api/types';
import { User } from '@main/entity/user.entity';
import { Department } from './transaction.entity';

export type Target = {
  id: number;
  isPrimary?: boolean;
  name: string | null;
  periods: TargetPeriod[];
  props: TargetProp[];
  creator: User;
  updater: User;
  updatedAt?: string;
  lastInteraction?: string;
  department?: Department;
};

export type TargetMonth = {
  month: number;
  amount?: number;
};

export interface TargetByTeam {
  department: Department;
  targets: Target[];
}
