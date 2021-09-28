import { useIdentity } from '@identity/hooks';
import routes from '@src/routes';
import React from 'react';
import { Route, RouteProps, Redirect, useLocation } from 'react-router-dom';

export interface ProtectedRouteProps extends RouteProps {
  loginUrl?: string;
  permissions?: string[];
}

const ProtectedRoute: React.VFC<ProtectedRouteProps> = ({
  path,
  component,
  loginUrl = routes.Login.path,
  permissions = [],
}) => {
  const identity = useIdentity();
  const location = useLocation();
  const dst = {
    pathname: loginUrl,
    state: { from: location },
  };
  return identity?.token || permissions.length === 0 ? (
    <Route path={path} component={component} exact />
  ) : (
    <Redirect to={dst} />
  );
};

export default ProtectedRoute;
