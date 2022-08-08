import { SetControllableState } from '@/common/hooks';
import { ReactUtils } from '@/common/utils';
import React from 'react';

export type Value = number | string;

export type TabsProvider<T> = {
  handleChange: SetControllableState<T, T>;
  value?: T;
  content?: React.ReactNode;
  setContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  tabsCount: number;
  increaseTabsCount: () => number;
};

export const [TabsProvider, useTabsContext] = ReactUtils.createContext<TabsProvider<any>>();
