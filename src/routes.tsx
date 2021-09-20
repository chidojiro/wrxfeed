import { ComponentType, lazy, LazyExoticComponent } from 'react';

export interface RouteItem<T extends ComponentType> {
  path: string;
  component: LazyExoticComponent<T>;
  permissions?: string[];
}

const routes: RouteItem<ComponentType>[] = [
  {
    path: '/',
    component: lazy(() => import('./diary/pages/ActivityListPage')),
    permissions: ['admin'],
  },
  {
    path: '/login',
    component: lazy(() => import('./admin/pages/LoginPage')),
  },
  {
    path: '/forgot-pwd',
    component: lazy(() => import('./admin/pages/ForgotPwdPage')),
  },
  {
    path: '/forgot-pwd/success',
    component: lazy(() => import('./admin/pages/ForgotPwdSuccessPage')),
  },
  {
    path: '/reset-pwd',
    component: lazy(() => import('./admin/pages/ResetPwdPage')),
  },
  {
    path: '/reset-pwd/success',
    component: lazy(() => import('./admin/pages/ResetPwdSuccessPage')),
  },
  {
    path: '/profile',
    component: lazy(() => import('./admin/pages/ProfilePage')),
    permissions: ['admin'],
  },
  {
    path: '/profile/change-pwd',
    component: lazy(() => import('./admin/pages/ChangePwdPage')),
    permissions: ['admin'],
  },
  {
    path: '/activities/new',
    component: lazy(() => import('./diary/pages/AddActivityPage')),
    permissions: ['admin'],
  },
  {
    path: '/activities/edit/:id',
    component: lazy(() => import('./diary/pages/UpdateActivityPage')),
    permissions: ['admin'],
  },
];

export default routes;
