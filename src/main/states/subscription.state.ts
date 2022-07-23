import { Subscription } from '@/main/entity';
import { atom, selector } from 'recoil';
import { SubscriptionApis } from '@/subscription/apis';

export const subscriptionState = atom<Subscription>({
  key: 'main/subscription',
  default: selector({
    key: 'main/subscription/default',
    get: async () => {
      try {
        return await SubscriptionApis.get();
      } catch {
        return {
          departments: [],
          categories: [],
          vendors: [],
        };
      }
    },
  }),
});
