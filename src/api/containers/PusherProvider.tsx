import React, { useRef } from 'react';
import Pusher from 'pusher-js';
import PusherContext from '@api/contexts/PusherContext';
import { PUSHER_APP_KEY, PUSHER_APP_CLUSTER } from '@src/config';

export const PusherProvider: React.FC = ({ children }) => {
  const pusherRef = useRef<Pusher>(
    new Pusher(PUSHER_APP_KEY, {
      cluster: PUSHER_APP_CLUSTER,
    }),
  );

  return <PusherContext.Provider value={pusherRef?.current}>{children}</PusherContext.Provider>;
};
