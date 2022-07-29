import { MainLayout } from '@/layout/MainLayout';
import { useProfile } from '@/profile/useProfile';
import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { NoPermission } from './NoPermission';

export type ProtectedRouteProps = RouteProps & {
  permissions?: string[];
};

export const ProtectedRoute = ({ path, component, permissions }: ProtectedRouteProps) => {
  const { profile } = useProfile();

  const isAccessible = !permissions || profile?.roles?.some((role) => permissions?.includes(role));

  if (!isAccessible) {
    return <NoPermission />;
  }

  return (
    <React.Suspense fallback={<MainLayout />}>
      <Route path={path} component={component} exact />
    </React.Suspense>
  );
};
