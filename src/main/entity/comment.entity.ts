import { Transaction } from './transaction.entity';
import { User } from './user.entity';

export type Comment = {
  id: number;
  content: string;
  attachment?: string;
  user: User;
  transaction: Transaction;
  parent?: Comment;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
