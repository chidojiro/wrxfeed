import { Transaction } from './transaction.entity';
import { User } from './user.entity';

export type Comment = {
  id: number;
  content: string;
  attachment?: string;
  user: User;
  transaction?: Transaction;
  parent?: string;
  replyCount?: number;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
};
