import { Department, Category, Vendor, Company, Transaction } from '.';

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
  transaction: Transaction;
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
  startDate?: string;
  endDate?: string;
  meta?: UserLineItem;
};
