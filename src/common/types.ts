import { Category, Department, Subscription, Vendor } from '@main/entity';
import React, { FunctionComponent, SVGAttributes } from 'react';

export interface HOC<T> {
  (c: React.ComponentType<T>): React.ComponentType<T>;
}

export type LeftTab = {
  name: string;
  href: string;
  icon: FunctionComponent<SVGAttributes<SVGElement>> | null;
  subscription?: {
    type: keyof Subscription;
    item: Department | Category | Vendor;
  };
  removable?: boolean;
};

export type GroupTab = {
  name: string;
  icon: FunctionComponent<SVGAttributes<SVGElement>> | null;
  tabs: LeftTab[];
};
