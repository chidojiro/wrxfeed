import { AuthProfile } from '@auth/types';
import { useCallback } from 'react';
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil';
import { ProtectedFeatures, UserPermissions } from './constants';
import { authProfileState, identityState } from './states';
import { Identity } from './types';

export function useIdentity(): Identity | undefined {
  return useRecoilValue(identityState);
}

export function useSetIdentity(): SetterOrUpdater<Identity | undefined> {
  return useSetRecoilState(identityState);
}

interface PermissionHookValues extends AuthProfile {
  checkPermission: (feature: ProtectedFeatures) => boolean;
}

export function usePermission(): PermissionHookValues {
  const authProfile = useRecoilValue(authProfileState);

  const checkPermission = useCallback(
    (feature: ProtectedFeatures): boolean => {
      return !!UserPermissions[feature]?.some((permissionRole) =>
        authProfile?.roles?.includes(permissionRole),
      );
    },
    [authProfile],
  );

  return { ...authProfile, checkPermission };
}
