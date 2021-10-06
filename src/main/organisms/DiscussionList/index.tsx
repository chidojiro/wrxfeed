import React, { useState, useCallback, useEffect } from 'react';
import { Stack, Box, Skeleton } from '@mui/material';
import { useDiscussion } from '@main/hooks';
import { Pagination } from '@api/types';
import { Discussion } from '@main/entity';
import DiscussionItem from '@main/molecules/DiscussionItem';
import InfiniteScroller from '@common/atoms/InfiniteScroller';

export type DiscussionListProps = {
  style?: React.CSSProperties;
};

const LIMIT = 10;

const DiscussionList: React.FC<DiscussionListProps> = ({ style, children }) => {
  const [filter, setFilter] = useState<Pagination>({ offset: 0, limit: LIMIT });
  const { discussions, hasMore, isLoading } = useDiscussion(filter);

  const handleLoadMore = useCallback(() => {
    if (!hasMore || isLoading) return;
    setFilter((prevFilter) => ({
      ...prevFilter,
      offset: prevFilter.offset + prevFilter.limit,
    }));
  }, [hasMore, isLoading]);

  // useEffect(() => {
  //   console.log('Check new discussions = ', discussions);
  // }, [discussions]);

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
        marginTop: '70px',
        width: '70%',
        minWidth: '712px',
        overflow: 'auto',
        paddingRight: 2,
        ...style,
      }}
      onLoadMore={handleLoadMore}
      isLoading={isLoading}
      LoadingComponent={renderLoadingSkeleton()}
    >
      {discussions.map((item: Discussion, index: number) => (
        <React.Fragment key={item.id}>
          <DiscussionItem discussion={item} index={index} />
        </React.Fragment>
      ))}
      {children}
    </InfiniteScroller>
  );
};

export default DiscussionList;
