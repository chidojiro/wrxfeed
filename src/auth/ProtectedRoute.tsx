import { MainLayout } from '@/layout/MainLayout';
import { useProfile } from '@/profile/useProfile';
import { Route, RouteProps } from 'react-router-dom';
import { NoPermission } from './NoPermission';

export type ProtectedRouteProps = RouteProps & {
  permissions?: string[];
};

export const ProtectedRoute = ({ path, component, permissions }: ProtectedRouteProps) => {
  const { profile, isValidatingProfile } = useProfile();

  if (isValidatingProfile) return <MainLayout />;

  const isAccessible = !permissions || profile?.roles?.some((role) => permissions?.includes(role));

  if (!isAccessible) {
    return <NoPermission />;
  }

  return <Route path={path} component={component} exact />;
};
