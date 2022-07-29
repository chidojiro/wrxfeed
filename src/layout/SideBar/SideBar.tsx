import { AddSmallIcon, BasicsXSmall, FeedIcon, TargetIcon, TeamIcon } from '@/assets';
import { Tooltip } from '@/common/components';
import { useSubscription } from '@/subscription/useSubscription';
import React from 'react';
import { SidebarAccordion } from './SidebarAccordion';
import { SidebarNavGroup } from './SidebarNavGroup';
import { SidebarNavItem } from './SidebarNavItem';

export const SideBar = () => {
  const { subscription } = useSubscription();

  const { departments } = subscription ?? {};

  return (
    <nav aria-label="Sidebar" className="divide-y divide-gray-300 flex flex-1 overflow-hidden">
      <div className="flex w-full flex-1 flex-col py-8 pb-40 space-y-6 h-auto overflow-scroll hide-scrollbar">
        <div>
          <SidebarNavGroup>Boards</SidebarNavGroup>
          <SidebarNavItem
            href="/dashboard/all-company"
            iconLeft={<TargetIcon />}
            matches={['/dashboard/:slug']}
          >
            Targets
          </SidebarNavItem>
        </div>
        <div>
          <SidebarNavGroup>Following</SidebarNavGroup>
          <SidebarAccordion label="Teams" iconLeft={<TeamIcon />}>
            {departments?.map(({ id, name }) => (
              <SidebarNavItem
                key={id}
                href={`/departments/${id}`}
                className="group"
                iconRight={
                  <Tooltip trigger={<BasicsXSmall className="group-hover:block hidden" />}>
                    <p className="text-2xs">Unfollow</p>
                  </Tooltip>
                }
              >
                {name}
              </SidebarNavItem>
            ))}
            <SidebarNavItem href="/departments" className="group">
              <div className="flex gap-2 items-center text-Gray-6 group-hover:text-Gray-9">
                <AddSmallIcon />
                Add Teams
              </div>
            </SidebarNavItem>
          </SidebarAccordion>
        </div>
        <div>
          <SidebarNavGroup>Feeds</SidebarNavGroup>
          <SidebarNavItem href="/feeds/for-you" iconLeft={<FeedIcon />}>
            For you
          </SidebarNavItem>
          <SidebarNavItem href="/feeds/company" iconLeft={<FeedIcon />}>
            Company
          </SidebarNavItem>
        </div>
      </div>
    </nav>
  );
};
