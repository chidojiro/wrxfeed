/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import MainLayout, { MainRightSide } from '@common/templates/MainLayout';
import TargetPanel from '@main/organisms/TargetPanel';
import FeedList from '@main/organisms/FeedList';
// import { useRecoilValue } from 'recoil';
// import { rollupsState } from '@main/states/rollup.state';
import { useFeed } from '@main/hooks/feed.hook';
import { Pagination } from '@api/types';

const LIMIT = 10;
const INIT_PAGINATION = Object.freeze({
  offset: 0,
  limit: LIMIT,
});

const CompanyPage: React.VFC = () => {
  // const rollups = useRecoilValue(rollupsState);
  const [page, setPage] = React.useState<Pagination>(INIT_PAGINATION);
  const { feedItems, hasMore, isLoading } = useFeed(page);
  const handleLoadMore = React.useCallback(() => {
    if (!hasMore || isLoading) return;
    setPage((prevPage) => ({
      limit: prevPage?.limit ?? 0,
      offset: (prevPage?.offset ?? 0) + (prevPage?.limit ?? 0),
    }));
  }, [hasMore, isLoading]);

  return (
    <MainLayout>
      <h1 className="sr-only">Feed list</h1>
      <FeedList
        feedItems={feedItems}
        onLoadMore={handleLoadMore}
        isLoading={isLoading}
        hasMore={hasMore}
      />
      <MainRightSide>
        <TargetPanel />
      </MainRightSide>
    </MainLayout>
  );
};

export default CompanyPage;
