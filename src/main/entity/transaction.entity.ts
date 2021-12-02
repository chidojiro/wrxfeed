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
  amount: number;
  commentCount: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  meta?: TranMeta;
};
