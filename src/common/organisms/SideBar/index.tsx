/* eslint-disable react-hooks/exhaustive-deps */
import { getApiClient } from '@/api/utils';
import { ENABLE_GET_FEED_COUNT } from '@/common/constants';
import GroupTabSideBar from '@/common/molecules/GroupTabSideBar';
import TabListSideBar from '@/common/molecules/TabListSideBar';
import { GroupTab, SectionTab } from '@/common/types';
import { menuItemsValue, newFeedCountState } from '@/main/states/sidemenu.state';
import { cloneDeep } from 'lodash-es';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';

const SideBar: React.FC = () => {
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
    newMenuState[1].groups[groupIndex].isOpened = !menuItems[1].groups[groupIndex].isOpened;
    setMenuItems(newMenuState);
  };

  return (
    <nav aria-label="Sidebar" className="divide-y divide-gray-300 flex flex-1 overflow-hidden">
      <div className="flex w-full flex-1 flex-col py-8 pb-40 space-y-6 h-auto overflow-scroll hide-scrollbar">
        {menuItems.map((menuItem: SectionTab, idx) => {
          const { groups, tabs: tabsInSection } = menuItem;
          return (
            <div key={idx} className="flex flex-col w-full">
              {menuItem?.name?.length > 0 && (
                <div className="px-12 h-8 flex flex-row items-center w-full">
                  <h3 className="text-xs font-semibold text-Gray-6 tracking-wider">
                    {menuItem.name}
                  </h3>
                </div>
              )}
              <TabListSideBar tabs={tabsInSection} showTabIcon />
              {groups?.map((group: GroupTab, groupIndex: number) => {
                if (!group.enable) {
                  return null;
                }
                return (
                  <GroupTabSideBar
                    key={`GroupTab-${group?.name}`}
                    group={group}
                    onClickExpand={() => onClickExpandGroupTab(groupIndex)}
                  />
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
