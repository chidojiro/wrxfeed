import React from 'react';
import { RedirectMethod, useQuery } from './useQuery';

export const useUrlState = <T extends string>(
  paramKey: string,
): [T, (value: T, method?: RedirectMethod) => void] => {
  const query = useQuery();

  const setQuery = React.useCallback(
    (value: T, method: RedirectMethod = 'PUSH') => {
      query.set(paramKey, value, method);
    },
    [paramKey, query],
  );

  return React.useMemo(() => [query.get(paramKey) ?? '', setQuery], [paramKey, query, setQuery]);
};
