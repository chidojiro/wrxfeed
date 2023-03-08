import { RouteProps } from 'react-router-dom';

export type RouteItem = {
  path: string | readonly string[];
  component: RouteProps['component'];
  permissions?: string[];
};

export type Route = Record<string, RouteItem>;
