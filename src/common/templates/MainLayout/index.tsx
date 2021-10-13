import React, { Fragment, ReactNode, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import { GroupTab, LeftTab } from '@common/types';
import { classNames } from '@common/utils';
import { SearchIcon } from '@heroicons/react/solid';
import { FeedIcon, DirectoryIcon, NotifyIcon } from '@assets/index';
import { SideBarMobile } from './SideBarMobile';
// import SideMenu from './SideMenu';

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

const profileMenus = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

const MainLayout: React.FC<MainLayoutProps> = ({ title, children, boxStyle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<LeftTab>(groupTabs[0].tabs[0]);

  const LeftStaticSideBar = () => {
    return (
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-1 flex-col overflow-y-auto">
            <div className="flex bg-primary h-16 items-center pl-44">
              <h1 className="flex text-white font-bold text-xl">{title}</h1>
            </div>
            <div className="flex-grow flex flex-col border-r border-gray-300 w-56 ml-32">
              <nav className="flex-1 px-2 space-y-1 mt-16">
                {groupTabs.map((groupTab: GroupTab) => {
                  const { tabs, icon } = groupTab;
                  const IconView: ReactNode =
                    icon || (() => <div className="flex-shrink-0 h-6 w-6" />);
                  return (
                    <>
                      <div
                        key={groupTab.name}
                        className={classNames([
                          'group flex items-center px-2 py-2 text-base font-medium rounded-sm',
                        ])}
                      >
                        <div>
                          <IconView
                            style={{ width: '20px', height: '20px' }}
                            className={classNames(['flex-shrink-0 h-6 w-6 mr-4'])}
                            aria-hidden="true"
                          />
                        </div>
                        {groupTab.name}
                      </div>
                      {tabs.map((leftTab: LeftTab) => {
                        const isCurrentTab = leftTab.name === currentTab.name;
                        return (
                          <a
                            key={leftTab.name}
                            href={leftTab.href}
                            className={classNames([
                              isCurrentTab
                                ? 'bg-purple-5 text-white'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group flex items-center px-2 py-2 text-base font-medium rounded-sm',
                            ])}
                            onClick={() => setCurrentTab(leftTab)}
                          >
                            <div className="h-6 w-6 mr-4" />
                            {leftTab.name}
                          </a>
                        );
                      })}
                    </>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FormSearch = () => {
    return (
      <form className="w-full flex md:ml-0" action="#" method="GET">
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
          <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none bg-primary">
            <SearchIcon className="h-5 w-5 color-white" aria-hidden="true" />
          </div>
          <input
            id="search-field"
            className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm bg-primary"
            placeholder="Search ..."
            type="search"
            name="search"
          />
        </div>
      </form>
    );
  };

  const HeaderWithSearchAndAvatar = () => {
    return (
      <div className="relative z-10 flex-shrink-0 flex h-16 bg-primary shadow">
        <button
          type="button"
          className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 px-4 flex justify-between">
          <div className="flex-1 flex">
            <FormSearch />
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">View notifications</span>
              <div className="flex h-6 w-6 justify-center items-center">
                <NotifyIcon aria-hidden="true" />
              </div>
            </button>

            <div className="bg-white mx-2" style={{ width: '1px', height: '34px' }} />

            {/* Profile dropdown */}
            <Menu as="div" className="ml-3 relative mr-32">
              <div>
                <Menu.Button className="max-w-xs bg-primary flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {profileMenus.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <a
                          href={item.href}
                          className={classNames([
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700',
                          ])}
                        >
                          {item.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    );
  };

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
      <LeftStaticSideBar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <HeaderWithSearchAndAvatar />
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
