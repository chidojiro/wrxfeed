import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import mixpanel from 'mixpanel-browser';

import { useApi } from '@/api';
import { useErrorHandler } from '@/error/hooks';
import { useIdentity } from '@/identity/hooks';

import { FeedFilters } from '@/api/types';
import { isBadRequest } from '@/error/utils';
import { Category, FeedItem } from '@/main/entity';
import { USE_CONTACT_BUTTON_MESSAGE } from '@/error/errorMessages';
import { FeedApis } from '@/feed/apis';

interface FeedHookValues {
  feeds: FeedItem[];
  hasMore: boolean;
  isLoading: boolean;
  onDeleteSuccess: (feedId: number) => void;
  updateCategory: (category: Partial<Category>) => Promise<void>;
  cleanData: () => void;
}
export function useFeed(filters: FeedFilters): FeedHookValues {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();
  const cleanData = () => setFeeds([]);
  const identity = useIdentity();

  const onDeleteSuccess = (feedId: number) => {
    const indexOfObject = feeds.findIndex((feed) => {
      return feed.target.id === feedId;
    });
    feeds.splice(indexOfObject, 1);
    getFeeds();
  };

  const getFeeds = useCallback(async () => {
    try {
      setLoading(true);
      if (filters?.page?.limit) {
        const res = await ApiClient.getFeeds(filters);
        if (filters?.page?.offset !== 0) {
          setFeeds((prevTrans) => [...prevTrans, ...res]);

          mixpanel.track('Feed Load More', {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ApiClient, errorHandler, filters]);

  const updateCategory = useCallback(
    async (category: Partial<Category>) => {
      try {
        await FeedApis.updateCategory(category);
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
    updateCategory,
    cleanData,
    onDeleteSuccess,
  };
}
