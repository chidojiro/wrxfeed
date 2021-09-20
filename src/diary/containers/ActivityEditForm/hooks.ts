import React from 'react';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import { Activity } from '../../types';
import { activityDetailState, refreshActivityFlag } from './states';

interface Refresh {
  (): void;
}

export function useActivityDetail(id: string): Activity {
  const result = useRecoilValue(activityDetailState(id));
  const setRefreshFlag = useSetRecoilState(refreshActivityFlag);
  const refresh = React.useCallback(() => setRefreshFlag(() => Date.now()), [setRefreshFlag]);
  // invalidate list when component is unmounted
  React.useEffect(() => refresh, [refresh]);
  return result;
}

export function useRefreshActivityDetail(): [number, Refresh] {
  const [refreshFlag, setRefreshFlag] = useRecoilState(refreshActivityFlag);
  const refresh = React.useCallback(() => setRefreshFlag(() => Date.now()), [setRefreshFlag]);
  return [refreshFlag, refresh];
}
