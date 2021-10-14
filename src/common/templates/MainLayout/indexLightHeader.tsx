import React, { useState } from 'react';
import { GroupTab, LeftTab } from '@common/types';
import { FeedIcon, DirectoryIcon } from '@assets/index';
import { SideBarMobile } from './SideBarMobile';
import HeaderWithSearchAndAvatar from './HeaderWithSearchAndAvatar';
import LeftStaticSideBar from './LeftStaticSideBar';

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
      { name: 'Company', href: '#', icon: null },
      { name: 'For you', href: '#', icon: null },
    ],
  },
  {
    name: 'Directory',
    icon: DirectoryIcon,
    tabs: [
      { name: 'Departments', href: '#', icon: null },
      { name: 'Categories', href: '#', icon: null },
      { name: 'Vendors', href: '#', icon: null },
    ],
  },
];

const MainLayout: React.FC<MainLayoutProps> = ({ title, children, boxStyle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<LeftTab>(groupTabs[0].tabs[0]);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-200">
      {/* Sidebar show/hide for mobile */}
      <SideBarMobile
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        groupTabs={groupTabs}
        title={title}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      {/* Static sidebar for desktop */}
      <LeftStaticSideBar
        groupTabs={groupTabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <HeaderWithSearchAndAvatar setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="flex flex-1 h-full pl-4" style={boxStyle}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
