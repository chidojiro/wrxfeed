import { useControllable } from '../../hooks';
import React from 'react';
import { Children } from '../../types';
import { Item } from './Item';
import { TabsContext, TabsProvider, Value } from './TabsContext';
import { Content } from './Content';

export type TabsProps<T extends Value = Value> = Children & {
  value?: T;
  onChange?: (value: T) => void;
};

export const Tabs = <T extends Value>({ value: valueProp, onChange, children }: TabsProps<T>) => {
  const [value, setValue] = useControllable({ value: valueProp, onChange, defaultValue: 0 as T });
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

  return <TabsContext.Provider value={providerValue}>{children}</TabsContext.Provider>;
};

Tabs.Item = Item;
Tabs.Content = Content;
