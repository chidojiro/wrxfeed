/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';

import { useApi } from '@api';
import usePusher from '@api/hooks/usePusher';
import { TransactionFilter } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { useIdentity } from '@identity/hooks';
import { Category, Transaction } from '@main/entity';
import { FeedCount, newFeedCountState } from '@main/states/sidemenu.state';

interface TransactionHookValues {
  transactions: Transaction[];
  hasMore: boolean;
  isLoading: boolean;
  updateCategory: (category: Partial<Category>) => Promise<void>;
  upsertNewFeedCount: (key: string, count: number) => void;
  setNewFeedCount: SetterOrUpdater<FeedCount>;
  newFeedCount: FeedCount | null;
}

export const FilterKeys: string[] = [
  'department',
  'category',
  'vendor',
  'rootDepartment',
  'month',
  'year',
];

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
      await errorHandler(error);
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
        await errorHandler(error);
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
    // getTransactions().then();
  }, [getTransactions]);

  return {
    transactions,
    hasMore,
    isLoading,
    newFeedCount,
    upsertNewFeedCount,
    setNewFeedCount,
    updateCategory,
  };
}

/**
 * Subscribe events from Feed channel
 */
export enum FeedChannelEvents {
  NEW_ITEM = 'new-item',
}

export type FeedEventData = {
  id: number;
};

export function useFeedChannel(
  eventName: FeedChannelEvents,
  callback: (data: FeedEventData) => void,
): void {
  const pusher = usePusher();
  const identity = useIdentity();
  const channelName = `feed-${identity?.id}`;
  // for notifications, channel name will be like notification-${userId}

  useEffect(() => {
    // Subscribe feed channel
    const channel = pusher.subscribe(channelName);
    channel.bind(eventName, callback);
    return () => {
      channel.unbind(eventName, callback);
    };
  }, []);
}
