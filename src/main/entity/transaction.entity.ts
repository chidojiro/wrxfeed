export type Department = {
  id: number;
  name: string;
  parent?: Department;
};

export type Category = {
  id: number;
  name: string;
};

export type Vendor = {
  id: number;
  name: string;
};

export type Transaction = {
  id: number;
  status?: string;
  transDate: string;
  department: Department;
  category: Category;
  vendor: Vendor;
  currency: string;
  amount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};
