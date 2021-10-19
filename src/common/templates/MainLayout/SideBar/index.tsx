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
            <React.Fragment key={menuItem.name}>
              <div
                key={`menuItems-${menuItem.name}`}
                className="group flex items-center px-2 py-2 text-sm text-Gray-1 font-semibold rounded-sm"
              >
                <div>
                  {IconView ? (
                    <IconView
                      style={{ width: '20px', height: '20px' }}
                      className="flex-shrink-0 h-6 w-6 mr-4"
                      aria-hidden="true"
                      width={12}
                      height={12}
                      viewBox="0 -4 20 20"
                    />
                  ) : (
                    <div className="flex-shrink-0 h-6 w-6" />
                  )}
                </div>
                {menuItem.name}
              </div>
              {tabs.map((leftTab: LeftTab) => {
                const isCurrentTab = leftTab.href === location.pathname;
                return (
                  <RouterLink
                    key={`tabs-${leftTab.name}`}
                    to={leftTab.href}
                    className={classNames([
                      isCurrentTab
                        ? 'bg-purple-5 text-white'
                        : 'text-Gray-6 hover:bg-purple-8 hover:text-Gray-2',
                      'group flex items-center px-2 py-0.5 text-sm rounded-sm',
                    ])}
                  >
                    <div className="h-6 w-6 mr-4" />
                    {leftTab.name}
                  </RouterLink>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default SideBar;
