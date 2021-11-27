import { useApi } from '@api';
import { Pagination } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { FeedItem } from '@main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface FeedHookValues {
  feeds: FeedItem[];
  hasMore: boolean;
  isLoading: boolean;
}
export function useFeed(page: Pagination): FeedHookValues {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getFeeds = useCallback(async () => {
    try {
      setLoading(true);
      if (page?.limit) {
        const res = await ApiClient.getFeeds(page);
        if (page?.offset) {
          setFeeds((prevTrans) => [...prevTrans, ...res]);
        } else {
          setFeeds(res);
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
    getFeeds().then();
  }, [getFeeds]);
  return {
    feeds,
    hasMore,
    isLoading,
  };
}
