import React from 'react';

export const useDelayableState = <T = any>(delayBy: number, defaultState?: T) => {
  const [state, setState] = React.useState<any>(defaultState);

  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const delayedSetState = React.useCallback(
    (param: any, shouldDelay: boolean) => {
      clearTimeout(timeoutRef.current);

      if (shouldDelay) {
        timeoutRef.current = setTimeout(() => {
          setState(param);
        }, delayBy);

        return;
      }

      setState(param);
    },
    [delayBy],
  );

  return React.useMemo(() => [state, delayedSetState], [delayedSetState, state]);
};
