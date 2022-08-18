import LoadingFallback from '@/common/atoms/LoadingFallback';
import { MainLayout } from '@/layout/MainLayout';
import { useProfile } from '@/profile/useProfile';
import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { NoPermission } from './NoPermission';

export type ProtectedRouteProps = RouteProps & {
  permissions?: string[];
};

export const ProtectedRoute = ({ path, component, permissions }: ProtectedRouteProps) => {
  const { profile, isInitializingProfile } = useProfile();

  const isAccessible = !permissions || profile?.roles?.some((role) => permissions?.includes(role));

  if (isInitializingProfile) {
    if (path === '/onboarding') return <LoadingFallback />;

    return <MainLayout />;
  }

  if (!isAccessible) {
    return <NoPermission />;
  }

  return (
    <React.Suspense fallback={path === '/onboarding' ? <LoadingFallback /> : <MainLayout />}>
      <Route path={path} component={component} exact />
    </React.Suspense>
  );
};
