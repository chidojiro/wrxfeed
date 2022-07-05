import React from 'react';
import { HTMLElementOrHTMLElementRef } from '../types';
import { AssertUtils } from './../utils/assert';

export const useScrollbarDetector = (
  elementOrElementRef: HTMLElementOrHTMLElementRef,
  deps: any[],
) => {
  const element = AssertUtils.isRef<HTMLElement>(elementOrElementRef)
    ? elementOrElementRef.current
    : elementOrElementRef;

  const [scrollbarWidth, setScrollbarWidth] = React.useState(0);

  React.useEffect(() => {
    setScrollbarWidth((element?.offsetWidth ?? 0) - (element?.clientWidth ?? 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, element]);

  return React.useMemo(() => ({ scrollbarWidth }), [scrollbarWidth]);
};
