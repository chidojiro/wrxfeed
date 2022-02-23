import { useCallback, useEffect, useState } from 'react';

import { useApi } from '@api';
import { FeedItemFilters } from '@api/types';
import { TransLineItem } from '@main/entity';

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

  const getLineItems = useCallback(async () => {
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
      // await errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [ApiClient, filter]);

  useEffect(() => {
    getLineItems().then();
  }, [getLineItems]);
  return {
    lineItems,
    hasMore,
    isLoading,
  };
}
