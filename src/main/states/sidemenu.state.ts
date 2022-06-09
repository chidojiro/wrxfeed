import cloneDeep from 'lodash.clonedeep';
import { atom, selector } from 'recoil';

import { Category, Department, Subscription, Vendor } from '@main/entity';
import { MainGroups, MainMenu } from '@common/constants';
import { LeftTab, SectionTab } from '@common/types';

import { TeamIcon } from '@assets/index';
import { subscriptionState } from './subscription.state';

export interface FeedCount {
  [key: string]: number;
}

export const getTabFromSub = (
  items: Department[] | Category[] | Vendor[],
  key: string,
): LeftTab[] => {
  const tabs: LeftTab[] = items?.map((channel: Department | Category | Vendor) => {
    return {
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
    };
  });
  return tabs;
};

export const menuItemsValue = atom<SectionTab[]>({
  key: 'main/sidemenu',
  default: selector({
    key: 'main/sidemenu/default',
    get: ({ get }) => {
      const menu = cloneDeep(MainMenu);
      const subscription: Subscription = get(subscriptionState);
      menu[2].groups[0].tabs?.push(...getTabFromSub(subscription.departments ?? [], 'departments'));
      menu[2].groups[1].tabs?.push(...getTabFromSub(subscription.categories ?? [], 'categories'));
      menu[2].groups[2].tabs?.push(...getTabFromSub(subscription.vendors ?? [], 'vendors'));
      return menu;
    },
  }),
});

export const newFeedCountState = atom<FeedCount>({
  key: 'main/sidemenu/feedcount',
  default: { '/company': 0, '/for-you': 0 },
});
