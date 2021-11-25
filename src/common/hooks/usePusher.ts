/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Pusher from 'pusher-js';
import { PUSHER_APP_KEY, PUSHER_APP_CLUSTER, PUSHER_EVENT_KEYS } from '../../config';

export type ItemData = {
  id: number;
};

interface PusherHookValues {
  newData: ItemData;
}

export function usePusher(channelId: string): PusherHookValues {
  const [newData, setNewData] = React.useState({ id: 0 });
  const pusher = new Pusher(PUSHER_APP_KEY, {
    cluster: PUSHER_APP_CLUSTER,
  });

  React.useEffect(() => {
    const channel = pusher.subscribe(channelId);
    channel.bind(PUSHER_EVENT_KEYS.NEW_ITEM, (data: ItemData) => {
      setNewData(data);
    });
    return () => {
      channel.unsubscribe();
    };
  }, [channelId]);

  return {
    newData,
  };
}
