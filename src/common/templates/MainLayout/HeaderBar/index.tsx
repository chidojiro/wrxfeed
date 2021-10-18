import React from 'react';
import { Popover } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import { classNames } from '@common/utils';
import { UserPlusIcon } from '@assets/index';
import {
  BellIcon,
  FireIcon,
  HomeIcon,
  MenuIcon,
  TrendingUpIcon,
  UserGroupIcon,
  XIcon,
} from '@heroicons/react/outline';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { profileState } from '@auth/containers/ProfileEditForm/states';
import { showInviteModalState } from '@main/organisms/InviteModal/states';
import { UserProfilePopover, NotifyPopover } from '@main/molecules';

export interface HeaderBarProps {
  title?: string;
  showSearchBar: boolean;
}

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: true },
  { name: 'Popular', href: '#', icon: FireIcon, current: false },
  { name: 'Communities', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Trending', href: '#', icon: TrendingUpIcon, current: false },
];

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

const user = {
  name: 'Chelsea Hagon',
  email: 'chelseahagon@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const HeaderBar: React.VFC<HeaderBarProps> = ({ showSearchBar = true }) => {
  const profile = useRecoilValue(profileState);
  const setInviteModal = useSetRecoilState(showInviteModalState);

  const SearchBar = () => {
    return (
      <div className="flex items-center px-6 py-1 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
        <div className="w-full">
          <div className="sr-only">Search</div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-rose-500 focus:border-rose-500 sm:text-sm"
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
      </div>
    );
  };

  const onClickInvite = () => {
    setInviteModal(true);
    return true;
  };

  return (
    <Popover
      as="header"
      className={({ open }) => {
        return classNames([
          open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
          'bg-primary z-40 shadow-sm lg:static lg:overflow-y-visible',
        ]);
      }}
    >
      {({ open }) => (
        <>
          <div className="max-w-8xl flex mx-36 px-4 sm:px-6 lg:px-8 py-4">
            <div className="relative flex w-full justify-between xl:grid xl:grid-cols-12 lg:gap-8">
              <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-white">{profile?.company}</h1>
                </div>
              </div>
              <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                {/* <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0" /> */}
                {!!showSearchBar && <SearchBar />}
              </div>
              <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                {/* Mobile menu button */}
                <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Popover.Button>
              </div>
              <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                <NotifyPopover />
                <div className="bg-white mx-2" style={{ width: '1px', height: '34px' }} />
                <UserProfilePopover />
                <button
                  type="button"
                  onClick={onClickInvite}
                  className="ml-8 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                >
                  <UserPlusIcon className="flex mr-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500" />
                  Invite
                </button>
              </div>
            </div>
          </div>

          {/* for mobile */}
          <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? 'page' : undefined}
                  className={classNames([
                    item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
                    'block rounded-md py-2 px-3 text-base font-medium',
                  ])}
                >
                  {item.name}
                </a>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
                <button
                  type="button"
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
            <div className="mt-6 max-w-3xl mx-auto px-4 sm:px-6">
              <UserPlusIcon />
              <div className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700">
                Invite
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default HeaderBar;
