import React from 'react';
import { GroupTab, LeftTab } from '@common/types';
import { classNames } from '@common/utils';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { MainMenu } from '@common/constants';

const SideBar: React.VFC = () => {
  const location = useLocation();

  return (
    <nav aria-label="Sidebar" className="sticky top-24 divide-y divide-gray-300">
      <div className="pb-8 space-y-8">
        {MainMenu.map((menuItem: GroupTab) => {
          const { tabs, icon: IconView } = menuItem;
          return (
            <div key={menuItem.name}>
              <div
                key={`${menuItem.name}-headline`}
                className="px-3 py-3 flex flex-row items-center"
              >
                {IconView ? (
                  <IconView
                    className="flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                    aria-hidden="true"
                    width={12}
                    height={12}
                    viewBox="0 -2 18 18"
                  />
                ) : (
                  <div className="flex-shrink-0 -ml-1 mr-3 h-6 w-6" />
                )}
                <h3 className="text-xs font-semibold text-Gray-1 uppercase tracking-wider">
                  {menuItem.name}
                </h3>
              </div>
              {tabs.map((leftTab: LeftTab) => {
                const isCurrentTab = leftTab.href === location.pathname;
                return (
                  <RouterLink
                    key={`tabs-${leftTab.name}`}
                    to={leftTab.href}
                    className={classNames(
                      isCurrentTab ? 'bg-Gray-5 text-Gray-3' : 'text-Gray-6 hover:bg-gray-50',
                      'group flex items-center px-3 h-6 text-sm font-medium rounded-sm my-[2px]',
                    )}
                  >
                    <div className="flex-shrink-0 -ml-1 mr-3 h-6 w-6" />
                    <span className="truncate">{leftTab.name}</span>
                  </RouterLink>
                );
              })}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default SideBar;
