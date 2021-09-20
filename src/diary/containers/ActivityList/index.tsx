import React from 'react';
import { useRecoilState } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import Typography from '@mui/material/Typography';
import { activityFilterState } from '../../states';
import { ErrorHandler, isUnauthenticated, useErrorHandler } from '../../../error';
import Pagination from '../../../common/molecules/Pagination';
import LoadingFallback from '../../../common/atoms/LoadingFallback';
import ErrorFallback from '../../../error/organisms/ErrorFallback';
import ActivityListView from '../../organisms/ActivityList';
import { useActivityList, useRefreshActivityList } from '../../hooks';

const LoadableActivityList: React.VFC = () => {
  const [activities, pageCount] = useActivityList();
  const [filter, setFilter] = useRecoilState(activityFilterState);
  const handlePageChange = React.useCallback(
    (event: React.ChangeEvent<unknown>, newPage: number) => {
      setFilter((curFilter) => ({
        ...curFilter,
        page: newPage,
      }));
    },
    [setFilter],
  );
  return activities.length ? (
    <>
      <ActivityListView models={activities} />
      {pageCount > 1 && (
        <Pagination page={filter.page} onChange={handlePageChange} count={pageCount} />
      )}
    </>
  ) : (
    <Typography align="center" variant="body1">
      There&apos;s no items to display.
    </Typography>
  );
};

const ActivityList: React.VFC = () => {
  const [flag, refresh] = useRefreshActivityList();
  const defaultHandler = useErrorHandler();
  const handleError: ErrorHandler = React.useCallback(
    async (error) => {
      if (isUnauthenticated(error)) {
        defaultHandler(error);
      }
    },
    [defaultHandler],
  );

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={refresh}
      resetKeys={[flag]}
      onError={handleError}
    >
      <React.Suspense fallback={<LoadingFallback />}>
        <LoadableActivityList />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default ActivityList;
