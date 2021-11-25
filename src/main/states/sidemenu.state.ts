import { getApiClient } from '@api/utils';
import { MainGroups, MainMenu } from '@common/constants';
import { GroupTab, LeftTab } from '@common/types';
import { identityState } from '@identity/states';
import { Category, Department, Subscription, Vendor } from '@main/entity';
import cloneDeep from 'lodash.clonedeep';
import { atom, selector } from 'recoil';
import { subscriptionState } from './subscription.state';

export interface FeedCount {
  [key: string]: number;
}

export const menuItemsValue = selector<GroupTab[]>({
  key: 'main/sidemenu',
  get: ({ get }) => {
    const subscription = get(subscriptionState);
    const subscriptionMenuItems = Object.keys(subscription).reduce<LeftTab[]>(
      (list, key) => [
        ...list,
        ...(subscription[key as keyof Subscription]?.map(
          (channel: Department | Category | Vendor): LeftTab => ({
            name: channel.name,
            location: {
              pathname: `/${key}/${channel.id}`,
              search: `?route=${MainGroups.Feeds}`,
            },
            icon: null,
            subscription: {
              type: key as keyof Subscription,
              item: channel,
            },
            removable: true,
            strict: true,
          }),
        ) || []),
      ],
      [],
    );
    const menu = cloneDeep(MainMenu);
    menu[0].tabs.push(...subscriptionMenuItems);
    return menu;
  },
});

export const newFeedCountState = atom<FeedCount>({
  key: 'main/sidemenu/feedcount',
  default: selector({
    key: 'main/sidemenu/feedcount/default',
    get: async ({ get }) => {
      get(identityState);
      try {
        const apiClient = await getApiClient();
        const overviewRequest = apiClient.getUnreadTransactionCount({
          pagination: { offset: 0, limit: 0 },
        });
        const forYouRequest = apiClient.getUnreadTransactionCount({
          forYou: true,
          pagination: { offset: 0, limit: 0 },
        });
        const [overviewCount, forYouCount] = await Promise.all([overviewRequest, forYouRequest]);
        return {
          '/overview': overviewCount ?? 0,
          '/for-you': forYouCount ?? 0,
        };
      } catch {
        return { '/overview': 0, '/for-you': 0 };
      }
    },
  }),
});
