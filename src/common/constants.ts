import { SectionTab } from '@common/types';
import { FeedIcon, Bank, CategoryIcon, TeamIcon } from '@assets/index';
import { LineChartData } from '@main/types';

export enum MainGroups {
  Feeds = 'Feeds',
  Following = 'Following',
}

export const MainMenu: SectionTab[] = [
  {
    name: MainGroups.Feeds,
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
    groups: [],
  },
  {
    name: MainGroups.Following,
    tabs: [],
    groups: [
      {
        name: 'Teams',
        icon: TeamIcon,
        tabs: [],
        addItemRoute: '/departments',
      },
      {
        name: 'Categories',
        icon: CategoryIcon,
        tabs: [],
        addItemRoute: '/categories',
      },
      {
        name: 'Vendors',
        icon: Bank,
        tabs: [],
        addItemRoute: '/vendors',
      },
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
