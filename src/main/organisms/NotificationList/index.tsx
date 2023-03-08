import React, { CSSProperties } from 'react';
import NotificationItem from '@/main/molecules/NotificationItem';
import { Notification } from '@/main/entity';
import ListLoading from '@/main/atoms/ListLoading';
import ListEndComponent from '@/main/atoms/ListEndComponent';

import mixpanel from 'mixpanel-browser';
import { useProfile } from '@/profile/useProfile';
import InfiniteScroller from '@/common/atoms/InfiniteScroller';
import { identifyMixPanelUserProfile } from '@/mixpanel/useMixPanel';
import { useMountEffect } from '@/common/hooks';

interface NotificationListProps {
  style?: CSSProperties;
  notifications: Notification[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onClickNotification: (item: Notification) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  style,
  notifications,
  isLoading,
  onLoadMore,
  onClickNotification,
  hasMore,
}) => {
  const { profile } = useProfile();

  useMountEffect(() => {
    mixpanel.track('Notifications View', {
      user_id: profile?.id,
      email: profile?.email,
      company_id: profile?.company?.id,
    });
    identifyMixPanelUserProfile(profile);
  });

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
      className="pb-2 mr-0.5"
      style={{ ...style }}
      onLoadMore={onLoadMore}
      isLoading={isLoading}
      LoadingComponent={<ListLoading />}
    >
      <ul className="pb-5 space-y-0.5">
        {notifications.map((item) => (
          <NotificationItem key={item.id} item={item} onClick={onClickNotification} />
        ))}
      </ul>
      {!isLoading && !notifications.length && renderEmptyList()}
      {!isLoading && notifications.length > 0 && !hasMore && <ListEndComponent />}
    </InfiniteScroller>
  );
};

export default NotificationList;
