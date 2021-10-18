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
  const [notifyNews, setNews] = React.useState<number>(3);
  const { discussions } = useDiscussion(filter);

  const renderNotifyList = () => {
    if (!Array.isArray(discussions) || discussions.length === 0) {
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
    if (discussions.length === 0 || notifyNews === 0) return null;
    const onClickMarkAllAsRead = () => setNews(0);
    return (
      <button
        onClick={onClickMarkAllAsRead}
        type="button"
        className="flex text-gray-1 mb-4 mr-4 mt-auto ml-auto text-xs font-semibold"
      >
        Mark all as read
      </button>
    );
  };

  const renderNotifyIconWithBell = () => {
    return (
      <div className="flex h-8 w-8 justify-center items-center">
        <NotifyIcon aria-hidden="true" />
        {!!notifyNews && (
          <div
            className="absolute flex bg-red-500 top-0 right-1 justify-center items-center border-2 border-primary"
            style={{ width: '18px', height: '18px', borderRadius: '15px', top: '1px' }}
          >
            <div className="flex text-white font-semibold" style={{ fontSize: '10px' }}>
              {notifyNews}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Popover as="div" className="flex-shrink-0 relative ml-5">
      <Popover.Button className="mr-2 rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
        {renderNotifyIconWithBell()}
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
            {renderNotifyList()}
          </div>
        </Transition>
      </Popover.Panel>
    </Popover>
  );
};

export default NotifyPopover;
