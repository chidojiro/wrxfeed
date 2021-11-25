import React from 'react';
import Pusher from 'pusher-js';
import { PUSHER_APP_KEY, PUSHER_APP_CLUSTER, PUSHER_EVENT_KEYS } from '../../config';

export type ItemData = {
  id: number;
};

interface PusherHookValues {
  counter: number;
  latestItemId: number;
}
export function usePusher(channelId: string): PusherHookValues {
  const [counter, setCounter] = React.useState(0);
  const [latestItemId, setLatestItemId] = React.useState(-1);

  React.useEffect(() => {
    const pusher = new Pusher(PUSHER_APP_KEY, {
      cluster: PUSHER_APP_CLUSTER,
    });
    const channel = pusher.subscribe(channelId);
    channel.bind(PUSHER_EVENT_KEYS.NEW_ITEM, (data: ItemData) => {
      setLatestItemId(data.id);
      setCounter(counter + 1);
    });
  }, [channelId, counter]);

  return {
    counter,
    latestItemId,
  };
}
