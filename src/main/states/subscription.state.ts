import { getApiClient } from '@api/utils';
import { Subscription } from '@main/entity';
import { selector, atom } from 'recoil';

export const subscriptionState = atom<Subscription>({
  key: 'main/subscription',
  default: selector({
    key: 'main/subscription/default',
    get: async () => {
      try {
        const apiClient = await getApiClient();
        return await apiClient.getSubscriptions();
      } catch {
        return {};
      }
    },
  }),
});
