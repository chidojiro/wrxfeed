import { USE_CONTACT_BUTTON_MESSAGE } from '@/error/errorMessages';
import { useErrorHandler } from '@/error/hooks';
import { isBadRequest } from '@/error/utils';
import { FeedApis } from '@/feed/apis';
import { GetFeedsParams } from '@/feed/types';
import { useIdentity } from '@/identity/hooks';
import { Category, FeedItem } from '@/main/entity';
import mixpanel from 'mixpanel-browser';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface FeedHookValues {
  feeds: FeedItem[];
  hasMore: boolean;
  isLoading: boolean;
  onDeleteSuccess: (feedId: number) => void;
  updateCategory: (category: Partial<Category>) => Promise<void>;
  cleanData: () => void;
}
export function useFeed(filters: GetFeedsParams): FeedHookValues {
  const [feeds, setFeeds] = useState<FeedItem[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
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
      if (filters?.limit) {
        const res = await FeedApis.getList(filters);
        if (filters?.offset !== 0) {
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
        setHasMore(!!filters && filters?.limit <= res.length);
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
  }, [errorHandler, filters]);

  const updateCategory = useCallback(
    async (category: Partial<Category>) => {
      try {
        await FeedApis.updateCategory(category.id!, category);
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
    [errorHandler],
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
