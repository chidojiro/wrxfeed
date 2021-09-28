import useCookie from '@common/hooks/useCookie';
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
  const { cookies } = useCookie();
  const location = useLocation();
  const token = cookies.get('token');
  const dst = {
    pathname: loginUrl,
    state: { from: location },
  };
  return token || permissions.length === 0 ? (
    <Route path={path} component={component} exact />
  ) : (
    <Redirect to={dst} />
  );
};

export default ProtectedRoute;
