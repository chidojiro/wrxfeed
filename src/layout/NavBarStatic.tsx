import { AddSmallIcon, FeedIcon, TargetIcon, TeamIcon, UserPlusIcon } from '@/assets';
import { ProtectedFeatures } from '@/auth/constants';
import { Avatar, Button } from '@/common/components';
import { NotifyPopover, UserProfilePopover } from '@/main/molecules';
import { InviteModal } from '@/main/organisms';
import { useProfile } from '@/profile/useProfile';
import { Routes } from '@/routing/routes';
import { useSubscription } from '@/subscription/useSubscription';
import { Popover } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';
import { SidebarAccordion } from './SideBar/SidebarAccordion';
import { SidebarNavGroup } from './SideBar/SidebarNavGroup';
import { SidebarNavItem } from './SideBar/SidebarNavItem';
import { UnfollowButton } from './SideBar/UnfollowButton';

type NavBarStaticProps = {
  className?: string;
  companyName?: string;
  companyStyle?: string;
  searchBar?: boolean;
  userAva?: string;
  userName?: string;
  userEmail?: string;
  showAva?: boolean;
  showNoti?: boolean;
};

export const NavBarStatic = ({
  className = '',
  companyName,
  companyStyle = '',
  searchBar,
  userAva,
  userName,
  userEmail,
  showAva = false,
  showNoti = false,
}: NavBarStaticProps) => {
  const history = useHistory();
  const [isOpenInviteModal, openInviteModal] = useState(false);

  const { subscription } = useSubscription();

  const { departments } = subscription ?? {};

  const { profile } = useProfile();

  const onClickNotification = () => {
    history.push(Routes?.Notifications?.path as string);
  };
  const onClickInviteButton = () => {
    openInviteModal(true);

    mixpanel.track('Invite Button Click', {
      user_id: profile?.id,
      email: profile?.email,
      company: profile?.company?.id,
    });
  };

  const renderInviteButton = () => {
    const hoverStyle = isOpenInviteModal ? 'ring-2' : '';
    return (
      <Button
        onClick={onClickInviteButton}
        className={clsx(
          hoverStyle,
          'ml-8 inline-flex items-center px-4 py-2 border border-Gray-3 text-sm font-medium rounded-md shadow-sm text-white hover:bg-primary focus:outline-none focus:ring-offset-2 focus:ring-Accent-2',
        )}
      >
        <UserPlusIcon className="flex mr-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500" />
        Invite
      </Button>
    );
  };

  return (
    <Popover
      as="header"
      id="app-header"
      className={({ open }) => {
        return clsx(
          open ? 'inset-0 overflow-y-auto' : '',
          'bg-primary z-40 fixed w-full shadow-sm lg:overflow-y-visible',
          className,
        );
      }}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-3xl md:max-w-[1440px]">
            <div className="relative flex flex-row-reverse px-2 sm:px-0 justify-between h-navbar md:grid md:grid-cols-12">
              <div className="flex flex-col justify-center md:col-span-3 pl-2 sm:pl-12 pr-3">
                <h1 className={clsx('text-lg font-bold text-white', companyStyle)}>
                  <Link to="/dashboard/all-company">{companyName}</Link>
                </h1>
              </div>
              <div className="hidden sm:flex items-center min-w-0 flex-1 md:pl-6 md:col-span-6 lg:col-span-6">
                {searchBar && <SearchBar />}
              </div>
              <div className="hidden sm:flex flex-row items-center lg:justify-center md:col-span-3">
                {showNoti && <NotifyPopover showNumberNotify useDropDown={false} />}
                {showAva && showNoti && (
                  <div className="bg-purple-9 w-[1px] h-[34px] ml-2.5 mr-4" />
                )}
                {showAva && <UserProfilePopover />}
                {renderInviteButton()}
              </div>
              <div className="flex items-center md:absolute md:right-0 md:inset-y-0 sm:hidden">
                <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
            </div>
          </div>
          <Popover.Panel
            as="nav"
            className="bg-white h-screen sm:h-full sm:hidden flex flex-col justify-between overflow-auto"
            aria-label="Global"
          >
            <div>
              <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4"></div>
              <div className="border-t border-gray-200 pt-4">
                <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                  <div className="flex-shrink-0">
                    <Avatar size="lg" src={userAva} fullName={userName as string} />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{userName}</div>
                    <div className="text-sm font-medium text-gray-500">{userEmail}</div>
                  </div>
                  <Button
                    onClick={onClickNotification}
                    className="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </div>
                <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                  <div className="block rounded-md py-4 px-6 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                    <SidebarNavGroup className="!p-0">Boards</SidebarNavGroup>
                    <SidebarNavItem
                      className="!p-0"
                      href="/dashboard/all-company"
                      iconLeft={<TargetIcon />}
                      matches={['/dashboard/:slug']}
                    >
                      Targets
                    </SidebarNavItem>
                  </div>
                  <div className="block rounded-md py-4 px-6 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                    <SidebarNavGroup className="!p-0">Following</SidebarNavGroup>
                    <SidebarAccordion
                      defaultOpen={false}
                      label="Teams"
                      className="group !p-0"
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
                          className="group !p-0"
                          iconRight={<UnfollowButton department={department} />}
                        >
                          {department.name}
                        </SidebarNavItem>
                      ))}
                      <SidebarNavItem
                        href="/departments"
                        className="group !p-0"
                        activatable={false}
                      >
                        <div className="flex gap-2 items-center text-Gray-6 group-hover:text-Gray-9">
                          <AddSmallIcon />
                          Add Teams
                        </div>
                      </SidebarNavItem>
                    </SidebarAccordion>
                  </div>
                  <div className="block rounded-md py-4 px-6 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                    <SidebarNavGroup className="!p-0">Feeds</SidebarNavGroup>
                    <SidebarNavItem className="!p-0" href="/feeds/for-you" iconLeft={<FeedIcon />}>
                      For you
                    </SidebarNavItem>
                    <SidebarNavItem className="!p-0" href="/feeds/company" iconLeft={<FeedIcon />}>
                      Company
                    </SidebarNavItem>
                  </div>
                </div>
              </div>
            </div>
            <a
              href="#"
              className="block rounded-md py-16 px-6 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >
              Sign out
            </a>
          </Popover.Panel>
          <InviteModal open={isOpenInviteModal} onClose={() => openInviteModal(false)} />
        </>
      )}
    </Popover>
  );
};
