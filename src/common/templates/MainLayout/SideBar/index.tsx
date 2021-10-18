import React from 'react';
import { GroupTab, LeftTab } from '@common/types';
import { classNames } from '@common/utils';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { MainMenu } from '@common/constants';

const SideBar: React.VFC = () => {
  const location = useLocation();

  return (
    <nav aria-label="Sidebar" className="sticky top-24 divide-y divide-gray-300">
      <div className="pb-8 space-y-1">
        {MainMenu.map((menuItem: GroupTab) => {
          const { tabs, icon: IconView } = menuItem;
          return (
            <>
              <div
                key={`menuItems-${menuItem.name}`}
                className={classNames([
                  'group flex items-center px-2 py-2 text-base font-medium rounded-sm',
                ])}
              >
                <div>
                  {IconView ? (
                    <IconView
                      style={{ width: '20px', height: '20px' }}
                      className={classNames(['flex-shrink-0 h-6 w-6 mr-4'])}
                      aria-hidden="true"
                    />
                  ) : (
                    <div className="flex-shrink-0 h-6 w-6" />
                  )}
                </div>
                {menuItem.name}
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
                        : 'text-gray-600 hover:bg-purple-8 hover:text-gray-900',
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
      </div>
    </nav>
  );
};

export default SideBar;
