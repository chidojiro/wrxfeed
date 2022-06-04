import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { LeftTab } from '@common/types';
import { useSubscription } from '@main/hooks/subscription.hook';
import { newFeedCountState } from '@main/states/sidemenu.state';
import { classNames } from '@common/utils';
import { ReactComponent as CloseIcon } from '@assets/icons/outline/basics-x-small.svg';

interface TabListSideBarProps {
  className?: string;
  tabs: LeftTab[];
  showTabIcon?: boolean;
  isOpen?: boolean;
}

const TabListSideBar: React.VFC<TabListSideBarProps> = ({
  className = '',
  tabs,
  showTabIcon = false,
  isOpen = true,
}) => {
  const history = useHistory();
  const location = useLocation();
  const newFeedCount = useRecoilValue(newFeedCountState);
  const { unsubscribe } = useSubscription();
  // const currentTab = menuItems[0].groups.reduce<LeftTab | null>((cur, root) => {
  //   if (cur || !root) return cur;
  //   return (
  //     root?.tabs.find((tab) =>
  //       tab.strict
  //         ? location.pathname === tab.location.pathname &&
  //           location.search.includes(tab.location.search ?? '')
  //         : location.pathname.startsWith(tab.location.pathname),
  //     ) ?? null
  //   );
  // }, null);

  const renderCounter = (item: LeftTab) => {
    const isCurrentTab = location.pathname.includes(item.location.pathname);
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

  const onClickLeftTab = (newLocation: string) => {
    history.push(newLocation);
  };

  if (!isOpen) return null;

  return (
    <div className={classNames('flex flex-col items-start w-full flex-1', className)}>
      {tabs.map((leftTab: LeftTab) => {
        const { icon: TabIcon } = leftTab;
        const isCurrentTab = location.pathname.includes(leftTab.location.pathname);
        return (
          <button
            type="button"
            onClick={() => onClickLeftTab(leftTab.location.pathname)}
            key={`tabs-${leftTab?.name}-${leftTab.location.pathname}`}
            className={classNames(
              isCurrentTab ? 'text-Accent-2 font-semibold' : 'text-Gray-3 font-regular',
              'flex flex-row items-center w-full',
            )}
          >
            <div className="group-scope ml-1 flex flex-1 w-full flex-row hover:bg-Gray-7 justify-between py-2 items-center pl-10 pr-3 text-sm rounded-sm">
              {TabIcon && showTabIcon ? (
                <div className="flex w-5 h-5 justify-center items-center">
                  <TabIcon
                    className={classNames(
                      'flex-shrink-0 h-4 w-4 fill-current path-no-filled opacity-100',
                      isCurrentTab ? 'text-Accent-2' : 'text-Gray-3',
                    )}
                    aria-hidden="true"
                    width={16}
                    height={16}
                  />
                </div>
              ) : (
                <div className="flex-shrink-0 h-5 w-5" />
              )}
              <span className="w-full truncate sm:ml-2 md:ml-4 text-sm text-left">
                {leftTab.name}
              </span>
              {leftTab.removable && (
                <span
                  aria-hidden="true"
                  className="relative"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (leftTab.subscription) {
                      unsubscribe(leftTab.subscription.type, leftTab.subscription.item);
                      // history.replace(leftTab.location.pathname); // Remove Feeds from search query
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
                      <div className="bg-primary px-2 justify-center h-6 flex flex-col rounded-sm">
                        <p className="text text-white text-2xs truncate">Unfollow</p>
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
          </button>
        );
      })}
    </div>
  );
};

export default TabListSideBar;
