import { Transaction } from '@main/entity';

export const dummyTransactions: Transaction[] = [
  {
    id: 0,
    status: 'status',
    accountNo: 'accountNo',
    transDate: Date.now().toString(),
    postDate: Date.now().toString(),
    description: 'description',
    category: 'category',
    type: 'type',
    amount: 3,
    memo: 'memo',
    commentCount: 5,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    deletedAt: Date.now().toString(),
  },
];
