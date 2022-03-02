import React from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation, Link as RouterLink } from 'react-router-dom';

import { menuItemsValue, newFeedCountState } from '@main/states/sidemenu.state';
import { useSubscription } from '@main/hooks/subscription.hook';
import { GroupTab, LeftTab } from '@common/types';
import { classNames } from '@common/utils';
import { ReactComponent as CloseIcon } from '@assets/icons/outline/basics-x-small.svg';

const SideBar: React.VFC = () => {
  const location = useLocation();

  const { unsubscribe } = useSubscription();

  const menuItems: GroupTab[] = useRecoilValue(menuItemsValue);
  const newFeedCount = useRecoilValue(newFeedCountState);

  const currentTab = menuItems.reduce<LeftTab | null>((cur, root) => {
    if (cur) return cur;
    return (
      root.tabs.find((tab) =>
        tab.strict
          ? location.pathname === tab.location.pathname &&
            location.search.includes(tab.location.search ?? '')
          : location.pathname.startsWith(tab.location.pathname),
      ) ?? null
    );
  }, null);

  const renderCounter = (item: LeftTab) => {
    const isCurrentTab = currentTab?.location.pathname === item.location.pathname;
    const counter = newFeedCount[item.location.pathname];
    return (
      !!counter && (
        <div
          className={classNames(
            'flex px-1.5 h-[18px] rounded-full mr-2 justify-center items-center',
            isCurrentTab ? 'bg-Gray-12' : 'bg-Gray-11',
          )}
        >
          <p className="flex text-Gray-3 text-xs font-semibold">{counter}</p>
        </div>
      )
    );
  };

  return (
    <nav aria-label="Sidebar" className="divide-y divide-gray-300 flex flex-1 overflow-hidden">
      <div className="flex w-full flex-1 flex-col py-8 pb-40 space-y-6 h-auto overflow-scroll hide-scrollbar">
        {menuItems.map((menuItem: GroupTab) => {
          const { tabs } = menuItem;
          return (
            <div key={menuItem.name}>
              <div
                key={`${menuItem.name}-headline`}
                className="px-12 h-8 flex flex-row items-center"
              >
                <h3 className="text-xs font-semibold text-Gray-6 tracking-wider">
                  {menuItem.name}
                </h3>
              </div>
              {tabs.map((leftTab: LeftTab) => {
                const { icon: IconView } = leftTab;
                const isCurrentTab = currentTab?.location.pathname === leftTab.location.pathname;
                return (
                  <RouterLink
                    key={`tabs-${leftTab?.name}-${leftTab.location.pathname}`}
                    to={leftTab.location}
                    className={classNames(
                      isCurrentTab ? 'text-Accent-2 font-semibold' : 'text-Gray-3 font-regular',
                      'flex flex-row items-center',
                    )}
                  >
                    <div className="ml-1 group flex flex-1 w-full flex-row hover:bg-Gray-7 justify-between py-3 items-center pl-12 pr-3 text-sm rounded-sm">
                      {IconView ? (
                        <div className="flex w-5 h-5 justify-center items-center">
                          <IconView
                            className={classNames(
                              'flex-shrink-0 h-4 w-4 fill-current path-no-filled',
                              isCurrentTab
                                ? 'text-Accent-2 opacity-100'
                                : 'text-Gray-3 opacity-100',
                            )}
                            aria-hidden="true"
                            width={16}
                            height={16}
                          />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 h-5 w-5" />
                      )}
                      <span className="w-full truncate sm: ml-2 md:ml-4 ">{leftTab.name}</span>
                      {leftTab.removable && (
                        <span
                          aria-hidden="true"
                          onClick={(event) => {
                            event.preventDefault();
                            if (leftTab.subscription) {
                              unsubscribe(leftTab.subscription.type, leftTab.subscription.item);
                              // history.replace(leftTab.location.pathname); // Remove Feeds from search query
                            }
                          }}
                        >
                          <CloseIcon
                            className="group-hover:visible invisible mr-2"
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                          />
                        </span>
                      )}
                      {leftTab?.isShowCounter && renderCounter(leftTab)}
                    </div>
                    <div
                      className={classNames(
                        'h-6 w-1 rounded-full',
                        isCurrentTab ? 'bg-Accent-2' : '',
                      )}
                    />
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
