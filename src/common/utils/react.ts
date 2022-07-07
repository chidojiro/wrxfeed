import React from 'react';

const createContext = <T = unknown>(): [React.Context<T>, () => T] => {
  const context = React.createContext<T>(null as any);

  const hook = () => React.useContext(context);

  return [context, hook];
};

export const ReactUtils = {
  createContext,
};
