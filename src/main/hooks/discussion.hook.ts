import { useApi } from '@api';
import { Pagination } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { Discussion } from '@main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface DiscussionHookValues {
  discussions: Discussion[];
  hasMore: boolean;
  isLoading: boolean;
}
export function useDiscussion(pagination: Pagination): DiscussionHookValues {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getDiscussions(pagination);
      console.log(`Check res = ${JSON.stringify(res)}`);
      setDiscussions((prevTrans) => [...prevTrans, ...res]);
      setHasMore(!!res.length);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get discussions');
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  }, [ApiClient, errorHandler, pagination]);

  useEffect(() => {
    getTransactions().then();
  }, [getTransactions]);
  return { discussions, hasMore, isLoading };
}
