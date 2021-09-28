export type Transaction = {
  id: number;
  status?: string;
  accountNo?: string;
  transDate?: string;
  postDate?: string;
  description?: string;
  category?: string;
  type?: string;
  amount: number;
  memo?: string;
  commentCount?: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};
