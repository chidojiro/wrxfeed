import { Discussion } from '@main/entity';
import { discussionFilterState, discussionSelector } from '@main/states/discussion.state';
import { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface DiscussionHookValues {
  discussions: Discussion[];
}

export function useDiscussion(): DiscussionHookValues {
  const result = useRecoilValue(discussionSelector);
  const setRefreshFlag = useSetRecoilState(discussionFilterState);
  const refresh = useCallback(() => setRefreshFlag((flag) => ({ ...flag })), [setRefreshFlag]);
  useEffect(() => refresh, [refresh]);
  return { discussions: result };
}
