import { CategoryApis } from '@/category/apis';
import { InfiniteLoader, InfiniteLoaderRenderProps } from '@/common/components';
import { useHandler, useInfiniteData } from '@/common/hooks';
import { NotifyBanner } from '@/layout/NotifyBanner';
import ListLoading from '@/main/atoms/ListLoading';
import { Category, FeedItem, Visibility } from '@/main/entity';
import { PaginationParams } from '@/rest/types';
import { TargetApis } from '@/target/apis';
import { UpdateTargetPayload } from '@/target/types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { FeedApis } from './apis';
import { FeedCard } from './FeedCard';
import { TransactionsFeedCardProps } from './FeedCard/TransactionsFeedCard';
import { LineItemDrawer, useLineItemDrawer } from './LineItemDrawer';
import { FeedMode } from './types';

type FeedsProps = Pick<TransactionsFeedCardProps, 'categoryRedirectHref'> & {
  departmentId?: number;
  mode?: FeedMode;
  categoryId?: number;
  vendorId?: number;
};

export const Feeds = ({
  departmentId,
  mode,
  categoryId,
  vendorId,
  categoryRedirectHref,
}: FeedsProps) => {
  const { isLineItemDrawerOpen, selectedLineItem, closeLineItemDrawer, feedId } =
    useLineItemDrawer();

  const {
    data: feeds,
    loadMore,
    update: updateFeed,
    delete: deleteFeed,
  } = useInfiniteData((paginationParams: PaginationParams) =>
    FeedApis.getList({ ...paginationParams, mode, departmentId, categoryId, vendorId }),
  );

  const { handle: updateCategory } = useHandler(CategoryApis.update);
  const { handle: updateTarget } = useHandler(TargetApis.update);
  const { handle: deleteTarget } = useHandler(TargetApis.delete);

  const handleUpdateCategory = async (feed: FeedItem, category: Category) => {
    const res = await updateCategory(category.id, category);

    updateFeed(feed.id, { ...feed, category });

    return res;
  };

  const handleUpdateTarget = async (
    feed: FeedItem,
    targetId: number,
    target: UpdateTargetPayload,
  ) => {
    const res = await updateTarget(targetId, target);

    updateFeed(feed.id, { ...feed, target: res });

    return res;
  };

  const handleDeleteTarget = async (feed: FeedItem, targetId: number) => {
    const res = await deleteTarget(targetId);

    deleteFeed(feed.id);

    return res;
  };

  const renderInfiniteLoader = ({ isExhausted, anchorRef }: InfiniteLoaderRenderProps) => {
    if (isExhausted && !feeds.length)
      return (
        <div className="pb-2 sm:pb-5 text-center">
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
          <h3 className="mt-2 text-sm text-Gray-3">No rollups now!</h3>
        </div>
      );

    if (isExhausted && !!feeds.length)
      return (
        <p className={clsx('text-base text-center text-Neutral-4')}>
          Add to your feed by
          <Link to="/departments" className="ml-1 text-Gray-3 underline">
            <u>following more teams</u>
          </Link>
          <span role="img" aria-label="rocket">
            {' '}
            🚀
          </span>
        </p>
      );

    return <ListLoading ref={anchorRef} />;
  };

  return (
    <div>
      <LineItemDrawer
        open={isLineItemDrawerOpen}
        onClose={closeLineItemDrawer}
        lineItem={selectedLineItem!}
        feedId={feedId}
      />
      <ul className="space-y-4">
        {feeds.map((feed) => (
          <FeedCard
            key={feed.id}
            feed={feed}
            categoryRedirectHref={categoryRedirectHref}
            onHideCategoryConfirm={() => {
              handleUpdateCategory(feed, {
                ...feed.category,
                visibility: Visibility.HIDDEN,
              });
              NotifyBanner.info('You have hidden this line item!');
            }}
            onShowCategoryConfirm={() => {
              handleUpdateCategory(feed, {
                ...feed.category,
                visibility: Visibility.VISIBLE,
              });
              NotifyBanner.info('You have unhidden this line item!');
            }}
            onDeleteTarget={(id) => handleDeleteTarget(feed, id)}
            onUpdateTarget={(targetId, target) => handleUpdateTarget(feed, targetId, target)}
          />
        ))}
      </ul>
      <div className="mt-4">
        <InfiniteLoader mode="ON_SIGHT" itemsPerLoad={5} onLoad={loadMore}>
          {renderInfiniteLoader}
        </InfiniteLoader>
      </div>
    </div>
  );
};
