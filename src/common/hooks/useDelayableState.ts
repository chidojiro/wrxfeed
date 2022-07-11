import React from 'react';

export const useDelayableState = <T = any>(delayBy: number, defaultState?: T) => {
  const [state, setState] = React.useState<any>(defaultState);

  const timeoutRef = React.useRef<number>();

  const delayedSetState = React.useCallback(
    (param: any, shouldDelay: boolean) => {
      if (shouldDelay) {
        clearTimeout(timeoutRef.current);

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
