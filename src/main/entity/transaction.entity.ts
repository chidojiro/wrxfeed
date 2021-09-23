export type Transaction = {
  id: number;
  accountNo: string;
  transDate: string;
  postDate: string;
  description?: string;
  category?: string;
  type?: string;
  amount: number;
  memo?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
