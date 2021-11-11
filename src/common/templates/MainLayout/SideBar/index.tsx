import React from 'react';
import { GroupTab, LeftTab } from '@common/types';
import { classNames } from '@common/utils';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { useSubscription } from '@main/hooks/subscription.hook';
import { ReactComponent as CloseIcon } from '@assets/icons/outline/basics-x-small.svg';
import { useRecoilValue } from 'recoil';
import { menuItemsValue } from '@main/states/sidemenu.state';

const SideBar: React.VFC = () => {
  const location = useLocation();
  const { unsubscribe } = useSubscription();
  const menuItems: GroupTab[] = useRecoilValue(menuItemsValue);
  const currentTab = menuItems.reduce<LeftTab | null>((cur, root) => {
    if (cur) return cur;
    return root.tabs.find((tab) => location.pathname.startsWith(tab.href)) ?? null;
  }, null);

  return (
    <nav aria-label="Sidebar" className="divide-y divide-gray-300">
      <div className="py-8 space-y-8 max-h-[calc(60vh-56px)] lg:max-h-[calc(100vh-56px)] overflow-scroll">
        {menuItems.map((menuItem: GroupTab) => {
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
                <h3 className="text-sm font-semibold text-Gray-3 tracking-wider">
                  {menuItem.name}
                </h3>
              </div>
              {tabs.map((leftTab: LeftTab) => {
                const isCurrentTab = currentTab?.href === leftTab.href;
                return (
                  <RouterLink
                    key={`tabs-${leftTab.name}`}
                    to={leftTab.href}
                    className={classNames(
                      isCurrentTab ? 'bg-Gray-5 text-Gray-3' : 'text-Gray-6 hover:bg-gray-50',
                      'group flex justify-between items-center px-3 h-6 text-sm my-0.5 ml-8',
                    )}
                  >
                    <span className="flex-1 truncate">{leftTab.name}</span>
                    {leftTab.removable && (
                      <span
                        aria-hidden="true"
                        onClick={(event) => {
                          event.preventDefault();
                          if (leftTab.subscription) {
                            unsubscribe(leftTab.subscription.type, leftTab.subscription.item);
                          }
                        }}
                      >
                        <CloseIcon
                          className="group-hover:visible invisible"
                          width={16}
                          height={16}
                          viewBox="0 0 18 18"
                        />
                      </span>
                    )}
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
