import React from 'react';
import { Popover } from '@headlessui/react';
import { classNames } from '@main/utils';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useIdentity } from '@identity/hooks';

const NavBar: React.VFC = () => {
  const identity = useIdentity();
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
            <div className="relative flex justify-between min-h-[56px] xl:grid xl:grid-cols-12 lg:gap-8">
              {/* Left space */}
              <div className="flex justify-center md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-white">{identity?.company || 'Gravity'}</h1>
                </div>
              </div>
              {/* Center space */}
              <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                  <h1 className="sr-only">Search</h1>
                </div>
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
                {/* <NotifyDropdown />
                <div className="bg-white mx-2" style={{ width: '1px', height: '34px' }} />
                <ProfileDropdown />
                <div className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
                  New Post
                </div> */}
              </div>
            </div>
          </div>
        </>
      )}
    </Popover>
  );
};

export default NavBar;
