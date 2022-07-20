import NoPermission from '@/common/pages/NoPermission';
import { useIdentity, usePermission } from '@/identity/hooks';
import { Routes } from '@/routing/routes';
import React from 'react';
import { Route, RouteProps, Redirect, useLocation } from 'react-router-dom';

export type ProtectedRouteProps = RouteProps & {
  loginUrl?: string;
  permissions?: string[];
};

const ProtectedRoute = ({
  path,
  component,
  loginUrl = Routes.Login.path as string,
  permissions = [],
}: ProtectedRouteProps) => {
  const identity = useIdentity();
  const { roles } = usePermission();
  const location = useLocation();
  const isAccessible = !permissions?.length || roles?.some((role) => permissions.includes(role));
  const dst = {
    pathname: loginUrl,
    state: { from: location },
  };

  // Check token for authentication => if not => redirect to Login page
  if (!identity?.token) {
    return <Redirect to={dst} />;
  }

  // Check permission to access resource
  if (!isAccessible) {
    return <NoPermission />;
  }

  return <Route path={path} component={component} exact />;
};

export default ProtectedRoute;
