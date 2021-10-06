import React, { useCallback, useState, useRef } from 'react';
import { Box, Divider, Skeleton, Stack } from '@mui/material';
import TransactionItem from '@main/molecules/TransactionItem';
import { useTransaction } from '@main/hooks';
// import InfiniteScroll from 'react-infinite-scroller';
import { Pagination } from '@api/types';
import InfiniteScroller, { InfiniteScrollerHandle } from '@common/atoms/InfiniteScroller';

const LIMIT = 10;

const TransactionList: React.VFC = () => {
  const [filter, setFilter] = useState<Pagination>({ offset: 0, limit: LIMIT });
  const { transactions, hasMore, isLoading } = useTransaction(filter);
  const listViewRef = useRef<InfiniteScrollerHandle>(null);

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setFilter((prevFilter) => ({
      ...prevFilter,
      offset: prevFilter.offset + prevFilter.limit,
    }));
  }, [hasMore, isLoading]);

  const renderLoadingSkeleton = () => (
    <Stack sx={{ ml: 1 }} direction="row">
      <Box sx={{ margin: 1 }}>
        <Skeleton variant="circular" width={32} height={32} />
      </Box>
      <Box sx={{ width: '100%', mr: 3, mt: 1, ml: 1 }}>
        <Skeleton sx={{ borderRadius: 1 }} animation="wave" width="100%" />
        <Skeleton sx={{ borderRadius: 1, mt: 3 }} variant="rectangular" width="100%" height={50} />
      </Box>
    </Stack>
  );

  return (
    <InfiniteScroller
      ref={listViewRef}
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'auto',
        mr: 2,
      }}
      onLoadMore={handleLoadMore}
      isLoading={isLoading}
      LoadingComponent={renderLoadingSkeleton()}
    >
      {transactions.map((transaction) => (
        <React.Fragment key={transaction.id}>
          <Divider />
          <TransactionItem transaction={transaction} />
        </React.Fragment>
      ))}
    </InfiniteScroller>
  );
};

export default TransactionList;
