import { useIdentity, usePermission } from '@identity/hooks';
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
  const { roles } = usePermission();
  const location = useLocation();
  const isAccessable = !permissions?.length || roles.some((role) => permissions.includes(role));
  const dst = {
    pathname: loginUrl,
    state: { from: location },
  };
  return identity?.token && isAccessable ? (
    <Route path={path} component={component} exact />
  ) : (
    <Redirect to={dst} />
  );
};

export default ProtectedRoute;
