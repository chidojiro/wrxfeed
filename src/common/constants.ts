import { GroupTab } from '@common/types';
import { FeedIcon, DirectoryIcon } from '@assets/index';

export const Departments = {
  Administration: 'Administration',
  Marketing: 'Marketing',
  Purchasing: 'Purchasing',
  HumanResources: 'Human Resources',
  Shipping: 'Shipping',
  IT: 'IT',
  PublicRelations: 'Public Relations',
  Sales: 'Sales',
  Executive: 'Executive',
  Finance: 'Finance',
  Treasury: 'Treasury',
  CorporateTax: 'Corporate tax',
};

export const MainMenu: GroupTab[] = [
  {
    name: 'Feed',
    icon: FeedIcon,
    tabs: [{ name: 'Company', href: '/overview', icon: null }],
  },
  {
    name: 'Directory',
    icon: DirectoryIcon,
    tabs: [
      { name: 'Teams', href: '/departments', icon: null },
      { name: 'Categories', href: '/categories', icon: null },
      { name: 'Vendors', href: '/vendors', icon: null },
    ],
  },
];
