import { atom } from 'recoil';
import { Transaction } from '@main/entity';

const prefix = 'main/TransactionModal/';

export interface TransactionModalState {
  transaction: Transaction | null;
}

export const showTransactionModalState = atom<TransactionModalState>({
  key: `${prefix}/show`,
  default: {
    transaction: null,
  },
});
