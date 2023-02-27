import { ListLoader } from '@/common/components';
import { useFetcher, useHandler, useNavUtils } from '@/common/hooks';
import { FeedApis } from '@/feed/apis';
import { fallbackFeed } from '@/feed/constants';
import { FeedCard } from '@/feed/FeedCard';
import { LineItemDrawer, useLineItemDrawer } from '@/feed/LineItemDrawer';
import { MainLayout } from '@/layout/MainLayout';
import { Routes } from '@/routing/routes';
import { TargetApis } from '@/target/apis';
import React from 'react';
import { useParams } from 'react-router-dom';

export const FeedPage: React.FC = () => {
  const { redirect } = useNavUtils();
  const params = useParams<{ id: string }>();

  const feedId = +params.id;

  const {
    isLineItemDrawerOpen,
    selectedLineItem,
    closeLineItemDrawer,
    feedId: feedIdDetailView,
  } = useLineItemDrawer();

  const {
    data: feedItem,
    mutate,
    isValidating,
    error,
  } = useFetcher(!!feedId && ['feed', feedId], () => FeedApis.get(feedId));

  const goBackToDashboard = () => {
    redirect(Routes.Dashboard.path as string);
  };

  const { handle: updateTarget } = useHandler(TargetApis.update, {
    onSuccess: () => mutate(),
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
      <div className="w-full h-full hide-scrollbar invisible-scrollbar">
        <ListLoader loading={isValidating}>
          {feedItem && (
            <FeedCard
              feed={feedItem ?? fallbackFeed}
              defaultExpand
              categoryRedirectHref={(category) => `/categories/${category?.id.toString()}`}
              onDeleteTarget={deleteTarget}
              onUpdateTarget={updateTarget}
            />
          )}
        </ListLoader>
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
