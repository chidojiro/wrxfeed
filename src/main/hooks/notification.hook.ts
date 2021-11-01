import { useApi } from '@api';
import { Pagination } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { Notification } from '@main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { NOTI_SSE_ENDPOINT } from '@src/config';

enum NotiTypes {
  MENTION = 'MENTION',
  COMMENT = 'COMMENT',
}

interface NotificationHookValues {
  notifications: Notification[];
  hasMore: boolean;
  isLoading: boolean;
  patchNotification: (id: number) => Promise<void>;
  clear: () => void;
  markAllAsRead: () => void;
  isMarkAll: boolean;
}
export function useNotification(page: Pagination): NotificationHookValues {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isMarkAll, setMarkAll] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const patchNotification = async (id: number) => {
    try {
      await ApiClient.patchNotification(id);
      const newNotifies = notifications.filter((item) => item.id !== id);
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

  const getRealtimeNoti = useCallback(
    (data: Notification) => {
      switch (data?.type) {
        case NotiTypes.MENTION: {
          setNotifications((prev) => [data, ...prev]);
          break;
        }
        case NotiTypes.COMMENT: {
          setNotifications((prev) => [data, ...prev]);
          break;
        }
        default:
          break;
      }
    },
    [setNotifications],
  );

  const markAllAsRead = async () => {
    try {
      setMarkAll(true);
      await ApiClient.patchAllNotification();
      setMarkAll(false);
      setNotifications([]);
      toast.success('Mark all notify as read successfully!');
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error("Can't mark all notify as read!");
      } else {
        await errorHandler(error);
      }
    }
  };

  // Listen EventStream
  useEffect(() => {
    const sse = new EventSource(NOTI_SSE_ENDPOINT, { withCredentials: true });
    sse.onmessage = (e) => getRealtimeNoti(JSON.parse(e.data));
    sse.onerror = () => {
      sse.close();
    };
    return () => {
      sse.close();
    };
  }, [getRealtimeNoti]);

  useEffect(() => {
    getTransactions().then();
  }, [getTransactions]);
  return { notifications, hasMore, isLoading, patchNotification, clear, markAllAsRead, isMarkAll };
}
