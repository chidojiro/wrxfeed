import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingFallback from '@/common/atoms/LoadingFallback';
import { ErrorFallback } from '@/error';
import ProfileForm, { ProfileFormProps } from '../../organisms/ProfileForm';
import { useProfile, useRefreshProfile } from './hooks';

export type ProfileEditFormProps = Omit<ProfileFormProps, 'defaultValues'>;

const LoadableProfileForm: React.FC<ProfileEditFormProps> = ({ onSubmit }) => {
  const profile = useProfile();
  return <ProfileForm defaultValues={profile} onSubmit={onSubmit} />;
};

const ProfileEditForm: React.FC<ProfileEditFormProps> = (props) => {
  const [flag, refresh] = useRefreshProfile();

  // Workaround to fix type incompatibility
  const ErrorBoundaryAsAny = ErrorBoundary as any;

  return (
    <ErrorBoundaryAsAny FallbackComponent={ErrorFallback} onReset={refresh} resetKeys={[flag]}>
      <React.Suspense fallback={<LoadingFallback />}>
        <LoadableProfileForm {...props} />
      </React.Suspense>
    </ErrorBoundaryAsAny>
  );
};

export default ProfileEditForm;
