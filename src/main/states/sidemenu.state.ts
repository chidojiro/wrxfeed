import { MainGroups, MainMenu } from '@common/constants';
import { GroupTab, LeftTab } from '@common/types';
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
  default: {},
});
