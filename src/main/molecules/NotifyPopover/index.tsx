import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { NotifyIcon } from '@assets';
import { useDiscussion } from '@main/hooks';
import { Pagination } from '@api/types';
import { Discussion } from '@main/entity';
import { NotifyRow } from '@main/atoms';

export interface NotifyPopoverProps {
  style?: React.CSSProperties;
}

const LIMIT = 5;

const NotifyPopover: React.VFC<NotifyPopoverProps> = ({ style }) => {
  const [filter] = React.useState<Pagination>({ offset: 0, limit: LIMIT });
  const { discussions } = useDiscussion(filter);

  React.useEffect(() => {
    console.log('check new discussions = ', discussions);
  }, [discussions]);

  const renderNotifyList = () => {
    if (discussions.length === 0) {
      return (
        <div className="flex h-32 w-full justify-center items-center">
          <div className="flex text-gray-1 text-xl font-medium ">
            {'You currently have no notifications! \n 🔔'}
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-3">
        {discussions.map((item: Discussion, index: number) => {
          return <NotifyRow key={`notify-row-${item.id}`} item={item} index={index} />;
        })}
      </div>
    );
  };

  const renderMarkAllAsRead = () => {
    if (discussions.length === 0) return null;
    return (
      <p className="flex text-gray-1 mb-4 mr-4 mt-auto ml-auto text-xs font-semibold">
        Mark all as read
      </p>
    );
  };

  const renderNotifyIconWithBell = () => {
    return (
      <div>
        <NotifyIcon aria-hidden="true" />
        {/* <div className="absolute bg-red-500">1</div> */}
      </div>
    );
  };

  return (
    <Popover as="div" className="flex-shrink-0 relative ml-5">
      <Popover.Button className="mr-2 rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
        <div className="flex h-6 w-6 justify-center items-center">{renderNotifyIconWithBell()}</div>
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
              {renderMarkAllAsRead()}
            </div>
            {/* {renderNotifyList()} */}
          </div>
        </Transition>
      </Popover.Panel>
    </Popover>
  );
};

export default NotifyPopover;
