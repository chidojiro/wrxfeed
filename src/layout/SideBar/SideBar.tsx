import { AddSmallIcon, ChartIcon, FeedIcon, TargetIcon, TeamIcon } from '@/assets';
import { useSubscription } from '@/subscription/useSubscription';
import { Link } from 'react-router-dom';
import { SidebarAccordion } from './SidebarAccordion';
import { SidebarNavItem } from './SidebarNavItem';
import { UnfollowButton } from './UnfollowButton';

export const SideBar = () => {
  const { subscription } = useSubscription();

  const { departments, insights } = subscription ?? {};

  return (
    <nav
      aria-label="Sidebar"
      className="divide-y divide-gray-300 flex overflow-hidden w-[360px] text-Gray-3"
    >
      <div className="flex w-full flex-1 flex-col py-8 pb-40 h-auto overflow-scroll hide-scrollbar space-y-10">
        <div className="space-y-1">
          <div className="text-Gray-6 font-semibold text-xs px-[42px] mb-2">Boards</div>
          <SidebarNavItem
            href="/dashboard/all-company"
            iconLeft={<TargetIcon />}
            matches={['/dashboard/:slug']}
          >
            All Company
          </SidebarNavItem>
          <SidebarNavItem href="/insights" iconLeft={<ChartIcon />} matches={['/insights']}>
            Insights
          </SidebarNavItem>
        </div>

        <div className="space-y-1">
          <div className="text-Gray-6 font-semibold text-xs px-[42px] mb-2">Following</div>
          <SidebarAccordion
            label="Teams"
            className="group"
            iconLeft={<TeamIcon />}
            iconRight={
              // stopPropagation to prevent closing accordion
              <Link to="/departments" onClick={(e) => e.stopPropagation()}>
                <AddSmallIcon className="group-hover:block hidden" />
              </Link>
            }
          >
            {departments?.map((department) => (
              <SidebarNavItem
                key={department.id}
                href={`/departments/${department.id}`}
                className="group"
                iconRight={<UnfollowButton department={department} />}
              >
                <div className="flex items-center group">
                  <p className="truncate max-w-[240px] group-hover:max-w-[130px]">
                    {department.name}
                  </p>
                  <span className="hidden group-hover:block text-Gray-6 font-normal items-center">
                    &nbsp;- {department.parentId !== null ? 'Subteam' : 'Team'}
                  </span>
                </div>
              </SidebarNavItem>
            ))}
            <SidebarNavItem href="/departments" className="group" activatable={false}>
              <div className="flex gap-2 items-center text-Gray-6 group-hover:text-Gray-9">
                <AddSmallIcon />
                Add Teams
              </div>
            </SidebarNavItem>
          </SidebarAccordion>
          <SidebarAccordion
            label="Insights"
            className="group"
            iconLeft={<ChartIcon />}
            iconRight={
              // stopPropagation to prevent closing accordion
              <Link to="/insights" onClick={(e) => e.stopPropagation()}>
                <AddSmallIcon className="group-hover:block hidden" />
              </Link>
            }
          >
            {insights?.map((insight) => (
              <SidebarNavItem
                key={insight.id}
                href={`/insights/${insight.id}`}
                className="group"
                iconRight={<UnfollowButton insight={insight} />}
              >
                <div className="flex items-center group">
                  <p className="truncate max-w-[240px] group-hover:max-w-[130px]">{insight.name}</p>
                </div>
              </SidebarNavItem>
            ))}
            <SidebarNavItem href="/insights" className="group" activatable={false}>
              <div className="flex gap-2 items-center text-Gray-6 group-hover:text-Gray-9">
                <AddSmallIcon />
                Add Insight
              </div>
            </SidebarNavItem>
          </SidebarAccordion>
        </div>

        <div className="space-y-1">
          <div className="text-Gray-6 font-semibold text-xs px-[42px] mb-2">Feeds</div>
          <SidebarNavItem href="/feeds/for-you" iconLeft={<FeedIcon />}>
            For you
          </SidebarNavItem>
        </div>
      </div>
    </nav>
  );
};
