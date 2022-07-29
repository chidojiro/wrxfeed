import { ProtectedFeatures, UserPermissions } from '@/auth/constants';
import { useFetcher } from '@/common/hooks';
import React from 'react';
import { ProfileApis } from './apis';
import { GoogleProfile, Profile } from './types';

export const useProfile = () => {
  const {
    data: profile,
    isInitializing: isInitializingProfile,
    isValidating: isValidatingProfile,
    mutate,
  } = useFetcher(['profile'], () => ProfileApis.get(), { suspense: true });

  const {
    data: googleProfile,
    isInitializing: isInitializingGoogleProfile,
    isValidating: isValidatingGoogleProfile,
  } = useFetcher(['googleProfile'], () => ProfileApis.getGoogleProfile(), { suspense: true });

  const isPermittedToFeature = React.useCallback(
    (feature: ProtectedFeatures): boolean => {
      return !!UserPermissions[feature]?.some((permissionRole) =>
        googleProfile?.roles?.includes(permissionRole),
      );
    },
    [googleProfile?.roles],
  );

  const combinedProfile = React.useMemo<Profile & GoogleProfile>(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => ({ ...profile!, ...googleProfile! }),
    [googleProfile, profile],
  );

  return React.useMemo(
    () => ({
      profile: combinedProfile,
      isPermittedToFeature,
      isInitializingProfile: isInitializingGoogleProfile || isInitializingProfile,
      isValidatingProfile: isValidatingGoogleProfile || isValidatingProfile,
      mutateProfile: mutate,
    }),
    [
      combinedProfile,
      isInitializingGoogleProfile,
      isInitializingProfile,
      isPermittedToFeature,
      isValidatingGoogleProfile,
      isValidatingProfile,
      mutate,
    ],
  );
};
