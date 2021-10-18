import React from 'react';
import ReactDOM from 'react-dom';
import SideBar from './SideBar';
import NavBar from './NavBar';

// const SIDEBAR_WIDTH = 212;

export interface MainLayoutProps {
  companyName: string;
  boxStyle?: React.CSSProperties;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  // const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="relative min-h-screen">
      {/* <HeaderBar title={companyName} /> */}
      <NavBar />
      <div className="pt-24 pb-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-2 xl:col-span-2">
            <SideBar />
          </div>

          <main className="relative lg:col-span-10 xl:col-span-7">{children}</main>

          <aside id="main-right-side" className="hidden xl:block xl:col-span-3" />
          {/* <LeftStaticSideBar groupTabs={groupTabs} />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="flex flex-1 h-full pl-4" style={boxStyle}>
              {children}
            </div>
          </main>
        </div>
        <div className="hidden xl:flex xl:flex-shrink-0" style={{ width: '360px' }}>
          <TargetRightPanel />
        </div> */}
        </div>
      </div>
    </div>
  );
};

export const MainRightSide: React.FC = ({ children }) => {
  const containerDOM = document.getElementById('#main-right-side');

  return ReactDOM.createPortal(children, containerDOM as Element);
};

export default MainLayout;
