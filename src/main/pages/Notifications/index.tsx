import { MainLayout } from '@/layout/MainLayout';
import { Notification } from '@/main/entity';
import { useNotification } from '@/main/hooks';
import { NotificationApis } from '@/notification/apis';
import { PaginationParams } from '@/rest/types';
import { Routes } from '@/routing/routes';
import React from 'react';
import { useHistory } from 'react-router-dom';
import NotificationList from '../../organisms/NotificationList';

const LIMIT_GET_NOTIFICATIONS = 30;

const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT_GET_NOTIFICATIONS,
});

export const NotificationsPage = () => {
  const [filter, setFilter] = React.useState<PaginationParams>(INIT_PAGINATION);
  const { notifications, isLoading, hasMore, patchNotification } = useNotification(filter);
  const history = useHistory();

  React.useEffect(() => {
    NotificationApis.markAllAsRead();
  }, []);

  const handleLoadMore = React.useCallback(() => {
    if (!hasMore || isLoading) return;
    setFilter((prevFilter) => ({
      limit: prevFilter?.limit ?? 0,
      offset: (prevFilter?.offset ?? 0) + (prevFilter?.limit ?? 0),
    }));
  }, [hasMore, isLoading]);

  const onClickNotification = async (item: Notification) => {
    history.push(`${(Routes.Feed.path as string).replace(':id', `${item.data?.itemId}`)}`);
    patchNotification(item?.id);
  };

  return (
    <MainLayout>
      <h1 className="sr-only">Notifications feed</h1>
      <div className="flex items-center space-x-4 pb-6">
        <h1 className="text-Gray-3 text-xl font-semibold ml-4 sm:ml-0">Notifications</h1>
      </div>
      <NotificationList
        notifications={notifications}
        isLoading={isLoading}
        onLoadMore={handleLoadMore}
        onClickNotification={onClickNotification}
        hasMore={hasMore}
      />
    </MainLayout>
  );
};
