import { useLocalStorageState } from './../common/hooks/useLocalStorageState/useLocalStorageState';
import { ProtectedFeatures, UserPermissions } from '@/auth/constants';
import { useFetcher } from '@/common/hooks';
import React from 'react';
import { ProfileApis } from './apis';
import { GoogleProfile, Profile } from './types';

export const useProfile = () => {
  const [localStorageProfile, setLocalStorageProfile] = useLocalStorageState<Profile | null>(
    'profile',
    null,
  );
  const [localStorageGoogleProfile, setLocalStorageGoogleProfile] =
    useLocalStorageState<GoogleProfile | null>('googleProfile', null);

  const {
    data: profile,
    isInitializing: isInitializingProfile,
    isValidating: isValidatingProfile,
    mutate,
  } = useFetcher(['profile'], () => ProfileApis.get(), {
    fallbackData: localStorageProfile,
    onSuccess: setLocalStorageProfile,
  });

  const {
    data: googleProfile,
    isInitializing: isInitializingGoogleProfile,
    isValidating: isValidatingGoogleProfile,
  } = useFetcher(['googleProfile'], () => ProfileApis.getGoogleProfile(), {
    fallbackData: localStorageGoogleProfile,
    onSuccess: setLocalStorageGoogleProfile,
  });

  const isPermittedToFeature = React.useCallback(
    (feature: ProtectedFeatures): boolean => {
      return !!UserPermissions[feature]?.some((permissionRole) =>
        googleProfile?.roles?.some(({ name }) => name === permissionRole),
      );
    },
    [googleProfile],
  );

  const combinedProfile = React.useMemo<(Profile & GoogleProfile) | undefined>(
    () => (profile && googleProfile ? { ...profile, ...googleProfile } : undefined),
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
