import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ProfileForm, { ProfileFormProps } from '../../organisms/ProfileForm';
import { ErrorFallback, ErrorHandler, isUnauthenticated, useErrorHandler } from '../../../error';
import LoadingFallback from '../../../common/atoms/LoadingFallback';
import { useProfile, useRefreshProfile } from './hooks';

export type ProfileEditFormProps = Omit<ProfileFormProps, 'defaultValues'>;

const LoadableProfileForm: React.VFC<ProfileEditFormProps> = ({ onSubmit }) => {
  const profile = useProfile();
  return <ProfileForm defaultValues={profile} onSubmit={onSubmit} />;
};

const ProfileEditForm: React.VFC<ProfileEditFormProps> = (props) => {
  const [flag, refresh] = useRefreshProfile();
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
        <LoadableProfileForm {...props} />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default ProfileEditForm;
