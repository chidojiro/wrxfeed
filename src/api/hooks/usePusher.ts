import React from 'react';
import Pusher from 'pusher-js';
import PusherContext from '@api/contexts/PusherContext';

export default function usePusher(): Pusher {
  const contextVal = React.useContext(PusherContext);
  if (!contextVal) {
    throw new Error('This component must be used inside a <PusherProvider> component.');
  }
  return contextVal;
}
