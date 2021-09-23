import { STATUS } from '@common/atoms/StatusTag';

export type TransactionOwner = {
  name: string;
  avatar?: string;
};

export type Transaction = {
  id: string;
  owner: TransactionOwner;
  date: number;
  status?: STATUS;
  amount: number;
  description: string;
};
