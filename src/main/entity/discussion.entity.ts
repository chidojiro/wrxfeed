import { User } from '@main/entity/user.entity';
import { Transaction } from '@main/entity/transaction.entity';

export type Discussion = {
  id: number;
  content: string;
  attachment: string;
  replyCount: number;
  createdAt: Date;
  user: User;
  transaction?: Transaction;
  parent?: string;
};
