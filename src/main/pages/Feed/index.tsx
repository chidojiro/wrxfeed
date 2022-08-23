import { OverlayLoader } from '@/common/components';
import { useHandler, useLegacyQuery, useNavUtils } from '@/common/hooks';
import { ApiErrorCode } from '@/error/types';
import { isApiError } from '@/error/utils';
import { FeedApis } from '@/feed/apis';
import { fallbackFeed } from '@/feed/constants';
import { FeedCard } from '@/feed/FeedCard';
import { LineItemDrawer, useLineItemDrawer } from '@/feed/LineItemDrawer';
import { MainLayout } from '@/layout/MainLayout';
import { FeedItem, FeedRouteType } from '@/main/entity';
import { Routes } from '@/routing/routes';
import { TargetApis } from '@/target/apis';
import React, { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const FeedPage: React.FC = () => {
  const history = useHistory();
  const { redirect } = useNavUtils();
  const query = useLegacyQuery();
  const params = useParams<{ id: string }>();
  const [feedItem, setFeedItem] = useState<FeedItem | undefined>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const errorHandler = useErrorHandler();
  const route = query.get('route');
  const [error, setError] = useState(false);

  const feedId = +params.id;

  const {
    isLineItemDrawerOpen,
    selectedLineItem,
    closeLineItemDrawer,
    feedId: feedIdDetailView,
  } = useLineItemDrawer();

  const getFeedItem = async (id: number) => {
    try {
      setLoading(true);
      const res = await FeedApis.get(id);
      setFeedItem(res);
    } catch (error: unknown) {
      if (isApiError(error)) {
        if (error.code === ApiErrorCode.Notfound) {
          history.push('/404');
        } else {
          toast.error(error.details?.message);
          errorHandler(error);
          setError(true);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const getTargetFeedItem = async (targetId: number) => {
    try {
      setLoading(true);
      const res = await FeedApis.getList({
        offset: 0,
        limit: 10,
        targetId,
      });
      if (res.length > 0) {
        setFeedItem(res[0]);
      }
    } catch (error: unknown) {
      if (isApiError(error)) {
        if (error.code === ApiErrorCode.Notfound) {
          history.push('/404');
        } else {
          toast.error(error.details?.message);
          errorHandler(error);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (route === FeedRouteType.TargetFeed) {
      getTargetFeedItem(feedId);
    } else {
      getFeedItem(feedId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedId, route]);

  const goBackToDashboard = () => {
    redirect(Routes.Dashboard.path as string);
  };

  const { handle: updateTarget } = useHandler(TargetApis.update, {
    onSuccess: (data) => setFeedItem({ ...feedItem!, target: data }),
  });
  const { handle: deleteTarget } = useHandler(TargetApis.delete, { onSuccess: goBackToDashboard });

  const renderFeed = () => {
    if (error) {
      return (
        <div className="flex flex-1 w-full h-[300px] justify-center items-center px-16">
          <span className="flex text-2xl text-Gray-1 font-semibold text-center">
            An error occurred loading this item 😞
            <br />
            please try again later!
          </span>
        </div>
      );
    }

    return (
      <div className="w-full h-full overflow-scroll hide-scrollbar">
        <OverlayLoader loading={isLoading}>
          <FeedCard
            feed={feedItem ?? fallbackFeed}
            categoryRedirectHref={(category) => `/categories/${category?.id.toString()}`}
            onDeleteTarget={deleteTarget}
            onUpdateTarget={updateTarget}
          />
        </OverlayLoader>
        <LineItemDrawer
          open={isLineItemDrawerOpen}
          onClose={closeLineItemDrawer}
          lineItem={selectedLineItem!}
          feedId={feedIdDetailView}
        />
      </div>
    );
  };

  return (
    <MainLayout>
      <h1 className="sr-only">Rollups</h1>
      {renderFeed()}
    </MainLayout>
  );
};
