import { SetterOrUpdater, useRecoilState } from 'recoil';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useApi } from '@api';
import { useErrorHandler } from '@error/hooks';

import { FeedCount, newFeedCountState } from '@main/states/sidemenu.state';

import { FeedFilters } from '@api/types';
import { isBadRequest } from '@error/utils';
import { Category, FeedItem } from '@main/entity';
import { USE_CONTACT_BUTTON_MESSAGE } from '@error/errorMessages';

import mixpanel from 'mixpanel-browser';
import { useIdentity } from '@identity/hooks';

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
export function useFeed(filters: FeedFilters): FeedHookValues {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [newFeedCount, setNewFeedCount] = useRecoilState<FeedCount>(newFeedCountState);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();
  const cleanData = () => setFeeds([]);
  const identity = useIdentity();

  const getFeeds = useCallback(async () => {
    try {
      setLoading(true);
      if (filters?.page?.limit) {
        const res = await ApiClient.getFeeds(filters);
        if (filters?.page?.offset !== 0) {
          setFeeds((prevTrans) => [...prevTrans, ...res]);

          mixpanel.track('Feed View', {
            source: 'Feed Load More',
            user_id: identity?.id,
            email: identity?.email,
            company: identity?.company?.id,
            total_feed_items: res.length,
          });
        } else {
          setFeeds(res);
        }
        setHasMore(!!filters.page && filters.page?.limit <= res.length);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error(USE_CONTACT_BUTTON_MESSAGE);
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
