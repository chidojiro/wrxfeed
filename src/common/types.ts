import React, { FunctionComponent, SVGAttributes } from 'react';

export interface HOC<T> {
  (c: React.ComponentType<T>): React.ComponentType<T>;
}

export type LeftTab = {
  name: string;
  href: string;
  icon: FunctionComponent<SVGAttributes<SVGElement>> | null;
};

export type GroupTab = {
  name: string;
  icon: FunctionComponent<SVGAttributes<SVGElement>> | null;
  tabs: LeftTab[];
};
