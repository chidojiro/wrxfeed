import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { MenuAlt2Icon } from '@heroicons/react/outline';
import { classNames } from '@common/utils';
import { SearchIcon } from '@heroicons/react/solid';
import { NotifyIcon } from '@assets/index';

const FormSearch = () => {
  return (
    <form className="w-full flex md:ml-0" action="#" method="GET">
      <div className="sr-only">Search</div>
      <div className="relative w-full text-gray-400 focus-within:text-gray-600">
        <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none bg-primary">
          <SearchIcon className="h-5 w-5 color-white" aria-hidden="true" />
        </div>
        <input
          id="search-field"
          className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm bg-primary"
          placeholder="Search ..."
          type="search"
          name="search"
        />
      </div>
    </form>
  );
};

export interface HeaderWithSearchAndAvatarProps {
  setSidebarOpen: (open: boolean) => void;
}

const profileMenus = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

const HeaderWithSearchAndAvatar: React.VFC<HeaderWithSearchAndAvatarProps> = ({
  setSidebarOpen,
}) => {
  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-primary shadow">
      <button
        type="button"
        className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex">
          <FormSearch />
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <button
            type="button"
            className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="sr-only">View notifications</span>
            <div className="flex h-6 w-6 justify-center items-center">
              <NotifyIcon aria-hidden="true" />
            </div>
          </button>

          <div className="bg-white mx-2" style={{ width: '1px', height: '34px' }} />

          {/* Profile dropdown */}
          <Menu as="div" className="ml-3 relative mr-32">
            <div>
              <Menu.Button className="max-w-xs bg-primary flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
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
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                {profileMenus.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) => (
                      <a
                        href={item.href}
                        className={classNames([
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700',
                        ])}
                      >
                        {item.name}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default HeaderWithSearchAndAvatar;
