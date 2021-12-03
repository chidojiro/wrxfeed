/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import TargetPanel from '@main/organisms/TargetPanel';
import FeedList from '@main/organisms/FeedList';
import { useFeed } from '@main/hooks/feed.hook';
import { GetFeedsFilters } from '@api/types';

const LIMIT = 10;
const INIT_FEED_FILTER = Object.freeze({
  page: {
    offset: 0,
    limit: LIMIT,
  },
  forYou: 0,
});

const CompanyPage: React.VFC = () => {
  // const rollups = useRecoilValue(rollupsState);
  const [feedFilters, setFeedFilters] = React.useState<GetFeedsFilters>(INIT_FEED_FILTER);
  const { feeds, hasMore, isLoading } = useFeed(feedFilters);
  const handleLoadMore = React.useCallback(() => {
    if (!hasMore || isLoading) return;
    setFeedFilters((prevFilters) => ({
      page: {
        limit: prevFilters?.page.limit ?? 0,
        offset: (prevFilters?.page?.offset ?? 0) + (prevFilters?.page?.limit ?? 0),
      },
      forYou: 0,
    }));
  }, [hasMore, isLoading]);

  return (
    <MainLayout>
      <h1 className="sr-only">Feed list</h1>
      <FeedList feeds={feeds} onLoadMore={handleLoadMore} isLoading={isLoading} hasMore={hasMore} />
      <MainRightSide>
        <TargetPanel />
      </MainRightSide>
    </MainLayout>
  );
};

export default CompanyPage;
