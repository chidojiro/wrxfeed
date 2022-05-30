import { TransLineItem } from './lineItem.entity';

export enum Visibility {
  VISIBLE = 'VISIBLE',
  HIDDEN = 'HIDDEN',
}

export enum STATUS {
  NEW = 'NEW',
}

export enum TranStatus {
  Cancelled = 'Canceled',
  Closed = 'Closed',
  Open = 'Open',
  PartiallyReceived = 'Partially Received',
  PaidInFull = 'Paid In Full',
  FullyBilled = 'Fully Billed',
  ApprovedByAccounting = 'Approved by Accounting',
  PendingBill = 'PendingBill',
  PendingSupervisorApproval = 'Pending Supervisor Approval',
  PendingApproval = 'PendingApproval',
  PendingReceipt = 'PendingReceipt',
  PendingBillingPartiallyReceived = 'PendingBillingPartiallyReceived',
  Rejected = 'Rejected',
  RejectedBySupervisor = 'RejectedBySupervisor',
}

export type TransColor = {
  name: string;
  bgColor: string;
  dotColor: string;
  textColor: string;
};

export type TranStatusType = {
  status: string;
  displayName: string;
  color: TransColor;
};

export const TranStatusColors = {
  Red: {
    name: 'Red',
    bgColor: '#FEE2E2',
    dotColor: '#F87171',
    textColor: '#991B1B',
  },
  Purple: {
    name: 'Purple',
    bgColor: '#E0E7FF',
    dotColor: '#818CF8',
    textColor: '#3730A3',
  },
  Green: {
    name: 'Green',
    bgColor: '#D1FAE5',
    dotColor: '#34D399',
    textColor: '#065F46',
  },
  Yellow: {
    name: 'Yellow',
    bgColor: '#FEF3C7',
    dotColor: '#FBBF24',
    textColor: '#92400E',
  },
};

export const TranStatusNameColor: Record<string, TranStatusType> = {
  Cancelled: {
    status: 'Cancelled',
    displayName: 'Canceled',
    color: TranStatusColors.Red,
  },
  Closed: {
    status: 'Closed',
    displayName: 'Closed',
    color: TranStatusColors.Red,
  },
  Open: {
    status: 'Open',
    displayName: 'Open',
    color: TranStatusColors.Purple,
  },
  'Partially Received': {
    status: 'Partially Received',
    displayName: 'Open',
    color: TranStatusColors.Purple,
  },
  'Paid In Full': {
    status: 'Paid In Full',
    displayName: 'Paid',
    color: TranStatusColors.Green,
  },
  'Fully Billed': {
    status: 'Fully Billed',
    displayName: 'Paid',
    color: TranStatusColors.Green,
  },
  'Approved by Accounting': {
    status: 'Approved by Accounting',
    displayName: 'Paid',
    color: TranStatusColors.Green,
  },
  'Pending Bill': {
    status: 'Pending Bill',
    displayName: 'Pending',
    color: TranStatusColors.Yellow,
  },
  'Pending Supervisor Approval': {
    status: 'Pending Supervisor Approval',
    displayName: 'Pending',
    color: TranStatusColors.Yellow,
  },
  'Pending Approval': {
    status: 'Pending Approval',
    displayName: 'Pending',
    color: TranStatusColors.Yellow,
  },
  'Pending Receipt': {
    status: 'Pending Receipt',
    displayName: 'Pending',
    color: TranStatusColors.Yellow,
  },
  'Pending Billing Partially Received': {
    status: 'Pending Billing Partially Received',
    displayName: 'Pending',
    color: TranStatusColors.Yellow,
  },
  Rejected: {
    status: 'Rejected',
    displayName: 'Rejected',
    color: TranStatusColors.Red,
  },
  'Rejected by Supervisor': {
    status: 'Rejected by Supervisor',
    displayName: 'Rejected',
    color: TranStatusColors.Red,
  },
};

export type Department = {
  id: number;
  name: string;
  parent?: Department;
  avatar?: string;
};

export type Category = {
  id: number;
  name: string;
  visibility?: Visibility;
  year?: number;
  month?: number;
  amount?: number;
  avatar?: string;
};

export type Vendor = {
  id: number;
  name: string;
  avatar?: string;
  contactEmail?: string;
  contactNumber?: string;
  website?: string;
};

export type TranMeta = {
  isRead: boolean;
};

export type Transaction = {
  id: number;
  status?: TranStatus;
  lineItems?: TransLineItem[];
  description?: string;
  transDate: string;
  department: Department;
  category: Category;
  vendor: Vendor;
  currency: string;
  amountFx: number;
  amountUsd: number;
  amount: number;
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
  nextApproverName?: string;
  nextApproverId?: string;
  internalMemo?: string;
};
