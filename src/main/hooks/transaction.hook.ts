import { useApi } from '@api';
import { TransactionFilter } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { Transaction } from '@main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface TransactionHookValues {
  transactions: Transaction[];
  hasMore: boolean;
  isLoading: boolean;
}

export function useTransaction(filter: TransactionFilter): TransactionHookValues {
  const [transactions, setTransaction] = useState<Transaction[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getTransactions(filter);
      if (filter.pagination?.offset) {
        setTransaction((prevTrans) => [...prevTrans, ...res]);
      } else {
        setTransaction(res);
      }
      setHasMore(!!res.length);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get transactions');
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  }, [ApiClient, errorHandler, filter]);

  useEffect(() => {
    getTransactions().then();
  }, [getTransactions]);
  return { transactions, hasMore, isLoading };
}
