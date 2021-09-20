import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ActivityForm, { ActivityFormProps } from '../../organisms/ActivityForm';
import { ErrorFallback, ErrorHandler, isUnauthenticated, useErrorHandler } from '../../../error';
import LoadingFallback from '../../../common/atoms/LoadingFallback';
import { ActivityFormModel } from '../../types';
import { useActivityDetail, useRefreshActivityDetail } from './hooks';

export interface ActivityEditFormProps {
  activityId: string;
  onSubmit: ActivityFormProps['onSubmit'];
}

const LoadableActivityEditForm: React.VFC<ActivityEditFormProps> = ({ activityId, onSubmit }) => {
  const activity = useActivityDetail(activityId);
  const formValues: ActivityFormModel = {
    content: activity.content,
    tags: activity.tags,
    time: new Date(activity.time),
    income: activity.income || '',
    outcome: activity.outcome || '',
  };
  return <ActivityForm defaultValues={formValues} onSubmit={onSubmit} />;
};

const ActivityEditForm: React.VFC<ActivityEditFormProps> = ({ activityId, onSubmit }) => {
  const [flag, refresh] = useRefreshActivityDetail();
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
        <LoadableActivityEditForm activityId={activityId} onSubmit={onSubmit} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default ActivityEditForm;
