import React from 'react';
import { RouteItem } from '@/routing/types';
import { Redirect } from 'react-router-dom';
import { TargetPage } from './TargetPage';
import { UserRole } from '@/auth/constants';

export const TargetRoutes: Record<string, RouteItem> = {
  Dashboard: {
    path: '/dashboard',
    component: () => <Redirect to="/dashboard/all-company" />,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
  DashboardAllCompany: {
    path: '/dashboard/:slug',
    component: TargetPage,
    permissions: [UserRole.ADMIN, UserRole.USER],
  },
};
