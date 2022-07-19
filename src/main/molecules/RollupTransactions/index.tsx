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
import { DEFAULT_ITEMS_PER_INFINITE_LOAD } from '@/common/constants';
import { LoadMoreButton } from './LoadMoreButton';

export const TRANSACTION_SHOW_NUMBER = 10;

type RollupTransactionsProps = ClassName & {
  feed: FeedItem;
  defaultExpand?: boolean;
};

const RollupTransactions = ({ feed, defaultExpand }: RollupTransactionsProps) => {
  const { openLineItemDrawer } = useLineItemDrawer();

  const [loadedTransactions, setLoadedTransactions] = React.useState<Transaction[]>(
    defaultExpand ? feed.transactions : [],
  );

  const expandInitialTransactions = () => {
    setLoadedTransactions(feed.transactions);
  };

  const renderLoadButton = ({ isExhausted, loadMore, isLoading }: InfiniteLoaderRenderProps) => {
    const hasExpandedInitialTransactions = feed.transactions.length && loadedTransactions.length;

    if (!hasExpandedInitialTransactions)
      return <LoadMoreButton onClick={expandInitialTransactions}>View Transactions</LoadMoreButton>;

    if (feed.transactions.length === DEFAULT_ITEMS_PER_INFINITE_LOAD && !isExhausted)
      return (
        <LoadMoreButton disabled={isLoading} onClick={loadMore}>
          Load More
        </LoadMoreButton>
      );

    return null;
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
            <li key={item?.id}>
              <RollupTranRow tran={item} onView={(item) => openLineItemDrawer(item, feed.id)} />
            </li>
          );
        })}
      </ul>
      <RestrictedWarning className="mb-1" show={feed.hidden && !!loadedTransactions.length} />
      <div className="relative flex items-center">
        <Divider className="my-2" />
        <InfiniteLoader<Transaction[]>
          defaultPage={1}
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
