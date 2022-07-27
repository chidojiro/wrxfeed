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
  } = useFetcher(['profile'], () => ProfileApis.get());

  const {
    data: googleProfile,
    isInitializing: isInitializingGoogleProfile,
    isValidating: isValidatingGoogleProfile,
  } = useFetcher(['googleProfile'], () => ProfileApis.getGoogleProfile());

  const isPermittedToFeature = React.useCallback(
    (feature: ProtectedFeatures): boolean => {
      return !!UserPermissions[feature]?.some((permissionRole) =>
        googleProfile?.roles?.includes(permissionRole),
      );
    },
    [googleProfile?.roles],
  );

  const combineProfile = React.useMemo<(Profile & GoogleProfile) | undefined>(
    () => (profile && googleProfile ? { ...profile, ...googleProfile } : undefined),
    [googleProfile, profile],
  );

  return React.useMemo(
    () => ({
      data: combineProfile,
      isPermittedToFeature,
      isInitializing: isInitializingGoogleProfile || isInitializingProfile,
      isValidating: isValidatingGoogleProfile || isValidatingProfile,
      mutate,
    }),
    [
      combineProfile,
      isInitializingGoogleProfile,
      isInitializingProfile,
      isPermittedToFeature,
      isValidatingGoogleProfile,
      isValidatingProfile,
      mutate,
    ],
  );
};
