import React, { useRef } from 'react';
import Pusher from 'pusher-js';
import PusherContext from './PusherContext';
import { Children } from '@/common/types';
import { PUSHER_APP_CLUSTER, PUSHER_APP_KEY } from '@/env';

export const PusherProvider: React.FC<Children> = ({ children }) => {
  const pusherRef = useRef<Pusher>(
    new Pusher(PUSHER_APP_KEY, {
      cluster: PUSHER_APP_CLUSTER,
    }),
  );

  return <PusherContext.Provider value={pusherRef?.current}>{children}</PusherContext.Provider>;
};
