import { User } from '@main/entity';
import { mentionFilterState, mentionSelector } from '@main/states/mention.state';
import { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

interface MentionHookValues {
  mentions: User[];
}

export function useMention(): MentionHookValues {
  const result = useRecoilValue(mentionSelector);
  const setRefreshFlag = useSetRecoilState(mentionFilterState);
  const refresh = useCallback(() => setRefreshFlag((flag) => ({ ...flag })), [setRefreshFlag]);
  useEffect(() => refresh, [refresh]);
  return { mentions: result };
}
