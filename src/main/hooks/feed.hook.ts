import { useApi } from '@api';
import { Pagination } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { FeedItem } from '@main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface FeedHookValues {
  feedItems: FeedItem[];
  hasMore: boolean;
  isLoading: boolean;
}
export function useFeed(page: Pagination): FeedHookValues {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getFeedItems = useCallback(async () => {
    try {
      setLoading(true);
      if (page?.limit) {
        const res = await ApiClient.getFeedItems(page);
        if (page?.offset) {
          setFeedItems((prevTrans) => [...prevTrans, ...res]);
        } else {
          setFeedItems(res);
        }
        setHasMore(!!res.length);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error("Can't get feed items 🤦!");
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  }, [ApiClient, errorHandler, page]);

  useEffect(() => {
    getFeedItems().then();
  }, [getFeedItems]);
  return {
    feedItems,
    hasMore,
    isLoading,
  };
}
