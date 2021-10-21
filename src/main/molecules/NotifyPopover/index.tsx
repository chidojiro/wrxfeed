import React, { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { NotifyIcon } from '@assets';
import { useNotification } from '@main/hooks';
import { Pagination } from '@api/types';
import { Notification } from '@main/entity';
import { NotifyRow } from '@main/atoms';
import Loading from '@common/atoms/Loading';

export interface NotifyPopoverProps {
  style?: React.CSSProperties;
}

const LIMIT = 10;

export enum NotifyStatus {
  UNREAD = 'UNREAD',
}

const NotifyPopover: React.VFC<NotifyPopoverProps> = ({ style }) => {
  const [filter, setFilter] = React.useState<Pagination>({ offset: 0, limit: LIMIT });
  const { notifications, isLoading, patchNotification, clear } = useNotification(filter);
  const [notifies, setNotifies] = React.useState<Notification[]>([]);
  const [notifyNews, setNews] = React.useState<number>(0);

  React.useEffect(() => {
    // console.log('Check new notifications = ', notifications);
    const notifyUnseen = notifications.filter((item) => item.status === NotifyStatus.UNREAD);
    setNotifies(notifyUnseen);
    // console.log(`Check newNotifyCount = ${newNotifyCount}`);
    setNews(notifyUnseen.length);
  }, [notifications]);

  const renderNotifyList = () => {
    if (isLoading) {
      return (
        <div className="flex h-32 w-full justify-center items-center">
          <Loading />
        </div>
      );
    }

    if (!Array.isArray(notifies) || notifies.length === 0) {
      return (
        <div className="flex h-32 w-full justify-center items-center">
          <div className="flex text-gray-1 text-lg font-medium ">
            {'You currently have no notifications! \n 🔔'}
          </div>
        </div>
      );
    }
    return (
      <div className="flex flex-1 flex-col pb-4 pt-3 overflow-scroll">
        {notifies.map((item: Notification, index: number) => {
          return (
            <NotifyRow
              key={`notify-row-${item.content}`}
              item={item}
              index={index}
              onClickNotifyAndSeen={() => {
                patchNotification(item.id);
                // clear();
                setTimeout(() => {
                  setFilter({
                    offset: 0,
                    limit: LIMIT,
                  });
                }, 500);
              }}
            />
          );
        })}
      </div>
    );
  };

  const renderMarkAllAsRead = () => {
    if (notifications.length === 0 || notifyNews === 0) return null;
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
    <Popover as="div" className="flex-shrink-0 relative">
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
