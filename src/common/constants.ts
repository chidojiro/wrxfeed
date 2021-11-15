import { GroupTab } from '@common/types';
import { FeedIcon, DirectoryIcon } from '@assets/index';

export enum MainGroups {
  Feeds = 'Feeds',
  Directories = 'Directories',
}

export const MainMenu: GroupTab[] = [
  {
    name: MainGroups.Feeds,
    icon: FeedIcon,
    tabs: [
      { name: 'Company', location: { pathname: '/overview' }, icon: null },
      {
        name: 'For you',
        location: { pathname: '/for-you' },
        icon: null,
        isShowCounter: true,
      },
    ],
  },
  {
    name: MainGroups.Directories,
    icon: DirectoryIcon,
    tabs: [
      { name: 'Teams', location: { pathname: '/departments' }, icon: null },
      { name: 'Categories', location: { pathname: '/categories' }, icon: null },
      { name: 'Vendors', location: { pathname: '/vendors' }, icon: null },
    ],
  },
];
