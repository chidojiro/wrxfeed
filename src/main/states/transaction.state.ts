import { Pagination } from '@api/types';
import { getApiClient } from '@api/utils';
import { Transaction } from '@main/entity';
import { atom, selector } from 'recoil';

export const transactionFilterState = atom<Pagination>({
  key: 'main/transactionFilter',
  default: {
    offset: 0,
    limit: 10,
  },
});

export const transactionSelector = selector<Transaction[]>({
  key: 'main/transactions', // unique ID (with respect to other atoms/selectors)
  get: async ({ get }) => {
    const apiClient = await getApiClient();
    const filter = get(transactionFilterState);
    return apiClient.getTransactions(filter);
  },
});
