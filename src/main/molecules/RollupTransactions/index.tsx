import React from 'react';
import { FeedItem, Transaction } from '@/main/entity';
import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import RollupTranRow from '../RollupTranRow';
import RestrictedWarning from '@/main/atoms/RestrictedWarning';
import { useLineItemDrawer } from '@/feed/useLineItemDrawer';
import { Divider, InfiniteLoader, InfiniteLoaderRenderProps } from '@/common/components';
import { FeedApis } from '@/feed/apis';
import { ClassName } from '@/common/types';
import { useFetcher } from '@/common/hooks';
import { DEFAULT_ITEMS_PER_INFINITE_LOAD } from '@/common/constants';

export const TRANSACTION_SHOW_NUMBER = 10;

type RollupTransactionsProps = ClassName & {
  feed: FeedItem;
  loadOnMount?: boolean;
};

const RollupTransactions: React.FC<RollupTransactionsProps> = ({ feed, loadOnMount }) => {
  const { openLineItemDrawer } = useLineItemDrawer();

  const [loadedTransactions, setLoadedTransactions] = React.useState<Transaction[]>([]);

  useFetcher(
    loadOnMount && ['firstTransactionsLoad'],
    () =>
      FeedApis.getTransactions({
        feedItemId: feed.id,
        limit: DEFAULT_ITEMS_PER_INFINITE_LOAD,
        offset: 0,
      }),
    { onSuccess: setLoadedTransactions },
  );

  const renderLoadButton = ({ isExhausted, loadMore }: InfiniteLoaderRenderProps) => {
    if (isExhausted) return null;

    return (
      <button
        className={clsx(
          StringUtils.withProjectClassNamePrefix('infinite-loader', 'infinite-loader--on-demand'),
          'inline-block text-xs px-4',
          'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
          'bg-white',
        )}
        type="button"
        onClick={loadMore}
      >
        {loadedTransactions.length ? 'Load More' : 'View Transactions'}
      </button>
    );
  };

  return (
    <div className="flex flex-col">
      <ul
        className={clsx(
          StringUtils.withProjectClassNamePrefix('rollup-transactions'),
          'flex flex-col',
          loadedTransactions.length > 0 ? 'py-2' : '',
        )}
      >
        {loadedTransactions.map((item: Transaction) => {
          return (
            <li key={`RollupTransactions-item-${item?.id}`}>
              <RollupTranRow tran={item} onView={(item) => openLineItemDrawer(item, feed.id)} />
            </li>
          );
        })}
      </ul>
      <RestrictedWarning className="mb-1" show={feed.hidden && !!loadedTransactions.length} />
      <div className="relative flex items-center">
        <Divider className="my-4" />
        <InfiniteLoader<Transaction[]>
          defaultPage={loadOnMount ? 1 : 0}
          mode="ON_DEMAND"
          onLoad={(paginationParams) =>
            FeedApis.getTransactions({ feedItemId: feed.id, ...paginationParams })
          }
          onSuccess={(data) => setLoadedTransactions((prev) => [...prev, ...data])}
        >
          {renderLoadButton}
        </InfiniteLoader>
      </div>
    </div>
  );
};

export default RollupTransactions;
