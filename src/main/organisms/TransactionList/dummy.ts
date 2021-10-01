import { Transaction } from '@main/entity';

export const dummyTransactions: Transaction[] = [
  {
    id: 0,
    status: 'status',
    transDate: Date.now().toString(),
    category: 'category',
    amount: 3,
    commentCount: 5,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    deletedAt: Date.now().toString(),
  },
];
