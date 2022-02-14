import { GroupTab } from '@common/types';
import { FeedIcon, DirectoryIcon, Bank, CategoryIcon, TeamIcon } from '@assets/index';

export enum MainGroups {
  Feeds = 'Feeds',
  Teams = 'Teams',
  Directories = 'Directories',
}

export const MainMenu: GroupTab[] = [
  {
    name: MainGroups.Feeds,
    icon: FeedIcon,
    tabs: [
      {
        name: 'Company',
        location: { pathname: '/company' },
        icon: FeedIcon,
        isShowCounter: true,
      },
      {
        name: 'For you',
        location: { pathname: '/for-you' },
        icon: FeedIcon,
        isShowCounter: true,
      },
    ],
  },
  {
    name: MainGroups.Teams,
    icon: TeamIcon,
    tabs: [],
  },
  {
    name: MainGroups.Directories,
    icon: DirectoryIcon,
    tabs: [
      { name: 'Teams', location: { pathname: '/departments' }, icon: TeamIcon },
      { name: 'Categories', location: { pathname: '/categories' }, icon: CategoryIcon },
      { name: 'Vendors', location: { pathname: '/vendors' }, icon: Bank },
    ],
  },
];
