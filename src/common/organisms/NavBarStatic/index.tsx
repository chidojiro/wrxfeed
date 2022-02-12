import React, { useState } from 'react';
import { Popover } from '@headlessui/react';
import { useHistory } from 'react-router-dom';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';

import { classNames } from '@common/utils';
import routes from '@src/routes';

import SearchBar from '@common/molecules/SearchBar';
import { NotifyPopover, UserProfilePopover } from '@main/molecules';
import { InviteModal } from '@main/organisms';
import { UserPlusIcon } from '@assets/index';

interface NavBarStaticProps {
  className?: string;
  companyName?: string;
  companyStyle?: string;
  searchBar?: boolean;
  userAva?: string;
  userName?: string;
  userEmail?: string;
  showAva?: boolean;
  showNoti?: boolean;
  showInvite?: boolean;
}
const userNavigation = [
  { name: 'Notifications', href: '/notifications' },
  { name: 'Sign out', href: '#' },
];

const NavBarStatic: React.VFC<NavBarStaticProps> = ({
  className = '',
  companyName,
  companyStyle = '',
  searchBar,
  userAva,
  userName,
  userEmail,
  showAva = false,
  showNoti = false,
  showInvite = false,
}) => {
  const history = useHistory();
  const [isOpenInviteModal, openInviteModal] = useState(false);

  const onClickNotification = () => {
    history.push(routes?.Notifications?.path as string);
  };
  const onClickInviteButton = () => {
    openInviteModal(true);
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
          className,
        );
      }}
    >
      {({ open }) => (
        <>
          <div className="mx-auto px-4 sm:px-6 lg:pl-8 lg:pr-24">
            <div className="relative flex justify-between h-navbar xl:grid xl:grid-cols-12">
              <div className="flex justify-center lg:static xl:col-span-2">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className={classNames('text-lg font-bold text-white', companyStyle)}>
                    {companyName}
                  </h1>
                </div>
              </div>
              <div className="flex items-center min-w-0 flex-1 md:px-8 lg:pr-0 lg:pl-20 xl:col-span-7">
                {searchBar && <SearchBar />}
              </div>
              <div className="hidden sm:flex items-center lg:justify-end xl:col-span-3 mr-0">
                {showNoti && <NotifyPopover showNumberNotify useDropDown={false} />}
                {showAva && showNoti && (
                  <div className="bg-purple-9 w-[1px] h-[34px] ml-2.5 mr-4" />
                )}
                {showAva && <UserProfilePopover />}
                {renderInviteButton()}
              </div>
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
          <Popover.Panel as="nav" className="bg-white h-full lg:hidden" aria-label="Global">
            <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
              {/* <SideBar /> */}
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={userAva} alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{userName}</div>
                  <div className="text-sm font-medium text-gray-500">{userEmail}</div>
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
          {showInvite && (
            <InviteModal open={isOpenInviteModal} onClose={() => openInviteModal(false)} />
          )}
        </>
      )}
    </Popover>
  );
};

export default NavBarStatic;
