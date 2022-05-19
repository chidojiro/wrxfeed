/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import { menuItemsValue, newFeedCountState } from '@main/states/sidemenu.state';
import { getApiClient } from '@api/utils';
import { GroupTab, SectionTab } from '@common/types';
import GroupTabSideBar from '@common/molecules/GroupTabSideBar';
import TabListSideBar from '@common/molecules/TabListSideBar';

const SideBar: React.VFC = () => {
  const menuItems: SectionTab[] = useRecoilValue(menuItemsValue);
  const setFeedCount = useSetRecoilState(newFeedCountState);
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
              {groups?.map((group: GroupTab) => (
                <GroupTabSideBar key={`GroupTab-${group?.name}`} group={group} />
              ))}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default SideBar;
