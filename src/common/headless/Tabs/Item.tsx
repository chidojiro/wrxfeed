import React from 'react';

import { HTMLDivProps } from '../../types';

import { TabsContext } from './TabsContext';

type TabItemRenderProp = (props: { onClick: () => void; isActive: boolean }) => JSX.Element | null;

export type TabItemProps = Omit<HTMLDivProps, 'children'> & {
  children: TabItemRenderProp;
  content?: React.ReactNode;
  value?: string;
};

export const Item = ({ children, content, value }: TabItemProps) => {
  const [index, setIndex] = React.useState(-1);
  const {
    value: selectedValue,
    handleChange,
    setContent,
    increaseTabsCount,
  } = React.useContext(TabsContext);

  React.useEffect(() => {
    const index = increaseTabsCount();
    setIndex(index);
  }, [increaseTabsCount]);

  const onClick = React.useCallback(() => {
    handleChange(value ?? index);
  }, [handleChange, index, value]);

  const isActive = index === selectedValue || value === selectedValue;

  React.useEffect(() => {
    if (isActive) {
      setContent(content);
    }
  }, [content, isActive, setContent, index]);

  return <>{children({ onClick, isActive })}</>;
};
