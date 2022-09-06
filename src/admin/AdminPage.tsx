import {
  Tab as HeadlessTab,
  Tabs as HeadlessTabs,
  TabContent as HeadlessTabContent,
} from '@/common/headless';
import { StringUtils } from '@/common/utils';
import { NavBar } from '@/layout/NavBar';
import clsx from 'clsx';
import { Link, useParams } from 'react-router-dom';
import { RolesTabContent } from './RolesTabContent';
import { TeamMembersTabContent } from './TeamMembersTabContent';

type NavigatorItem = {
  to: string;
  label: string;
  value: string;
  content: React.ReactNode;
};

const navigatorItems: NavigatorItem[] = [
  { to: '/admin/roles', label: 'Roles', value: 'roles', content: <RolesTabContent /> },
  {
    to: '/admin/team-members',
    label: 'Team Members',
    value: 'team-members',
    content: <TeamMembersTabContent />,
  },
];

export const AdminPage = () => {
  const params = useParams() as Record<string, string>;
  const tab = params.tab;

  return (
    <div className={clsx(StringUtils.withProjectClassNamePrefix('admin-layout'))}>
      <NavBar mainLayout={false} />
      <div
        className={clsx(
          'flex pt-[70px] min-h-screen mx-auto md:max-w-[1280px] md:pt-[156px] px-2 gap-10',
        )}
      >
        <HeadlessTabs value={tab}>
          <div className="flex flex-col gap-1 w-[250px]">
            {navigatorItems.map(({ to, label, value, content }) => (
              <HeadlessTab key={to} value={value} content={content}>
                {({ isActive }) => (
                  <Link
                    to={to}
                    className={clsx('font-medium hover:bg-Gray-7 py-1 px-5', {
                      'bg-Gray-7 font-bold': isActive,
                    })}
                  >
                    {label}
                  </Link>
                )}
              </HeadlessTab>
            ))}
          </div>
          <HeadlessTabContent />
        </HeadlessTabs>
      </div>
    </div>
  );
};
