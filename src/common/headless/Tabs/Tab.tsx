import React from 'react';
import { HTMLDivProps } from '../../types';
import { useTabsContext } from './TabsProvider';

type TabRenderProp = (props: { onClick: () => void; isActive: boolean }) => JSX.Element | null;

export type TabProps = Omit<HTMLDivProps, 'children'> & {
  children: TabRenderProp;
  content?: React.ReactNode;
  value?: string;
};

export const Tab = ({ children, content, value }: TabProps) => {
  const [index, setIndex] = React.useState(-1);
  const { value: selectedValue, handleChange, setContent, increaseTabsCount } = useTabsContext();

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
