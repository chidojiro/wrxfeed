import React, { Fragment } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import { classNames } from '@common/utils';
import { NotifyIcon } from '@assets/index';
import {
  BellIcon,
  FireIcon,
  HomeIcon,
  MenuIcon,
  TrendingUpIcon,
  UserGroupIcon,
  XIcon,
} from '@heroicons/react/outline';
// import { useProfile } from '@auth/containers/ProfileEditForm/hooks';
import { useRecoilValue } from 'recoil';
import { profileState } from '@auth/containers/ProfileEditForm/states';

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

const profileInfos = [
  {
    title: 'Name',
    content: 'Steve Schnell',
  },
  {
    title: 'Title',
    content: 'Ceo',
  },
  {
    title: 'Department',
    content: 'Management',
  },
  {
    title: 'Email',
    content: 'steve@gravitylabs.co',
  },
];

const notifies = [
  {
    id: 0,
    title: 'Graham Miller',
    action: 'mentioned you in',
    post: 'Gusto Pay* Arrow',
    content: 'Alex Sivilay looping you in.',
    timestamp: '5 hours ago',
  },
  {
    id: 1,
    title: 'Matt Lock',
    action: 'commented in',
    post: 'Gusto Pay* Arrow',
    content: 'Looping you in.',
    timestamp: '5 hours ago',
  },
  {
    id: 2,
    title: 'Graham Miller',
    action: 'mentioned you in',
    post: 'Gusto Pay* Arrow',
    content: 'Alex Sivilay yes that is correct.',
    timestamp: '5 hours ago',
  },
  {
    id: 3,
    title: 'Alex Sivilay',
    action: 'commented in',
    post: 'Gusto Pay* Arrow',
    content: 'Did you see this item?',
    timestamp: '5 hours ago',
  },
];

const HeaderBar: React.VFC<HeaderBarProps> = ({ showSearchBar = true }) => {
  const profile = useRecoilValue(profileState);
  console.log({ profile });
  const ProfileDropdown = () => {
    return (
      <Menu as="div" className="flex-shrink-0 relative ml-5">
        <>
          <div>
            <Menu.Button className="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
              <span className="sr-only">Open user menu</span>
              <img className="h-8 w-8 rounded-full" src={profile?.avatar} alt="user.imageUrl" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div
              style={{ width: '332px', height: '544px' }}
              className="flex flex-col origin-top-right absolute z-10 right-0 mt-4 shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none bg-white"
            >
              <div className="flex flex-row items-center h-16 w-full border-b-2 px-8">
                <p className="flex text-gray-1 font-medium">Profile</p>
              </div>
              <div className="flex flex-1 flex-col">
                <img
                  alt="user-avatar"
                  className="flex w-36 h-36 rounded-full self-center mt-6"
                  src={user.imageUrl}
                />
                <div className="flex flex-1 flex-col px-11 pt-4">
                  {profileInfos.map((item) => {
                    return (
                      <div key={`profileInfos${item.title}`} className="flex flex-col mt-2">
                        <div className="flex text-sm text-gray-1 font-medium">{item.title}</div>
                        <div className="flex flex-row items-center px-1 py-4 h-10">
                          <p className="flex text-sm text-Gray-6">{item.content}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Transition>
        </>
      </Menu>
    );
  };

  const NotifyDropdown = () => {
    return (
      <Menu as="div" className="flex-shrink-0 relative ml-5">
        <div>
          <Menu.Button className="mr-2 rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
            <span className="sr-only">View notifications</span>
            <div className="flex h-6 w-6 justify-center items-center">
              <NotifyIcon aria-hidden="true" />
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div
            style={{ minWidth: '430px' }}
            className="flex flex-col origin-top-right absolute z-10 right-0 mt-4 shadow-lg bg-white-500 ring-1 ring-black ring-opacity-5 py-1 focus:outline-none bg-white"
          >
            <div className="flex flex-row h-16 w-full border-b-2 pl-8">
              <p className="flex text-gray-1 font-medium self-center">Notifications</p>
              <p className="flex text-gray-1 mb-4 mr-4 mt-auto ml-auto text-xs font-semibold">
                Mark all as read
              </p>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-3">
              {notifies.map((item) => {
                return (
                  <div
                    key={`profileInfos${item.title}`}
                    className="flex flex-col mt-2 max-h-16 px-4 py-2 hover:bg-Gray-hover"
                  >
                    <div className="flex flex-row items-center">
                      <div className="flex flex-row">
                        <div className="flex text-xs text-gray-1 font-bold">{item.title}</div>
                        <div className="flex text-xs text-gray-1 font-regular mx-1">
                          {item.action}
                        </div>
                        <div className="flex text-xs text-gray-1 font-bold">{item.post}</div>
                      </div>
                      <div
                        className="flex text-Gray-6 font-semibold ml-auto"
                        style={{ fontSize: '10px' }}
                      >
                        {item.timestamp}
                      </div>
                    </div>
                    <div className="flex flex-row items-center mt-2">
                      <p className="flex text-xs text-Gray-2">{item.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Transition>
      </Menu>
    );
  };

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
                <NotifyDropdown />
                <div className="bg-white mx-2" style={{ width: '1px', height: '34px' }} />
                <ProfileDropdown />
                <div className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                  New Post
                </div>
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
              <div className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700">
                New Post
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default HeaderBar;
