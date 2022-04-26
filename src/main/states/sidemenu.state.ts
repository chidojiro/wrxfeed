import cloneDeep from 'lodash.clonedeep';
import { atom, selector } from 'recoil';

import { Category, Department, Subscription, Vendor } from '@main/entity';
import { MainGroups, MainMenu } from '@common/constants';
import { GroupTab, LeftTab } from '@common/types';
import { ENABLE_SUBSCRIPTION_SIDE_BAR } from '@src/config';

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
              search: `?route=${MainGroups.Feeds}`,
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
  default: { '/company': 0, '/for-you': 0 },
});
