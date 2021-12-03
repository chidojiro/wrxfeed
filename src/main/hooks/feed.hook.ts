import { SetterOrUpdater, useRecoilState } from 'recoil';
import { useApi } from '@api';
import { GetFeedsFilters } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { FeedItem } from '@main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FeedCount, newFeedCountState } from '@main/states/sidemenu.state';

interface FeedHookValues {
  feeds: FeedItem[];
  hasMore: boolean;
  isLoading: boolean;
  upsertNewFeedCount: (key: string, count: number) => void;
  setNewFeedCount: SetterOrUpdater<FeedCount>;
  newFeedCount: FeedCount | null;
}
export function useFeed(filters: GetFeedsFilters): FeedHookValues {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [newFeedCount, setNewFeedCount] = useRecoilState<FeedCount>(newFeedCountState);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getFeeds = useCallback(async () => {
    try {
      setLoading(true);
      if (filters?.page.limit) {
        const res = await ApiClient.getFeeds(filters);
        if (filters?.page?.offset) {
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
  }, [ApiClient, errorHandler, filters]);

  const upsertNewFeedCount = (key: string, value: number) => {
    setNewFeedCount({
      ...newFeedCount,
      [key]: value,
    });
  };

  useEffect(() => {
    getFeeds().then();
  }, [getFeeds]);
  return {
    feeds,
    hasMore,
    isLoading,
    upsertNewFeedCount,
    setNewFeedCount,
    newFeedCount,
  };
}
