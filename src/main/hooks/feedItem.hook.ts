import { useApi } from '@api';
import { FeedItemFilters } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { TransLineItem } from '@main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface FeedItemHookValues {
  lineItems: TransLineItem[];
  hasMore: boolean;
  isLoading: boolean;
}
export function useFeedItem(filter: FeedItemFilters): FeedItemHookValues {
  const [lineItems, setLineItems] = useState<TransLineItem[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getTransactions = useCallback(async () => {
    try {
      setLoading(true);
      if (filter?.page?.limit) {
        const res = await ApiClient.getFeedLineItems(filter);
        if (filter?.page?.offset) {
          setLineItems((prevTrans) => [...prevTrans, ...res]);
        } else {
          setLineItems(res);
        }
        setHasMore(res.length >= filter.page.limit);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error("Can't get line items 🤦!");
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
    lineItems,
    hasMore,
    isLoading,
  };
}
