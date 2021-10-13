import React, { ReactNode } from 'react';

export interface HOC<T> {
  (c: React.ComponentType<T>): React.ComponentType<T>;
}

export type LeftTab = {
  name: string;
  href: string;
  icon: ReactNode | null;
};

export type GroupTab = {
  name: string;
  icon: ReactNode;
  tabs: LeftTab[];
};
