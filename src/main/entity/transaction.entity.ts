export enum Visibility {
  VISIBLE = 'VISIBLE',
  HIDDEN = 'HIDDEN',
}

export enum STATUS {
  NEW = 'NEW',
}

export type Department = {
  id: number;
  name: string;
  parent?: Department;
};

export type Category = {
  id: number;
  name: string;
  visibility?: Visibility;
};

export type Vendor = {
  id: number;
  name: string;
};

export type TranMeta = {
  isRead: boolean;
};

export type Transaction = {
  id: number;
  status?: STATUS;
  description?: string;
  transDate: string;
  department: Department;
  category: Category;
  vendor: Vendor;
  currency: string;
  amountFx: number;
  commentCount: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  meta?: TranMeta;
  externalId?: string;
  recordType?: string;
  documentNumber?: string;
  subsidiaryName?: string;
  subsidiaryId?: string;
  vendorName?: string;
  vendorId?: string;
  requestorName?: string;
  requestorId?: string;
  billApproverName?: string;
  billApproverId?: number;
  createdByName?: string;
  createdById?: string;
  createdFrom?: string;
  externalCreatedAt?: string;
  exchangeRate?: number;
  memo?: string;
  terms?: string;
  dueDate?: string;
  poInternalId?: string;
  expenseReportId?: string;
  jounalEntryId?: string;
  nextApproverName?: string;
  nextApproverId?: string;
  internalMemo?: string;
};
