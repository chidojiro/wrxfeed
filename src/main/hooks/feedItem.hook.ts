import { useApi } from '@api';
import { FeedItemFilters } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { Transaction } from '@main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface FeedItemHookValues {
  transactions: Transaction[];
  hasMore: boolean;
  isLoading: boolean;
}
export function useFeedItem(filter: FeedItemFilters): FeedItemHookValues {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getTransactions = useCallback(async () => {
    try {
      setLoading(true);
      if (filter?.page?.limit) {
        const res = await ApiClient.getFeedItemTransactions(filter);
        if (filter?.page?.offset) {
          setTransactions((prevTrans) => [...prevTrans, ...res]);
        } else {
          setTransactions(res);
        }
        setHasMore(res.length === filter.page.limit);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error("Can't get transactions 🤦!");
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
  return {
    transactions,
    hasMore,
    isLoading,
  };
}
