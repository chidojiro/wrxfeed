import NoPermission from '@common/pages/NoPermission';
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
  loginUrl = routes.Login.path as string,
  permissions = [],
}) => {
  const identity = useIdentity();
  const { roles } = usePermission();
  const location = useLocation();
  const isAccessable = !permissions?.length || roles?.some((role) => permissions.includes(role));
  const dst = {
    pathname: loginUrl,
    state: { from: location },
  };

  // Check token for authentication => if not => redirect to Login page
  if (!identity?.token) {
    return <Redirect to={dst} />;
  }

  // Check permission to access resource
  if (!isAccessable) {
    return <NoPermission />;
  }

  return <Route path={path} component={component} exact />;
};

export default ProtectedRoute;
