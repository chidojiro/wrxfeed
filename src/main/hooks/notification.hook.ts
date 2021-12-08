/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import { useApi } from '@api';
import usePusher from '@api/hooks/usePusher';
import { Pagination } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { useIdentity } from '@identity/hooks';
import { Notification } from '@main/entity';
import { newNotifyCountState } from '@main/states/notify.state';

interface NotificationHookValues {
  notifications: Notification[];
  hasMore: boolean;
  isLoading: boolean;
  patchNotification: (id: number) => Promise<void>;
  markAllAsRead: () => void;
  isMarkAll: boolean;
  unreadCount: number;
  setNewNotifyCount: SetterOrUpdater<number>;
  newNotifyCount: number;
}

export function useNotification(page: Pagination): NotificationHookValues {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newNotifyCount, setNewNotifyCount] = useRecoilState<number>(newNotifyCountState);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isMarkAll, setMarkAll] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const patchNotification = async (id: number) => {
    try {
      await ApiClient.patchNotification(id);
      const newNotifies = notifications.filter((item) => item.id !== id);
      setNotifications(newNotifies);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not patch notification 🤦!');
      } else {
        await errorHandler(error);
      }
    }
  };

  const getNotifications = useCallback(async () => {
    try {
      setLoading(true);
      if (page?.limit) {
        const res = await ApiClient.getNotifications(page);
        setUnreadCount(res.unreadCount);
        setNewNotifyCount(res.unreadCount);
        if (page?.offset) {
          setNotifications((prevTrans) => [...prevTrans, ...res.notifications]);
        } else {
          setNotifications(res.notifications);
        }
        setHasMore(!!res.notifications.length);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error("Can't get notifications 🤦!");
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  }, [ApiClient, errorHandler, page]);

  const markAllAsRead = async () => {
    try {
      setMarkAll(true);
      await ApiClient.patchAllNotification();
      setUnreadCount(0);
      setNewNotifyCount(0);
      setMarkAll(false);
      // setNotifications([]);
      // toast.success('Mark all notify as read successfully 🙌!');
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error("Can't mark all notify as read 😤!");
      } else {
        await errorHandler(error);
      }
    }
  };

  useEffect(() => {
    getNotifications().then();
  }, [getNotifications]);
  return {
    notifications,
    hasMore,
    isLoading,
    patchNotification,
    markAllAsRead,
    isMarkAll,
    unreadCount,
    newNotifyCount,
    setNewNotifyCount,
  };
}

/**
 * Subscribe events from Notification channel
 * notification-${userId}
 */
export enum NotifyChannelEvents {
  NEW_NOTIFY = 'new-notification',
}

export type NotifyEventData = {
  id: number;
};

export function useNotifyChannel(
  eventName: NotifyChannelEvents,
  callback: (data: NotifyEventData) => void,
): void {
  const pusher = usePusher();
  const identity = useIdentity();
  const channelName = `notification-${identity?.id}`;

  useEffect(() => {
    // Subscribe notify channel
    const channel = pusher.subscribe(channelName);
    channel.bind(eventName, callback);
    return () => {
      channel.unbind(eventName, callback);
    };
  }, []);
}
