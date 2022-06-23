/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import cloneDeep from 'lodash.clonedeep';

import { menuItemsValue, newFeedCountState } from '@/main/states/sidemenu.state';
import { getApiClient } from '@/api/utils';
import { GroupTab, SectionTab } from '@/common/types';
import GroupTabSideBar from '@/common/molecules/GroupTabSideBar';
import TabListSideBar from '@/common/molecules/TabListSideBar';
import { ENABLE_GET_FEED_COUNT } from '@/common/constants';

const SideBar: React.VFC = () => {
  const [menuItems, setMenuItems] = useRecoilState(menuItemsValue);
  const setFeedCount = useSetRecoilState(newFeedCountState);
  async function getFeedCount() {
    if (ENABLE_GET_FEED_COUNT) {
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
        toast.error('Fail to load feed count!');
      }
    } else {
      setFeedCount({
        '/company': 0,
        '/for-you': 0,
      });
    }
  }

  useEffect(() => {
    getFeedCount();
  }, []);

  const onClickExpandGroupTab = (groupIndex: number) => {
    const newMenuState = cloneDeep(menuItems);
    newMenuState[2].groups[groupIndex].isOpened = !menuItems[2].groups[groupIndex].isOpened;
    setMenuItems(newMenuState);
  };

  return (
    <nav aria-label="Sidebar" className="divide-y divide-gray-300 flex flex-1 overflow-hidden">
      <div className="flex w-full flex-1 flex-col py-8 pb-40 space-y-6 h-auto overflow-scroll hide-scrollbar">
        {menuItems.map((menuItem: SectionTab) => {
          const { groups, tabs: tabsInSection } = menuItem;
          return (
            <div key={menuItem.name} className="flex flex-col w-full">
              <div
                key={`${menuItem.name}-headline`}
                className="px-12 h-8 flex flex-row items-center w-full"
              >
                <h3 className="text-xs font-semibold text-Gray-6 tracking-wider">
                  {menuItem.name}
                </h3>
              </div>
              <TabListSideBar tabs={tabsInSection} showTabIcon />
              {groups?.map((group: GroupTab, groupIndex: number) => (
                <GroupTabSideBar
                  key={`GroupTab-${group?.name}`}
                  group={group}
                  onClickExpand={() => onClickExpandGroupTab(groupIndex)}
                />
              ))}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default SideBar;
