import cloneDeep from 'lodash.clonedeep';
import { atom, selector } from 'recoil';

import { Category, Department, Subscription, Vendor } from '@main/entity';
import { getApiClient } from '@api/utils';
import { MainGroups, MainMenu } from '@common/constants';
import { GroupTab, LeftTab } from '@common/types';
import { ENABLE_SUBSCRIPTION_SIDE_BAR } from '@src/config';

import { identityState } from '@identity/states';
import { TeamIcon } from '@assets/index';
import { subscriptionState } from './subscription.state';

export interface FeedCount {
  [key: string]: number;
}

export const menuItemsValue = selector<GroupTab[]>({
  key: 'main/sidemenu',
  get: ({ get }) => {
    const menu = cloneDeep(MainMenu);
    if (!ENABLE_SUBSCRIPTION_SIDE_BAR) return menu;
    const subscription = get(subscriptionState);
    const subscriptionMenuItems = Object.keys(subscription).reduce<LeftTab[]>(
      (list, key) => [
        ...list,
        ...(subscription[key as keyof Subscription]?.map(
          (channel: Department | Category | Vendor): LeftTab => ({
            name: channel.name,
            location: {
              pathname: `/${key}/${channel.id}`,
              search: `?route=${MainGroups.Teams}`,
            },
            icon: TeamIcon,
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
    // push to "Teams" group
    menu[1].tabs.push(...subscriptionMenuItems);
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
        const companyRequest = apiClient.getUnreadLineItemsCount({
          page: { offset: 0, limit: 1 },
        });
        const forYouRequest = apiClient.getUnreadLineItemsCount({
          forYou: 1,
          page: { offset: 0, limit: 1 },
        });
        const [companyCount, forYouCount] = await Promise.all([companyRequest, forYouRequest]);
        return {
          '/company': companyCount ?? 0,
          '/for-you': forYouCount ?? 0,
        };
      } catch {
        return { '/company': 0, '/for-you': 0 };
      }
    },
  }),
});
