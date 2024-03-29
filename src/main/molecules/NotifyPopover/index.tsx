import { NotifyIcon } from '@/assets';
import Loading from '@/common/atoms/Loading';
import clsx from 'clsx';
import { NotifyRow } from '@/main/atoms';
import { Notification } from '@/main/entity';
import {
  NotifyChannelEvents,
  NotifyEventData,
  useNotification,
  useNotifyChannel,
} from '@/main/hooks';
import { PaginationParams } from '@/rest/types';
import { Routes } from '@/routing/routes';
import { Popover, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@/common/components';

export interface NotifyPopoverProps {
  style?: React.CSSProperties;
  showNumberNotify?: boolean;
  useDropDown?: boolean;
}

const LIMIT = 15;

const NotifyPopover: React.FC<NotifyPopoverProps> = ({
  style,
  showNumberNotify = false,
  useDropDown = true,
}) => {
  const [filter] = React.useState<PaginationParams>({ offset: 0, limit: useDropDown ? LIMIT : 1 }); // Reduce loading time if we don't need notification popup
  const {
    notifications,
    isLoading,
    patchNotification,
    markAllAsRead,
    setNewNotifyCount,
    newNotifyCount,
  } = useNotification(filter);
  const history = useHistory();

  // Subscribe notify event
  useNotifyChannel(NotifyChannelEvents.NEW_NOTIFY, (data: NotifyEventData) => {
    if (data?.id) {
      // Increase counter
      setNewNotifyCount((preCount) => preCount + 1);
    }
  });

  const renderNotifyList = () => {
    if (isLoading) {
      return (
        <div className="flex h-32 w-full justify-center items-center">
          <Loading />
        </div>
      );
    }

    if (!Array.isArray(notifications) || notifications.length === 0) {
      return (
        <div className="flex h-32 w-full justify-center items-center">
          <div className="flex text-gray-1 text-lg font-medium ">
            {'You have no new notifications! \n 🔔'}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-1 flex-col pb-4 pt-3 overflow-hidden overflow-y-auto max-h-96">
        {notifications.map((item: Notification, index: number) => {
          return (
            <NotifyRow
              key={`notify-row-${item.content}`}
              item={item}
              index={index}
              onClickNotifyAndSeen={async () => {
                history.push(
                  `${(Routes.Feed.path as string).replace(':id', `${item.data.itemId}`)}`,
                );
                patchNotification(item.id);
              }}
            />
          );
        })}
      </div>
    );
  };

  const renderMarkAllAsRead = () => {
    if (notifications.length === 0 || newNotifyCount === 0) return null;
    const onClickMarkAllAsRead = () => {
      markAllAsRead();
    };
    return (
      <Button
        onClick={onClickMarkAllAsRead}
        className="flex text-gray-1 mb-4 mr-4 mt-auto ml-auto text-3xs font-semibold"
      >
        Mark all as read
      </Button>
    );
  };

  const displayNewNotifyCount = newNotifyCount > 99 ? '99+' : newNotifyCount;

  const renderNotifyIconWithBell = () => {
    return (
      <div className="flex h-8 w-8 justify-center items-center rounded-full focus:outline-none hover:ring-2 ring-Accent-2">
        <NotifyIcon className="text-white" aria-hidden="true" />
        {newNotifyCount !== 0 && (
          <div className="absolute flex bg-system-alert top-0 right-1 justify-center items-center border-2 border-primary w-5 h-5 rounded-full">
            {showNumberNotify && (
              <div
                className={clsx('flex text-white font-semibold text-3xs', {
                  'text-[9px]': newNotifyCount > 10,
                })}
              >
                {displayNewNotifyCount}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const onBlurIconButton = () => undefined;
  const onBlurCapture = () => undefined;

  const onClickNotifications = () => {
    history.push('/notifications');
    markAllAsRead();
  };

  if (!useDropDown) {
    return (
      <Button
        onClick={onClickNotifications}
        className={clsx('flex-shrink-0 flex relative w-10 h-10 justify-center items-center')}
      >
        {renderNotifyIconWithBell()}
      </Button>
    );
  }

  return (
    <>
      <Popover onBlurCapture={onBlurCapture} as="div" className="flex-shrink-0 relative">
        {({ open }) => (
          <>
            <Popover.Button
              onBlur={onBlurIconButton}
              className={clsx(
                'mr-2 rounded-full flex focus:outline-none',
                open ? 'ring-2 ring-offset-2 ring-Accent-2' : '',
              )}
            >
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
                  style={{ width: '450px', ...style }}
                  className="flex flex-col origin-top-right absolute z-10 right-0 mt-2 shadow-dropdown bg-white-50 py-1 focus:outline-none bg-white"
                >
                  <div className="flex flex-row h-16 w-full border-b-2 pl-8">
                    <p className="flex text-gray-1 font-medium self-center">Notifications</p>
                    {renderMarkAllAsRead()}
                  </div>
                  {renderNotifyList()}
                </div>
              </Transition>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
  );
};

export default NotifyPopover;
