import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { LeftTab } from '@/common/types';
import { useSubscription } from '@/main/hooks/subscription.hook';
import { newFeedCountState } from '@/main/states/sidemenu.state';
import { classNames } from '@/common/utils';
import { BasicsXSmall } from '@/assets';
import Loading from '@/common/atoms/Loading';

interface LeftTabCardProps {
  className?: string;
  showTabIcon?: boolean;
  tab: LeftTab;
}

const LeftTabCard: React.VFC<LeftTabCardProps> = ({ className = '', tab, showTabIcon = false }) => {
  const history = useHistory();
  const location = useLocation();
  const newFeedCount = useRecoilValue(newFeedCountState);
  const { unsubscribe, isUnfollowLoading } = useSubscription();

  const onClickLeftTab = (newLocation: string) => {
    history.push(newLocation);
  };

  const { icon: TabIcon } = tab;
  const isCurrentTab = location.pathname.includes(tab.location.pathname);

  const renderCounter = (item: LeftTab) => {
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
    <button
      type="button"
      onClick={() => onClickLeftTab(tab.location.pathname)}
      className={classNames(
        isCurrentTab ? 'text-Accent-2 font-semibold' : 'text-Gray-3 font-regular',
        'flex flex-row items-center w-full',
        className,
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
        <span className="w-full truncate sm:ml-2 md:ml-4 text-sm text-left">{tab.name}</span>
        {tab?.removable && (
          <span
            aria-hidden="true"
            className="relative"
            onClick={(event) => {
              event.stopPropagation();
              if (tab.subscription) {
                unsubscribe(tab.subscription.type, tab.subscription.item);
              }
            }}
          >
            {isUnfollowLoading ? (
              <div className="flex w-4 h-4 justify-center items-center mr-2">
                <Loading width={12} height={12} color="Gray-3" />
              </div>
            ) : (
              <BasicsXSmall
                className="group-scope-hover:visible invisible mr-2"
                width={16}
                height={16}
                viewBox="0 0 16 16"
              />
            )}
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
        {tab?.isShowCounter && renderCounter(tab)}
      </div>
      <div className={classNames('h-6 w-1 rounded-full', isCurrentTab ? 'bg-Accent-2' : '')} />
    </button>
  );
};

export default LeftTabCard;
