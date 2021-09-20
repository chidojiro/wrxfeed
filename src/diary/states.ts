import { selector, atom } from 'recoil';
import { getApiClient } from '../api';
import { Activity, ActivityFilterModel, TimeRange } from './types';

export const activityFilterState = atom<ActivityFilterModel>({
  key: 'diary/activityFilter',
  default: {
    text: '',
    tags: [],
    timeRange: TimeRange.ThisMonth,
    from: new Date(),
    to: new Date(),
    page: 1,
    pageSize: 10,
  },
});

export const filteredActivitiesState = selector<[Activity[], number]>({
  key: 'diary/activities', // unique ID (with respect to other atoms/selectors)
  get: async ({ get }) => {
    const apiClient = await getApiClient();
    const filter = get(activityFilterState);
    return apiClient.searchActivities(filter);
  },
});

export const tagListRereshFlag = atom<number>({
  key: 'diary/refresh-tags',
  default: 0,
});

export const tagListState = selector<string[]>({
  key: 'diary/tags', // unique ID (with respect to other atoms/selectors)
  get: async ({ get }) => {
    get(tagListRereshFlag);
    const apiClient = await getApiClient();
    return apiClient.getTags();
  },
});
