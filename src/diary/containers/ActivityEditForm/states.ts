import { atom, selectorFamily } from 'recoil';
import { getApiClient } from '../../../api';
import { Activity } from '../../types';

export const refreshActivityFlag = atom<number>({
  key: 'diary/load-activity',
  default: 0,
});

export const activityDetailState = selectorFamily<Activity, string>({
  key: 'diary/activity',
  get:
    (activityId) =>
    async ({ get }) => {
      get(refreshActivityFlag);
      const apiClient = await getApiClient();
      return apiClient.getActivity(activityId);
    },
});
