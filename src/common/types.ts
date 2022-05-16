import { Category, Department, Subscription, Vendor } from '@main/entity';
import React, { FunctionComponent, SVGAttributes } from 'react';

export interface HOC<T> {
  (c: React.ComponentType<T>): React.ComponentType<T>;
}

export type LeftTab = {
  name: string;
  location: Partial<Omit<Location, 'pathname'>> & { pathname: string };
  icon: FunctionComponent<SVGAttributes<SVGElement>> | null;
  subscription?: {
    type: keyof Subscription;
    item: Department | Category | Vendor;
  };
  removable?: boolean;
  isShowCounter?: boolean;
  strict?: boolean; // When true, Left tab is marked as selected only if route equals to left tab location.
};

export type GroupTab = {
  name: string;
  icon: FunctionComponent<SVGAttributes<SVGElement>> | null;
  tabs?: LeftTab[];
  addItemRoute?: string;
};

export type SectionTab = {
  name: string;
  groups: GroupTab[];
  tabs: LeftTab[];
};
