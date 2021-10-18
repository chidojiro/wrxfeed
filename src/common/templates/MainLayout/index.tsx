import React from 'react';
import { GroupTab } from '@common/types';
import { FeedIcon, DirectoryIcon } from '@assets/index';
import LeftStaticSideBar from './LeftStaticSideBar';
import HeaderBar from './HeaderBar';
import TargetRightPanel from './TargetRightPanel';

export interface MainLayoutProps {
  companyName: string;
  boxStyle?: React.CSSProperties;
}

const groupTabs: GroupTab[] = [
  {
    name: 'Feed',
    icon: FeedIcon,
    tabs: [
      { name: 'Company', href: '/overview', icon: null, isHome: true },
      { name: 'For you', href: '/discussions', icon: null },
    ],
  },
  {
    name: 'Directory',
    icon: DirectoryIcon,
    tabs: [
      { name: 'Departments', href: '/departments', icon: null },
      { name: 'Categories', href: '/categories', icon: null },
      { name: 'Vendors', href: '/vendors', icon: null },
    ],
  },
];

const MainLayout: React.FC<MainLayoutProps> = ({ companyName, children, boxStyle }) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-200">
      <HeaderBar title={companyName} showSearchBar />
      <div className="flex flex-1 ">
        <LeftStaticSideBar groupTabs={groupTabs} />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="flex flex-1 h-full pl-4" style={boxStyle}>
              {children}
            </div>
          </main>
        </div>
        <div className="hidden xl:flex xl:flex-shrink-0" style={{ width: '360px' }}>
          <TargetRightPanel />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
