import { SetterOrUpdater, useRecoilState } from 'recoil';

import { FeedCount, newFeedCountState } from '@main/states/sidemenu.state';

interface NewFeedCountHookValues {
  upsertNewFeedCount: (key: string, count: number) => void;
  setNewFeedCount: SetterOrUpdater<FeedCount>;
  newFeedCount: FeedCount | null;
}
export function useNewFeedCount(): NewFeedCountHookValues {
  const [newFeedCount, setNewFeedCount] = useRecoilState<FeedCount>(newFeedCountState);

  const upsertNewFeedCount = (key: string, value: number) => {
    setNewFeedCount({
      ...newFeedCount,
      [key]: value,
    });
  };

  return {
    upsertNewFeedCount,
    setNewFeedCount,
    newFeedCount,
  };
}
