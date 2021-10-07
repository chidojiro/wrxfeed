import React from 'react';
import { Box, Divider, Skeleton, Stack } from '@mui/material';
import TransactionItem from '@main/molecules/TransactionItem';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import { Transaction } from '@main/entity';
import { TransactionFilter } from '@api/types';

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
  onLoadMore: () => void;
  onFilter?: (key: keyof TransactionFilter, value?: string) => void;
}

const TransactionList: React.VFC<TransactionListProps> = ({
  transactions,
  isLoading,
  onLoadMore,
  onFilter,
}) => {
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
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflow: 'scroll',
        mr: 2,
      }}
      onLoadMore={onLoadMore}
      isLoading={isLoading}
      LoadingComponent={renderLoadingSkeleton()}
    >
      {transactions.map((transaction) => (
        <React.Fragment key={transaction.id}>
          <Divider />
          <TransactionItem
            transaction={transaction}
            onClickVendor={(value) => onFilter && onFilter('vendor', value)}
            onClickDepartment={(value) => onFilter && onFilter('department', value)}
            onClickCategory={(value) => onFilter && onFilter('category', value)}
          />
        </React.Fragment>
      ))}
    </InfiniteScroller>
  );
};

export default TransactionList;
