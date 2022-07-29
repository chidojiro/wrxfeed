import { Profile } from '@/profile/types';
import React from 'react';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { refreshProfileFlag, profileState } from './states';

interface Refresh {
  (): void;
}

export function useProfile(): Profile {
  const result = useRecoilValue(profileState);
  const setRefreshFlag = useSetRecoilState(refreshProfileFlag);
  const refresh = React.useCallback(() => setRefreshFlag(() => Date.now()), [setRefreshFlag]);
  // invalidate list when component is unmounted
  React.useEffect(() => refresh, [refresh]);
  return result;
}

export function useRefreshProfile(): [number, Refresh] {
  const [refreshFlag, setRefreshFlag] = useRecoilState(refreshProfileFlag);
  const refresh = React.useCallback(() => setRefreshFlag(() => Date.now()), [setRefreshFlag]);
  return [refreshFlag, refresh];
}
