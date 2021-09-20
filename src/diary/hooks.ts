import React from 'react';
import { useSetRecoilState, useRecoilValue, useRecoilState } from 'recoil';
import {
  activityFilterState,
  filteredActivitiesState,
  tagListRereshFlag,
  tagListState,
} from './states';
import { Activity, ActivityFilterModel } from './types';

interface Refresh {
  (): void;
}

export function useActivityList(): [Activity[], number] {
  const result = useRecoilValue(filteredActivitiesState);
  const setRefreshFlag = useSetRecoilState(activityFilterState);
  const refresh = React.useCallback(
    () => setRefreshFlag((flag) => ({ ...flag })),
    [setRefreshFlag],
  );
  // invalidate list when component is unmounted
  React.useEffect(() => refresh, [refresh]);
  return result;
}

export function useRefreshActivityList(): [ActivityFilterModel, Refresh] {
  const [refreshFlag, setRefreshFlag] = useRecoilState(activityFilterState);
  const refresh = React.useCallback(
    () => setRefreshFlag((flag) => ({ ...flag })),
    [setRefreshFlag],
  );
  return [refreshFlag, refresh];
}

export function useTagList(): string[] {
  const tagList = useRecoilValue(tagListState);
  const setRefreshFlag = useSetRecoilState(tagListRereshFlag);
  const refresh = React.useCallback(() => setRefreshFlag(Date.now()), [setRefreshFlag]);
  // invalidate list when component is unmounted
  React.useEffect(() => refresh, [refresh]);
  return tagList;
}
