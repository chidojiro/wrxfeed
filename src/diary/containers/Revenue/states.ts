import { selector } from 'recoil';
import { getApiClient } from '../../../api';
import { activityFilterState } from '../../states';
import { Revenue } from '../../types';

export const revenueState = selector<Revenue>({
  key: 'diary/revenue', // unique ID (with respect to other atoms/selectors)
  get: async ({ get }) => {
    const filter = get(activityFilterState);
    const apiClient = await getApiClient();
    return apiClient.getRevenue(filter);
  },
});
