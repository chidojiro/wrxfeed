import React from 'react';

import { TabsContext } from './TabsContext';

export const Content = () => {
  const { content } = React.useContext(TabsContext);

  return <>{content}</>;
};
