import React, { ReactNode } from 'react';
import { GroupTab, LeftTab } from '@common/types';
import { classNames } from '@common/utils';
import { useLocation, Link as RouterLink } from 'react-router-dom';

export interface LeftStaticSideBarProps {
  groupTabs: GroupTab[];
}

const LeftStaticSideBar: React.VFC<LeftStaticSideBarProps> = ({ groupTabs }) => {
  const location = useLocation();
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex-grow flex flex-col border-r border-gray-300 w-56 ml-32">
            <nav className="flex-1 px-2 space-y-1 mt-16">
              {groupTabs.map((groupTab: GroupTab) => {
                const { tabs, icon } = groupTab;
                const IconView: ReactNode =
                  icon || (() => <div className="flex-shrink-0 h-6 w-6" />);
                return (
                  <>
                    <div
                      key={`groupTabs-${groupTab.name}`}
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
                      const isCurrentTab =
                        leftTab.href === location.pathname ||
                        (leftTab.isHome && location.pathname === '/');
                      return (
                        <RouterLink
                          key={`tabs-${leftTab.name}`}
                          to={leftTab.href}
                          className={classNames([
                            isCurrentTab
                              ? 'bg-purple-5 text-white'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-sm',
                          ])}
                        >
                          <div className="h-6 w-6 mr-4" />
                          {leftTab.name}
                        </RouterLink>
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

export default LeftStaticSideBar;
