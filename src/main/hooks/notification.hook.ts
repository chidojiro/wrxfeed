import { useFetcher, useHandler } from '@/common/hooks';
import { isBadRequest } from '@/error/utils';
import { useIdentity } from '@/identity/hooks';
import { Notification } from '@/main/entity';
import { newNotifyCountState } from '@/main/states/notify.state';
import { NotificationApis } from '@/notification/apis';
import { usePusher } from '@/push-notification/usePusher';
import { PaginationParams } from '@/rest/types';
import React from 'react';
import { toast } from 'react-toastify';
import { SetterOrUpdater, useRecoilState } from 'recoil';

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

export function useNotification(page: PaginationParams): NotificationHookValues {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [newNotifyCount, setNewNotifyCount] = useRecoilState<number>(newNotifyCountState);
  const [hasMore, setHasMore] = React.useState<boolean>(false);
  const [isMarkAll, setMarkAll] = React.useState<boolean>(false);
  const [unreadCount, setUnreadCount] = React.useState<number>(0);

  const { handle: patchNotification } = useHandler(
    async (id: number) => {
      await NotificationApis.markAsRead(id);
      const newNotifies = notifications.filter((item) => item.id !== id);
      setNotifications(newNotifies);
    },
    {
      onError: (error) => {
        if (isBadRequest(error)) {
          toast.error('Can not patch notification 🤦!');
          return false;
        }
      },
    },
  );

  const { isInitializing: isLoading } = useFetcher(
    ['notification.hook', page],
    async () => {
      if (page?.limit) {
        const res = await NotificationApis.getList(page);
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
    },
    {
      onError: (error) => {
        if (isBadRequest(error)) {
          toast.error("Can't get notifications 🤦!");
          return false;
        }
      },
    },
  );

  const { handle: markAllAsRead } = useHandler(
    async () => {
      setMarkAll(true);
      await NotificationApis.markAllAsRead();
      setUnreadCount(0);
      setNewNotifyCount(0);
      setMarkAll(false);
    },
    {
      onError: (error) => {
        if (isBadRequest(error)) {
          toast.error("Can't mark all notify as read 😤!");
          return false;
        }
      },
    },
  );

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

  React.useEffect(() => {
    // Subscribe notify channel
    const channel = pusher.subscribe(channelName);
    channel.bind(eventName, callback);
    return () => {
      channel.unbind(eventName, callback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
