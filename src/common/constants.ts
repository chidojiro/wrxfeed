import { SectionTab } from '@/common/types';
import { FeedIcon, Bank, CategoryIcon, TeamIcon, TargetIcon } from '@/assets';
import { LineChartData } from '@/main/types';
import { TargetMonth } from '@/main/entity';

export const ProjectClassNamePrefix = 'gvt-';

export enum MainGroups {
  Feeds = 'Feeds',
  Boards = '',
  Following = '',
}

export const MainMenu: SectionTab[] = [
  {
    name: MainGroups.Boards,
    tabs: [
      {
        name: 'Targets',
        location: { pathname: '/dashboard' },
        icon: TargetIcon,
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
        isOpened: true,
        enable: true,
      },
      {
        name: 'Categories',
        icon: CategoryIcon,
        tabs: [],
        addItemRoute: '/categories',
        isOpened: true,
        enable: false,
      },
      {
        name: 'Vendors',
        icon: Bank,
        tabs: [],
        addItemRoute: '/vendors',
        isOpened: true,
        enable: false,
      },
    ],
  },
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
];

export const monthsInYear = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const defaultTargetMonths: TargetMonth[] = monthsInYear.map((month) => ({ month }));

export const INITIAL_CHART_DATA: LineChartData = {
  data: [],
  lines: [],
  legends: [],
  maxValue: 0,
};

export const ENABLE_GET_FEED_COUNT = false;
