import React, { Fragment, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { NotifyIcon } from '@assets';
import { useNotification } from '@main/hooks';
import { Pagination } from '@api/types';
import { Notification, NotifyStatus } from '@main/entity';
import { NotifyRow } from '@main/atoms';
import Loading from '@common/atoms/Loading';
import Routes from '@src/routes';
import { useHistory } from 'react-router-dom';
import { classNames } from '@common/utils';

export interface NotifyPopoverProps {
  style?: React.CSSProperties;
  showNumberNotify?: boolean;
  useDropDown?: boolean;
}

const LIMIT = 15;

const NotifyPopover: React.VFC<NotifyPopoverProps> = ({
  style,
  showNumberNotify = false,
  useDropDown = true,
}) => {
  const [filter] = React.useState<Pagination>({ offset: 0, limit: LIMIT });
  const { notifications, isLoading, patchNotification, markAllAsRead } = useNotification(filter);
  const [notifies, setNotifies] = React.useState<Notification[]>([]);
  const [notifyNews, setNews] = React.useState<number>(0);
  const history = useHistory();

  useEffect(() => {
    const notifyUnseen = notifications.filter((item) => item.status === NotifyStatus.UNREAD);
    setNotifies(notifyUnseen);
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
            {'You have no new notifications! \n 🔔'}
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-1 flex-col pb-4 pt-3 overflow-hidden overflow-y-auto max-h-96">
        {notifies.map((item: Notification, index: number) => {
          return (
            <NotifyRow
              key={`notify-row-${item.content}`}
              item={item}
              index={index}
              onClickNotifyAndSeen={async () => {
                history.push(
                  `${(Routes.Feed.path as string).replace(':id', `${item.data.transactionId}`)}`,
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
    if (notifications.length === 0 || notifyNews === 0) return null;
    const onClickMarkAllAsRead = () => {
      markAllAsRead();
    };
    return (
      <button
        onClick={onClickMarkAllAsRead}
        type="button"
        className="flex text-gray-1 mb-4 mr-4 mt-auto ml-auto text-2xs font-semibold"
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
          <div className="absolute flex bg-system-alert top-0 right-1 justify-center items-center border-2 border-primary w-5 h-5 rounded-full">
            {showNumberNotify && (
              <div className="flex text-white font-semibold" style={{ fontSize: '10px' }}>
                {notifyNews}
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
  };

  if (!useDropDown) {
    return (
      <button
        onClick={onClickNotifications}
        type="button"
        className={classNames(
          'rounded-full flex-shrink-0 relative w-10 h-10 focus:outline-none hover:ring-2 ring-offset-2 ring-rose-500',
        )}
      >
        {renderNotifyIconWithBell()}
      </button>
    );
  }

  return (
    <>
      <Popover onBlurCapture={onBlurCapture} as="div" className="flex-shrink-0 relative">
        {({ open }) => (
          <>
            <Popover.Button
              onBlur={onBlurIconButton}
              className={classNames(
                'mr-2 rounded-full flex focus:outline-none',
                open ? 'ring-2 ring-offset-2 ring-rose-500' : '',
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