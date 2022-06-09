import React from 'react';

import { LeftTab } from '@common/types';
import { classNames } from '@common/utils';
import LeftTabCard from '../LeftTabCard';

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
  if (!isOpen) return null;
  return (
    <div className={classNames('flex flex-col items-start w-full flex-1', className)}>
      {tabs.map((leftTab: LeftTab) => (
        <LeftTabCard
          key={`tabs-${leftTab?.name}-${leftTab.location.pathname}`}
          tab={leftTab}
          showTabIcon={showTabIcon}
        />
      ))}
    </div>
  );
};

export default TabListSideBar;
