import React from 'react';
import { useControllableState } from '../../hooks';
import { Children } from '../../types';
import { TabContent } from './TabContent';
import { Tab } from './Tab';
import { TabsProvider, Value } from './TabsProvider';

export type TabsProps<T extends Value = Value> = Children & {
  value?: T;
  onChange?: (value: T) => void;
};

export const Tabs = <T extends Value>({ value: valueProp, onChange, children }: TabsProps<T>) => {
  const [value, setValue] = useControllableState({
    value: valueProp,
    onChange,
    defaultValue: 0 as T,
  });
  const [content, setContent] = React.useState<React.ReactNode>();
  const tabsCountRef = React.useRef(-1);

  const increaseTabsCount = React.useCallback(() => {
    tabsCountRef.current = tabsCountRef.current + 1;

    return tabsCountRef.current;
  }, []);

  const providerValue: TabsProvider<T> = React.useMemo(
    () => ({
      value,
      handleChange: setValue,
      content,
      setContent,
      tabsCount: tabsCountRef.current,
      increaseTabsCount,
    }),
    [content, increaseTabsCount, setValue, value],
  );

  return <TabsProvider value={providerValue}>{children}</TabsProvider>;
};

Tabs.Item = Tab;
Tabs.Content = TabContent;
