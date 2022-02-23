export enum Visibility {
  VISIBLE = 'VISIBLE',
  HIDDEN = 'HIDDEN',
}

export enum STATUS {
  NEW = 'NEW',
}

export const TransactionStatus = {
  Cancelled: {
    displayName: 'Canceled',
    color: 'Red',
  },
  Closed: {
    displayName: 'Closed',
    color: 'Red',
  },
  Open: {
    displayName: 'Open',
    color: 'Purple',
  },
  PartiallyReceived: {
    displayName: 'Open',
    color: 'Purple',
  },
  PaidInFull: {
    displayName: 'Paid',
    color: 'Green',
  },
  FullyBilled: {
    displayName: 'Paid',
    color: 'Green',
  },
  ApprovedByAccounting: {
    displayName: 'Paid',
    color: 'Green',
  },
  PendingBill: {
    displayName: 'Pending',
    color: 'Yellow',
  },
  PendingSupervisorApproval: {
    displayName: 'Pending',
    color: 'Yellow',
  },
  PendingApproval: {
    displayName: 'Pending',
    color: 'Yellow',
  },
  PendingReceipt: {
    displayName: 'Pending',
    color: 'Yellow',
  },
  PendingBillingPartiallyReceived: {
    displayName: 'Pending',
    color: 'Yellow',
  },
  Rejected: {
    displayName: 'Rejected',
    color: 'Red',
  },
  RejectedBySupervisor: {
    displayName: 'Rejected',
    color: 'Red',
  },
};

export type Department = {
  id: number;
  name: string;
  parent?: Department;
};

export type Category = {
  id: number;
  name: string;
  visibility?: Visibility;
  year?: number;
  month?: number;
  amount?: number;
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
