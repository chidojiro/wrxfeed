/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useLocation, Link as RouterLink, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { menuItemsValue, newFeedCountState } from '@main/states/sidemenu.state';
import { useSubscription } from '@main/hooks/subscription.hook';
import { getApiClient } from '@api/utils';
import { GroupTab, LeftTab, SectionTab } from '@common/types';
import { classNames } from '@common/utils';
import { ReactComponent as CloseIcon } from '@assets/icons/outline/basics-x-small.svg';
import { AddSmallIcon, Bank } from '@assets';

const SideBar: React.VFC = () => {
  const history = useHistory();
  const location = useLocation();

  const { unsubscribe } = useSubscription();

  const menuItems: SectionTab[] = useRecoilValue(menuItemsValue);
  const [newFeedCount, setFeedCount] = useRecoilState(newFeedCountState);

  const currentTab: LeftTab = {
    name: '',
    location: { pathname: location.pathname },
    icon: Bank,
  };
  // const currentTab = menuItems[0].groups.reduce<LeftTab | null>((cur, root) => {
  //   if (cur) return cur;
  //   return (
  //     root.tabs.find((tab) =>
  //       tab.strict
  //         ? location.pathname === tab.location.pathname &&
  //           location.search.includes(tab.location.search ?? '')
  //         : location.pathname.startsWith(tab.location.pathname),
  //     ) ?? null
  //   );
  // }, null);

  async function getFeedCount() {
    try {
      const apiClient = await getApiClient();
      const companyRequest = apiClient.getUnreadLineItemsCount({
        page: { offset: 0, limit: 1 },
      });
      const forYouRequest = apiClient.getUnreadLineItemsCount({
        forYou: 1,
        page: { offset: 0, limit: 1 },
      });
      const [companyCount, forYouCount] = await Promise.all([companyRequest, forYouRequest]);

      setFeedCount({
        '/company': companyCount ?? 0,
        '/for-you': forYouCount ?? 0,
      });
    } catch {
      toast.error('Fail to load feed count');
    }
  }

  useEffect(() => {
    getFeedCount();
  }, []);

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

  const renderTabs = (tabs: LeftTab[], showTabIcon = false) => {
    return (
      <>
        {tabs.map((leftTab: LeftTab) => {
          const { icon: TabIcon } = leftTab;
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
              <div className="ml-1 group-scope flex flex-1 w-full flex-row hover:bg-Gray-7 justify-between py-3 items-center pl-12 pr-3 text-sm rounded-sm">
                {TabIcon && showTabIcon ? (
                  <div className="flex w-5 h-5 justify-center items-center">
                    <TabIcon
                      className={classNames(
                        'flex-shrink-0 h-4 w-4 fill-current path-no-filled text-Gray-3 opacity-100',
                      )}
                      aria-hidden="true"
                      width={16}
                      height={16}
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0 h-5 w-5" />
                )}
                <span className="w-full truncate sm:ml-2 md:ml-4 ">{leftTab.name}</span>
                {leftTab.removable && (
                  <span
                    aria-hidden="true"
                    className="relative"
                    onClick={(event) => {
                      event.preventDefault();
                      if (leftTab.subscription) {
                        unsubscribe(leftTab.subscription.type, leftTab.subscription.item);
                        history.replace(leftTab.location.pathname); // Remove Feeds from search query
                      }
                    }}
                  >
                    <CloseIcon
                      className="group-scope-hover:visible invisible mr-2"
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                    />
                    <div className="flex absolute inset-0 group-scope">
                      <div className="invisible group-scope-hover:visible absolute -top-8 -right-2.5">
                        <div className="bg-primary px-2 py-1 rounded-sm">
                          <p className="text text-white text-2xs truncate font-semibold">
                            Unfollow
                          </p>
                        </div>
                        <svg
                          className="absolute text-primary h-2 right-5 top-full"
                          x="0px"
                          y="0px"
                          viewBox="0 0 255 255"
                          xmlSpace="preserve"
                        >
                          <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
                        </svg>
                      </div>
                    </div>
                  </span>
                )}
                {leftTab?.isShowCounter && renderCounter(leftTab)}
              </div>
              <div
                className={classNames('h-6 w-1 rounded-full', isCurrentTab ? 'bg-Accent-2' : '')}
              />
            </RouterLink>
          );
        })}
      </>
    );
  };

  return (
    <nav aria-label="Sidebar" className="divide-y divide-gray-300 flex flex-1 overflow-hidden">
      <div className="flex w-full flex-1 flex-col py-8 pb-40 space-y-6 h-auto overflow-scroll hide-scrollbar">
        {menuItems.map((menuItem: SectionTab) => {
          const { groups, tabs: tabsInSection } = menuItem;
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
              {renderTabs(tabsInSection, true)}
              {groups?.map((group: GroupTab) => {
                const { tabs: tabsInGroup, icon: GroupIcon, addItemRoute, addItemTitle } = group;
                if (!tabsInGroup || !Array.isArray(tabsInGroup)) return null;
                return (
                  <div key={`GroupTab-${group.name}`}>
                    <div className="ml-1 group flex flex-1 w-full flex-row justify-between py-3 items-center pl-12 pr-3 text-sm rounded-sm">
                      {GroupIcon ? (
                        <div className="flex w-5 h-5 justify-center items-center">
                          <GroupIcon
                            className={classNames(
                              'flex-shrink-0 h-4 w-4 fill-current path-no-filled text-Gray-3 opacity-100',
                            )}
                            aria-hidden="true"
                            width={16}
                            height={16}
                          />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 h-5 w-5" />
                      )}
                      <span className="w-full truncate sm: ml-2 md:ml-4 ">{group.name}</span>
                    </div>
                    {renderTabs(tabsInGroup)}
                    {addItemRoute && (
                      <RouterLink
                        key={`add-button-${group?.name}`}
                        to={addItemRoute}
                        className={classNames(
                          'text-Gray-6 font-regular',
                          'flex flex-row items-center',
                        )}
                      >
                        <div className="ml-1 group flex flex-1 w-full flex-row hover:bg-Gray-7 justify-between py-3 items-center pl-12 pr-3 text-sm rounded-sm">
                          <div className="h-5 w-14" />
                          <AddSmallIcon
                            className={classNames(
                              'flex-shrink-0 h-4 w-4 fill-current path-no-filled text-Gray-6 opacity-100',
                            )}
                            aria-hidden="true"
                            width={16}
                            height={16}
                          />
                          <span className="w-full truncate sm:ml-2">{addItemTitle}</span>
                        </div>
                        <div className="h-6 w-1" />
                      </RouterLink>
                    )}
                  </div>
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
