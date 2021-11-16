import { useApi } from '@api';
import { TransactionFilter } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { Category, Transaction } from '@main/entity';
import { FeedCount, newFeedCountState } from '@main/states/sidemenu.state';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

interface TransactionHookValues {
  transactions: Transaction[];
  newFeedCount: FeedCount | null;
  hasMore: boolean;
  isLoading: boolean;
  updateCategory: (category: Partial<Category>) => Promise<void>;
  upsertNewFeedCount: (key: string, count: number) => void;
}

export function useTransaction(filter: TransactionFilter): TransactionHookValues {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [newFeedCount, setNewFeedCount] = useRecoilState<FeedCount>(newFeedCountState);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getTransactions = useCallback(async () => {
    try {
      setLoading(true);
      // Reset list if new filter coming
      if (!filter.pagination?.offset) {
        setTransactions([]);
      }
      if (filter.pagination?.limit) {
        const res = await ApiClient.getTransactions(filter);
        if (filter.pagination?.offset) {
          setTransactions((prevTrans) => [...prevTrans, ...res]);
        } else {
          setTransactions(res);
        }
        setHasMore(!!res.length);
      } else {
        setHasMore(false);
      }
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

  const updateCategory = useCallback(
    async (category: Partial<Category>) => {
      try {
        await ApiClient.updateCategory(category);
        // Update current transactions
        setTransactions((prevTrans) => {
          const newTransactions = prevTrans.map((trans) => {
            if (trans.category.id !== category.id) return trans;
            return {
              ...trans,
              category: {
                ...trans.category,
                ...category,
              },
            };
          });
          return newTransactions;
        });
      } catch (error) {
        if (isBadRequest(error)) {
          toast.error('Can not update category');
        } else {
          await errorHandler(error);
        }
      }
    },
    [ApiClient, errorHandler],
  );

  const upsertNewFeedCount = (key: string, value: number) => {
    setNewFeedCount({
      ...newFeedCount,
      [key]: value,
    });
  };

  useEffect(() => {
    getTransactions().then();
  }, [getTransactions]);

  return {
    transactions,
    hasMore,
    isLoading,
    newFeedCount,
    upsertNewFeedCount,
    updateCategory,
  };
}
