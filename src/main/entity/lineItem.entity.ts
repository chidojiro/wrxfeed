/* eslint-disable import/no-cycle */
import { Vendor } from '@/vendor/types';
import { Company } from './company.entity';
import { FeedItem } from './feedItem.entity';
import { Category, Department, Transaction, TranStatus } from './transaction.entity';

export type UserLineItem = {
  isRead: boolean;
};

export type TransLineItem = {
  id: number;
  depId?: number;
  department?: Department;
  catId?: number;
  category?: Category;
  vendId?: number;
  vendor?: Vendor;
  companyId?: number;
  company: Company;
  transId: number;
  transaction?: Transaction;
  createdAt: Date;
  updatedAt: Date;
  externalId: string;
  item: string;
  location?: string;
  locationId?: number;
  departmentName: string;
  departmentId: number;
  subDepartmentName?: string;
  subDepartmentId?: number;
  class?: string;
  market?: string;
  description?: string;
  quantity?: number;
  unitRate?: string;
  accountName?: string;
  accountId?: number;
  quantityBilled?: number;
  quantityReceived?: number;
  amountFx?: number;
  amountUsd?: number;
  rateUsd?: number;
  startDate?: string;
  endDate?: string;
  meta?: UserLineItem;
  vendorName?: string;
  transDate?: string;
  transStatus: TranStatus;
  transRecordType?: string;
  feedItemId?: number;
  feedItem?: FeedItem;
};

export type LineItem = {
  id?: number;
  description?: string;
  category?: Category;
};

export const EMPTY_LINE_ITEM = Object.freeze({
  id: undefined,
  description: undefined,
});
