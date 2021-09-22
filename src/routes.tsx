import { ComponentType, lazy, LazyExoticComponent } from 'react';

export interface RouteItem<T extends ComponentType> {
  path: string;
  component: LazyExoticComponent<T>;
  permissions?: string[];
}

const routes: RouteItem<ComponentType>[] = [
  {
    path: '/',
    component: lazy(() => import('@main/pages/Overview')),
    permissions: ['admin'],
  },
  {
    path: '/login',
    component: lazy(() => import('@auth/pages/LoginPage')),
  },
  {
    path: '/overview',
    component: lazy(() => import('@main/pages/Overview')),
    permissions: ['admin'],
  },
  {
    path: '/discussions',
    component: lazy(() => import('@main/pages/Discussion')),
    permissions: ['admin'],
  },
];

export default routes;
