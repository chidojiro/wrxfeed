import { User } from '@/main/entity/user.entity';
import { Transaction } from '@/main/entity/transaction.entity';

export type Mention = {
  content: string;
  attachment: string;
  user: User;
  transaction: Transaction;
  parent: string;
  replyCount: number;
  createdAt: Date;
};
