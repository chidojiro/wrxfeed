import React from 'react';
import { useQuery } from './useQuery';

export const useUrlState = <T extends string>(paramKey: string): [T, (value: T) => void] => {
  const query = useQuery();

  const setQuery = React.useCallback(
    (value: T) => {
      query.set(paramKey, value);
    },
    [paramKey, query],
  );

  return React.useMemo(() => [query.get(paramKey) ?? '', setQuery], [paramKey, query, setQuery]);
};
