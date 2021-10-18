import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { NotifyIcon } from '@assets';

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

export interface NotifyPopoverProps {
  style?: React.CSSProperties;
}

const NotifyPopover: React.VFC<NotifyPopoverProps> = ({ style }) => {
  return (
    <Popover as="div" className="flex-shrink-0 relative ml-5">
      <Popover.Button className="mr-2 rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
        <div className="flex h-6 w-6 justify-center items-center">
          <NotifyIcon aria-hidden="true" />
        </div>
      </Popover.Button>
      <Popover.Panel>
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
            style={{ minWidth: '430px', ...style }}
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
                    key={`profileInfos${item.id}`}
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
      </Popover.Panel>
    </Popover>
  );
};

export default NotifyPopover;
