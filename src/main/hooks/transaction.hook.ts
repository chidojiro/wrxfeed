/* eslint-disable react-hooks/exhaustive-deps */
import usePusher from '@/api/hooks/usePusher';
import { useIdentity } from '@/identity/hooks';
import React from 'react';

export const FilterKeys: string[] = [
  'department',
  'category',
  'vendor',
  'rootDepartment',
  'month',
  'year',
];

/**
 * Subscribe events from Feed channel
 */
export enum FeedChannelEvents {
  NEW_ITEM = 'new-item',
}

export type FeedEventData = {
  id: number;
};

export function useFeedChannel(
  eventName: FeedChannelEvents,
  callback: (data: FeedEventData) => void,
): void {
  const pusher = usePusher();
  const identity = useIdentity();
  const channelName = `feed-${identity?.id}`;
  // for notifications, channel name will be like notification-${userId}

  React.useEffect(() => {
    // Subscribe feed channel
    const channel = pusher.subscribe(channelName);
    channel.bind(eventName, callback);
    return () => {
      channel.unbind(eventName, callback);
    };
  }, []);
}
