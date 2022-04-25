import { GroupTab } from '@common/types';
import { FeedIcon, DirectoryIcon, Bank, CategoryIcon, TeamIcon } from '@assets/index';
import { LineChartData } from '@main/types';

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
        name: 'For you',
        location: { pathname: '/for-you' },
        icon: FeedIcon,
        isShowCounter: true,
      },
      {
        name: 'Company',
        location: { pathname: '/company' },
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

export const defaultTargetMonths = [
  {
    month: 1,
    amount: 0,
  },
  {
    month: 2,
    amount: 0,
  },
  {
    month: 3,
    amount: 0,
  },
  {
    month: 4,
    amount: 0,
  },
  {
    month: 5,
    amount: 0,
  },
  {
    month: 6,
    amount: 0,
  },
  {
    month: 7,
    amount: 0,
  },
  {
    month: 8,
    amount: 0,
  },
  {
    month: 9,
    amount: 0,
  },
  {
    month: 10,
    amount: 0,
  },
  {
    month: 11,
    amount: 0,
  },
  {
    month: 12,
    amount: 0,
  },
];

export const monthsInYear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const INITIAL_CHART_DATA: LineChartData = {
  data: [],
  lines: [],
  legends: [],
  maxValue: 0,
};
