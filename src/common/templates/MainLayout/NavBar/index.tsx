import React, { useState } from 'react';
import { Popover } from '@headlessui/react';
import { classNames } from '@common/utils';
import { useIdentity } from '@identity/hooks';
import { UserProfilePopover, NotifyPopover } from '@main/molecules';
import { InviteModal } from '@main/organisms';
import { UserPlusIcon } from '@assets/index';
import SearchBar from '@common/molecules/SearchBar';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { Profile } from '@auth/types';
import { useRecoilValue } from 'recoil';
import { profileState } from '@auth/containers/ProfileEditForm/states';
import { useHistory } from 'react-router-dom';
import SideBar from '../SideBar';

interface NavBarProps {
  showSearchBar?: boolean;
  showInvite?: boolean;
}

const userNavigation = [
  { name: 'Notifications', href: '/notifications' },
  { name: 'Sign out', href: '#' },
];

const NavBar: React.VFC<NavBarProps> = ({ showSearchBar = false, showInvite = true }) => {
  const identity = useIdentity();
  const [isOpenInviteModal, openInviteModal] = useState(false);
  const profile = useRecoilValue(profileState);
  const [profileUser] = React.useState<Profile>(profile);
  const history = useHistory();

  const onClickInviteButton = () => {
    openInviteModal(true);
  };

  const onClickNotification = () => {
    history.push('/notifications');
  };

  const renderInviteButton = () => {
    if (!showInvite) {
      return (
        <div className="ml-8 inline-flex items-center px-4 py-2 border border-transparent text-sm" />
      );
    }
    const hoverStyle = isOpenInviteModal ? 'ring-2' : '';
    return (
      <button
        type="button"
        onClick={onClickInviteButton}
        className={classNames(
          hoverStyle,
          'ml-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-offset-2 focus:ring-rose-500',
        )}
      >
        <UserPlusIcon className="flex mr-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500" />
        Invite
      </button>
    );
  };

  return (
    <Popover
      as="header"
      className={({ open }) => {
        return classNames(
          open ? 'inset-0 overflow-y-auto' : '',
          'bg-primary z-40 fixed w-full shadow-sm lg:overflow-y-visible',
        );
      }}
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex justify-between h-navbar xl:grid xl:grid-cols-12 lg:gap-8">
              {/* Left space */}
              <div className="flex justify-center md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-lg font-bold text-white">
                    {identity?.company?.name || 'Gravity'}
                  </h1>
                </div>
              </div>
              {/* Center space */}
              <div className="flex items-center min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-7">
                <div className="flex w-full items-center px-5 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0">
                  {showSearchBar && <SearchBar />}
                </div>
              </div>
              <div className="hidden sm:flex items-center lg:justify-end xl:col-span-3 mr-0 md:mr-16 lg:mr-2">
                <NotifyPopover showNumberNotify useDropDown={false} />
                <div className="bg-purple-9 w-[1px] h-[34px] ml-2.5 mr-4" />
                <UserProfilePopover />
                {renderInviteButton()}
              </div>
              {/* Mobile menu button */}
              <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
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

          {/* for mobile */}
          <Popover.Panel as="nav" className="bg-white h-full lg:hidden" aria-label="Global">
            <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
              <SideBar />
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={profileUser?.avatar} alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{profileUser?.fullName}</div>
                  <div className="text-sm font-medium text-gray-500">{profileUser?.email}</div>
                </div>
                <button
                  type="button"
                  onClick={onClickNotification}
                  className="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                {userNavigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </Popover.Panel>
          <InviteModal open={isOpenInviteModal} onClose={() => openInviteModal(false)} />
        </>
      )}
    </Popover>
  );
};

export default NavBar;
