import React from 'react';

export type RouteItem<T = any> = {
  path: string | readonly string[];
  component: T;
  permissions?: string[];
};

export type Route = Record<string, RouteItem<React.ComponentType<any>>>;
