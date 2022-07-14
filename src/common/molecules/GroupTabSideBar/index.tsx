import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import { GroupTab } from '@/common/types';
import clsx from 'clsx';
import { ReactComponent as DownSmall } from '@/assets/icons/outline/down-small.svg';
import { AddSmallIcon } from '@/assets';
import TabListSideBar from '../TabListSideBar';

interface GroupTabSideBarProps {
  className?: string;
  group: GroupTab;
  onClickExpand?: () => void;
}

const GroupTabSideBar: React.FC<GroupTabSideBarProps> = ({
  className,
  group,
  onClickExpand = () => undefined,
}) => {
  const { tabs: tabsInGroup, icon: GroupIcon, addItemRoute } = group;
  const history = useHistory();

  const onClickGroupTab = () => {
    if (tabsInGroup?.length === 0) {
      return;
    }
    onClickExpand();
  };

  if (!tabsInGroup || !Array.isArray(tabsInGroup)) return null;

  return (
    <div className={className}>
      <button
        type="button"
        onClick={onClickGroupTab}
        className="group-scope flex flex-1 w-full flex-row justify-between py-2 items-center pl-6 pr-6 text-sm rounded-sm"
      >
        <div className="flex w-5 h-5 justify-center items-center mr-1.5">
          {tabsInGroup?.length > 0 && (
            <DownSmall className={clsx(group.isOpened ? 'rotate-180' : '')} />
          )}
        </div>
        {GroupIcon ? (
          <div className="flex w-5 h-5 justify-center items-center">
            <GroupIcon
              className={clsx(
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
        <span className="w-full truncate sm:ml-2 md:ml-4 text-left">{group?.name}</span>
        <span
          aria-hidden="true"
          className="relative"
          onClick={(event) => {
            event.stopPropagation();
            if (addItemRoute) {
              history.replace(addItemRoute);
            }
          }}
        >
          <AddSmallIcon
            className={clsx(
              'group-scope-hover:visible invisible h-4 w-4 fill-current path-no-filled stroke-current text-Gray-3 opacity-100 rounded-sm stroke-1',
            )}
            aria-hidden="true"
            width={16}
            height={16}
            viewBox="0 0 16 16"
          />

          <div className="flex absolute inset-0 group-scope">
            <div className="invisible group-scope-hover:visible absolute -top-9 -right-3">
              <div className="bg-primary px-2 rounded-sm h-6 flex flex-col justify-center">
                <p className="text text-white text-2xs truncate">{`Follow ${group?.name}`}</p>
              </div>
              <svg
                className="absolute text-primary h-2 right-4 top-full"
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
      </button>
      <TabListSideBar tabs={tabsInGroup} isOpen={group.isOpened} />
      {addItemRoute && group.isOpened && (
        <RouterLink
          key={`add-button-${group?.name}`}
          to={addItemRoute}
          className={clsx('text-Gray-6 font-regular', 'flex flex-row items-center')}
        >
          <div className="ml-1 group flex flex-1 w-full flex-row hover:bg-Gray-7 justify-between py-2 items-center pl-10 pr-3 text-sm rounded-sm">
            <div className="h-5 w-9" />
            <AddSmallIcon
              className={clsx(
                'flex-shrink-0 h-4 w-4 fill-current path-no-filled stroke-current text-Gray-6 group-hover:text-Gray-9 opacity-100 rounded-sm stroke-1',
              )}
              aria-hidden="true"
              width={16}
              height={16}
              viewBox="0 0 16 16"
            />
            <div className="flex flex-col flex-1 items-start">
              <span className="w-full group-hover:text-Gray-9 truncate sm:ml-2 text-left">{`Add ${group?.name}`}</span>
            </div>
          </div>
          <div className="h-6 w-1" />
        </RouterLink>
      )}
    </div>
  );
};

export default GroupTabSideBar;
