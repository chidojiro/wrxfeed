import React from 'react';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import TargetPanel from '@main/organisms/TargetPanel';
import { Pagination } from '@api/types';
import { useNotification } from '@main/hooks';
import Routes from '@src/routes';
import { Notification } from '@main/entity';
import { useHistory } from 'react-router-dom';
import NotificationList from '../../organisms/NotificationList';

const LIMIT = 30;

const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const Notifications: React.VFC = () => {
  const [filter, setFilter] = React.useState<Pagination>(INIT_PAGINATION);
  const { notifications, isLoading, hasMore, patchNotification } = useNotification(filter);
  const history = useHistory();

  const handleLoadMore = React.useCallback(() => {
    if (!hasMore || isLoading) return;
    setFilter((prevFilter) => ({
      limit: prevFilter?.limit ?? 0,
      offset: (prevFilter?.offset ?? 0) + (prevFilter?.limit ?? 0),
    }));
  }, [hasMore, isLoading]);

  const onClickNotification = async (item: Notification) => {
    history.push(`${(Routes.Feed.path as string).replace(':id', `${item.data?.transactionId}`)}`);
    patchNotification(item.id);
  };

  return (
    <MainLayout>
      <h1 className="sr-only">Notifications feed</h1>
      <div className="flex items-center space-x-4 pb-6">
        <h1 className="text-Gray-3 text-xl font-semibold">Notifications</h1>
      </div>
      <NotificationList
        notifications={notifications}
        isLoading={isLoading}
        onLoadMore={handleLoadMore}
        onClickNotification={onClickNotification}
      />
      <MainRightSide>
        <TargetPanel />
      </MainRightSide>
    </MainLayout>
  );
};

export default Notifications;
