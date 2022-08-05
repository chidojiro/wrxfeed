import React from 'react';
import { ElementOrHTMLElementRef } from '../types';

import { AssertUtils } from '../utils';

type OptionalElementOrHTMLElementRef = ElementOrHTMLElementRef | null | undefined;

export const useOnMouseOverOutside = (
  refsOrElements?: OptionalElementOrHTMLElementRef | OptionalElementOrHTMLElementRef[],
  handler?: (event: MouseEvent) => void,
) => {
  const handleMouseOver = (e: MouseEvent) => {
    if (!refsOrElements) return;

    const isEveryOutside = [refsOrElements].flat().every((eleOrRef) => {
      if (AssertUtils.isRef(eleOrRef)) {
        return !eleOrRef?.current?.contains(e.target as Node);
      }

      return !eleOrRef?.contains(e.target as Node);
    });

    if (isEveryOutside) {
      handler?.(e);
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousemove', handleMouseOver);
    return () => {
      document.removeEventListener('mousemove', handleMouseOver);
    };
  });
};
