import React from 'react';
import { useTabsContext } from './TabsProvider';

export const TabContent = () => {
  const { content } = useTabsContext();

  return <>{content}</>;
};
