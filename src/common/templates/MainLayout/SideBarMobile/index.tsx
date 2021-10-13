import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { GroupTab, LeftTab } from '@common/types';
import { classNames } from '@common/utils';

export interface SideBarMobile {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  groupTabs: GroupTab[];
  title: string;
  currentTab: LeftTab;
  setCurrentTab: (tab: LeftTab) => void;
}

export const SideBarMobile: React.VFC<SideBarMobile> = ({
  sidebarOpen,
  setSidebarOpen,
  groupTabs,
  title,
  currentTab,
  setCurrentTab,
}) => {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 flex items-center px-4">
              <h1 className="flex text-black font-bold">{title}</h1>
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto">
              <nav className="px-2 space-y-1">
                {groupTabs.map((item: GroupTab) => {
                  const { tabs, icon: IconView } = item;
                  const isCurrentTab = currentTab.name === item.name;
                  return (
                    <>
                      <div
                        key={item.name}
                        className={classNames([
                          isCurrentTab
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                        ])}
                      >
                        <IconView
                          className={classNames([
                            isCurrentTab
                              ? 'text-gray-500'
                              : 'text-gray-400 group-hover:text-gray-500',
                            'mr-4 flex-shrink-0 h-6 w-6',
                          ])}
                          aria-hidden="true"
                        />
                        {item.name}
                      </div>
                      {tabs.map((leftTab: LeftTab) => {
                        return (
                          <a
                            key={leftTab.name}
                            href={leftTab.href}
                            className={classNames([
                              isCurrentTab
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                            ])}
                            onClick={() => setCurrentTab(leftTab)}
                          >
                            <div className="mr-4 flex-shrink-0 h-6 w-6" />
                            {leftTab.name}
                          </a>
                        );
                      })}
                    </>
                  );
                })}
              </nav>
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true">
          {/* Dummy element to force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
};
