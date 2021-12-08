import { SetterOrUpdater, useRecoilState } from 'recoil';
import { useApi } from '@api';
import { GetFeedsFilters } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { Category, FeedItem } from '@main/entity';
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
  updateCategory: (category: Partial<Category>) => Promise<void>;
  cleanData: () => void;
}
export function useFeed(filters: GetFeedsFilters): FeedHookValues {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [newFeedCount, setNewFeedCount] = useRecoilState<FeedCount>(newFeedCountState);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();
  const cleanData = () => setFeeds([]);

  const getFeeds = useCallback(async () => {
    try {
      setLoading(true);
      if (filters?.page?.limit) {
        // clear old feed if when get new category or department
        // if (filters?.page?.offset === 0) {
        //   setFeeds([]);
        // }
        const res = await ApiClient.getFeeds(filters);
        if (filters?.page?.offset !== 0) {
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

  const updateCategory = useCallback(
    async (category: Partial<Category>) => {
      try {
        await ApiClient.updateCategory(category);
        // Update current feeds
        setFeeds((prev) => {
          const newFeeds = prev.map((item) => {
            if (item?.category?.id !== category.id) return item;
            return {
              ...item,
              category: {
                ...item?.category,
                ...category,
              },
            };
          });
          return newFeeds;
        });
      } catch (error) {
        if (isBadRequest(error)) {
          toast.error('Can not update category!');
        } else {
          await errorHandler(error);
        }
      }
    },
    [ApiClient, errorHandler],
  );

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
    updateCategory,
    cleanData,
  };
}
