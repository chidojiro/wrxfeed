import { User } from '@/main/entity/user.entity';
import { Department } from '@/main/entity/transaction.entity';
import { BitBoolean } from '@/common/types';
import { PaginationParams } from '@/rest/types';

export type TargetFilter = Partial<PaginationParams> & {
  year?: number;
  month?: number;
  timestamp?: number;
  dep?: number;
  forYou?: BitBoolean;
  isPrimary?: BitBoolean;
};

export type TargetSummaries = {
  total: number;
  onTrack: number;
  atRisk: number;
  exceeded: number;
};

export type PatchCalcSpendingFilters = {
  props: TargetProps[];
  periods: TargetPeriod[];
};

export enum TargetTypeProp {
  DEPARTMENT = 'DEPARTMENT',
  CATEGORY = 'CATEGORY',
  VENDOR = 'VENDOR',
}

export type TargetProps = {
  id: number;
  type: TargetTypeProp;
  name: string;
  exclude?: boolean;
};

export type TargetPeriod = {
  month: number;
  year: number;
  amount?: number;
  threshold?: number;
  total?: number;
};

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
  props: TargetProps[];
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
