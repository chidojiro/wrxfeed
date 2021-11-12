import React, { CSSProperties } from 'react';
import NotificationCard from '@main/molecules/NotificationCard';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Notification } from '@main/entity';
import ListLoading from '@main/atoms/ListLoading';
import TransactionListEnd from '@main/atoms/TransactionListEnd';

interface NotificationListProps {
  style?: CSSProperties;
  notifications: Notification[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onClickNotification: (item: Notification) => void;
}

const NotificationList: React.VFC<NotificationListProps> = ({
  style,
  notifications,
  isLoading,
  hasMore,
  onLoadMore,
  onClickNotification,
}) => {
  const renderEmptyList = () => (
    <div className="pb-5 text-center">
      <svg
        className="mx-auto h-8 w-8 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        />
      </svg>
      <h3 className="mt-2 text-sm text-Gray-3">No notifications</h3>
    </div>
  );

  return (
    <InfiniteScroller
      className="pb-12 mr-0.5"
      style={{ ...style }}
      onLoadMore={onLoadMore}
      isLoading={isLoading}
      LoadingComponent={<ListLoading />}
    >
      <ul className="pb-5 space-y-0.5">
        {notifications.map((item) => (
          <NotificationCard key={item.id} item={item} onClick={onClickNotification} />
        ))}
      </ul>
      {!isLoading && !notifications.length && renderEmptyList()}
      {!isLoading && !hasMore && <TransactionListEnd />}
    </InfiniteScroller>
  );
};

export default NotificationList;
