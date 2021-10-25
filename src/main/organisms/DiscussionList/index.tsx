import React, { useState, useCallback } from 'react';
import { useDiscussion } from '@main/hooks';
import { Pagination } from '@api/types';
import { Discussion } from '@main/entity';
import DiscussionItem from '@main/molecules/DiscussionItem';
import InfiniteScroller from '@common/atoms/InfiniteScroller';
import ListLoading from '@main/atoms/ListLoading';

export type DiscussionListProps = {
  style?: React.CSSProperties;
};

const LIMIT = 20;

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

  return (
    <InfiniteScroller
      style={{
        overflow: 'scroll',
        ...style,
      }}
      onLoadMore={handleLoadMore}
      isLoading={isLoading}
      LoadingComponent={<ListLoading />}
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
