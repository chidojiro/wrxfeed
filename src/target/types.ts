import { User } from '@/main/entity/user.entity';
import { Department } from '@/main/entity/transaction.entity';
import { BitBoolean } from '@/common/types';
import { PaginationParams } from '@/rest/types';
import { Period, Spending } from '@/spending/types';
import { FeedMode } from '@/feed/types';
import { Comment, FeedItem } from '@/main/entity';

export type GetTargetsParams = PaginationParams & {
  dep?: number;
  mode?: FeedMode;
  month?: number;
  year?: number;
  isPrimary?: BitBoolean;
  type?: 'normal' | 'company';
};

export type CreateTargetPayload = {
  name: string;
  depId?: number;
  isPrimary: boolean;
  props: TargetProps[];
  periods?: TargetPeriod[];
};

export type UpdateTargetPayload = {
  name: string;
  depId?: number;
  isPrimary: boolean;
  props: TargetProps[];
  periods: TargetPeriod[];
};

export type TargetFilter = PaginationParams & {
  year?: number;
  month?: number;
  timestamp?: number;
  dep?: number;
  mode?: FeedMode;
  isPrimary?: BitBoolean;
  type?: 'normal' | 'company';
};

// this one is kinda weird to be part of target but the api endpoint starts with /target
export type DepartmentSummary = {
  id: number;
  name: string;
  target?: Target;
  spends: number;
  comments: Comment[];
};

export type TargetSummaries = {
  total: number;
  onTrack: number;
  atRisk: number;
  exceeded: number;
};

export type GetTargetSpendingParams = {
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

export type TargetPeriod = Period;

export enum TargetStatusType {
  OnTrack = 'ON_TRACK',
  AtRisk = 'AT_RISK',
  Exceeded = 'EXCEEDED',
  NotSet = 'NOT_SET',
}

export type TargetSpending = Spending;

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
  [TargetStatusType.NotSet]: {
    label: '#7D8490',
    background: '#D1FAE5',
    dot: '#7D8490',
    name: 'Exceeded',
  },
};

export type Target = {
  id: number;
  isPrimary?: boolean;
  feedItem?: FeedItem;
  name: string | null;
  creator?: User;
  updatedBy: User;
  updatedAt?: string;
  lastInteraction?: string;
  department?: Department;
  trackingStatus?: TargetStatusType;
  props: TargetProps[];
  periods: TargetPeriod[];
  spendings: TargetSpending[];
};

export type TargetMonth = {
  month: number;
  amount?: number;
};

export interface TargetByTeam {
  department: Department;
  targets: Target[];
}

export type SummaryFeedItem = {
  id: number;
  category: string;
  replyCount: number;
  department: Department;
};
