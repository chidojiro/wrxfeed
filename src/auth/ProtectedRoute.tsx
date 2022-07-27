import MainLayout from '@/common/templates/MainLayout';
import { useProfile } from '@/profile/useProfile';
import { Route, RouteProps } from 'react-router-dom';
import { NoPermission } from './NoPermission';

export type ProtectedRouteProps = RouteProps & {
  permissions?: string[];
};

export const ProtectedRoute = ({ path, component, permissions }: ProtectedRouteProps) => {
  const { data: profile, isValidating } = useProfile();

  if (isValidating) return <MainLayout></MainLayout>;

  const isAccessible = !permissions || profile?.roles?.some((role) => permissions?.includes(role));

  if (!isAccessible) {
    return <NoPermission />;
  }

  return <Route path={path} component={component} exact />;
};
