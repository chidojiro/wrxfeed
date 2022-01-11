import { selector, atom } from 'recoil';
import { getApiClient } from '@api/utils';
import { Subscription } from '@main/entity';

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
