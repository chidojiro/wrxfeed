import { useApi } from '@api';
import { Pagination } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { Notification } from '@main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface NotificationHookValues {
  notifications: Notification[];
  hasMore: boolean;
  isLoading: boolean;
  patchNotification: (id: number) => Promise<void>;
  clear: () => void;
}
export function useNotification(page: Pagination): NotificationHookValues {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const patchNotification = async (id: number) => {
    try {
      const res = await ApiClient.patchNotification(id);
      console.log({ res });
      console.log({ notifications });
      console.log(`Check id = ${id}`);
      const newNotifies = notifications.filter((item) => item.data.commentId !== id);
      console.log({ newNotifies });
      setNotifications(newNotifies);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not patch notification!');
      } else {
        await errorHandler(error);
      }
    }
  };

  const getTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getNotifications(page);
      setNotifications((prevTrans) => [...prevTrans, ...res]);
      setHasMore(!!res.length);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get notifications');
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  }, [ApiClient, errorHandler, page]);

  const clear = useCallback(async () => {
    setNotifications([]);
  }, []);

  useEffect(() => {
    getTransactions().then();
  }, [getTransactions]);
  return { notifications, hasMore, isLoading, patchNotification, clear };
}
