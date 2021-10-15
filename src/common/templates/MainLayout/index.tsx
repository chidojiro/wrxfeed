import React from 'react';
import { GroupTab } from '@common/types';
import { FeedIcon, DirectoryIcon } from '@assets/index';
import LeftStaticSideBar from './LeftStaticSideBar';
import HeaderBar from './HeaderBar';
// import RightPanel from './RightPanel';

// const SIDEBAR_WIDTH = 212;

export interface MainLayoutProps {
  title: string;
  boxStyle?: React.CSSProperties;
}

const groupTabs: GroupTab[] = [
  {
    name: 'Feed',
    icon: FeedIcon,
    tabs: [
      { name: 'Company', href: '/overview', icon: null, isHome: true },
      { name: 'For you', href: '#', icon: null },
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

const MainLayout: React.FC<MainLayoutProps> = ({ title, children, boxStyle }) => {
  // const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-200">
      <HeaderBar title={title} />
      <div className="flex flex-1">
        <LeftStaticSideBar groupTabs={groupTabs} />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="flex flex-1 h-full pl-4" style={boxStyle}>
              {children}
            </div>
          </main>
        </div>
        {/* <div className="grid">
          <RightPanel />
        </div> */}
      </div>
    </div>
  );
};

export default MainLayout;
