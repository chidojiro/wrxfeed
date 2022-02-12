import React from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation, Link as RouterLink, useHistory } from 'react-router-dom';

import { menuItemsValue, newFeedCountState } from '@main/states/sidemenu.state';

import { useSubscription } from '@main/hooks/subscription.hook';

import { GroupTab, LeftTab } from '@common/types';
import { classNames } from '@common/utils';

import { ReactComponent as CloseIcon } from '@assets/icons/outline/basics-x-small.svg';

const SideBar: React.VFC = () => {
  const history = useHistory();
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
    <nav aria-label="Sidebar" className="divide-y divide-gray-300 flex flex-1">
      <div className="flex w-full flex-1 flex-col py-8 space-y-6 max-h-[calc(60vh-56px)] lg:max-h-[calc(100vh-56px)] overflow-scroll hide-scrollbar">
        {menuItems.map((menuItem: GroupTab) => {
          const { tabs, icon: IconView } = menuItem;
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
                const isCurrentTab = currentTab?.location.pathname === leftTab.location.pathname;
                return (
                  <RouterLink
                    key={`tabs-${leftTab.name}`}
                    to={leftTab.location}
                    className={classNames(
                      isCurrentTab ? 'bg-Gray-5 text-Gray-3' : 'text-Gray-6 hover:bg-Gray-16',
                      'group flex flex-row justify-between items-center pl-12 py-3 text-sm space-x-4',
                    )}
                  >
                    {IconView ? (
                      <IconView
                        className="flex-shrink-0 h-5 w-5"
                        aria-hidden="true"
                        width={12}
                        height={12}
                        viewBox="0 -2 18 18"
                      />
                    ) : (
                      <div className="flex-shrink-0 h-5 w-5" />
                    )}
                    <span className="w-full truncate">{leftTab.name}</span>
                    {leftTab.removable && (
                      <span
                        aria-hidden="true"
                        onClick={(event) => {
                          event.preventDefault();
                          if (leftTab.subscription) {
                            unsubscribe(leftTab.subscription.type, leftTab.subscription.item);
                            history.replace(leftTab.location.pathname); // Remove Feeds from search query
                          }
                        }}
                      >
                        <CloseIcon
                          className="group-hover:visible invisible mr-2"
                          width={16}
                          height={16}
                          viewBox="0 0 18 18"
                        />
                      </span>
                    )}
                    {leftTab?.isShowCounter && renderCounter(leftTab)}
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
