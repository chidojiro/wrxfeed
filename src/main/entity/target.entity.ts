import { TargetProp, TargetPeriod } from '@/api/types';
import { User } from '@/main/entity/user.entity';
import { Department } from './transaction.entity';

export enum TargetStatusType {
  OnTrack = 'ON_TRACK',
  AtRisk = 'AT_RISK',
  Exceeded = 'EXCEEDED',
}

export type TargetStatusColor = {
  label: string;
  background: string;
  dot: string;
};

export type TargetSpending = {
  year: number;
  month: number;
  total: number;
};

export const TargetStatusConfig = {
  [TargetStatusType.OnTrack]: {
    label: '#065F46',
    background: '#D1FAE5',
    dot: '#34D399',
    name: 'On Track',
  },
  [TargetStatusType.AtRisk]: {
    label: '#92400E',
    background: '#FEF2C1',
    dot: '#FBBF24',
    name: 'At Risk',
  },
  [TargetStatusType.Exceeded]: {
    label: '#991B1B',
    background: '#FFC6C6',
    dot: '#F87171',
    name: 'Exceeded',
  },
};

export type Target = {
  id: number;
  isPrimary?: boolean;
  name: string | null;
  creator: User;
  updatedBy: User;
  updatedAt?: string;
  lastInteraction?: string;
  department?: Department;
  trackingStatus?: TargetStatusType;
  props: TargetProp[];
  periods: TargetPeriod[];
  spendings?: TargetSpending[];
};

export type TargetMonth = {
  month: number;
  amount?: number;
};

export interface TargetByTeam {
  department: Department;
  targets: Target[];
}
