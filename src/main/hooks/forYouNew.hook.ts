import React from 'react';
import { usePusher } from '@common/hooks/usePusher';

export type ItemData = {
  id: number;
};

interface PusherHookValues {
  counter: number;
  latestItemId: number;
  readAll: () => void;
}

export function useForYouNew(channelId: string): PusherHookValues {
  const [counter, setCounter] = React.useState(-1);
  const [latestItemId, setLatestItemId] = React.useState(-1);
  const readAll = () => setCounter(0);
  const { newData } = usePusher(channelId);

  React.useEffect(() => {
    setLatestItemId(newData?.id);
    setCounter((prevCounter) => prevCounter + 1);
  }, [newData]);

  return {
    counter,
    latestItemId,
    readAll,
  };
}
