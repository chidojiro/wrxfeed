import { usePusher } from '@/push-notification/usePusher';
import { useProfile } from '@/profile/useProfile';
import React from 'react';

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
  const { profile } = useProfile();
  const channelName = `feed-${profile?.id}`;
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
