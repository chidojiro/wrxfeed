import { useBreakpoint, useWindowState } from '@/common/hooks';
import { TransLineItem } from '@/main/entity';
import React from 'react';

export const useLineItemDrawer = () => {
  const [selectedLineItem, setSelectedLineItem] = useWindowState<TransLineItem | null>(
    'lineItemDrawer-selectedItem',
    null,
  );
  const [feedId, setFeedId] = useWindowState<number | undefined>(
    'lineItemDrawer-feedId',
    undefined,
  );

  const openLineItemDrawer = React.useCallback(
    (lineItem: TransLineItem, feedId?: number) => {
      setSelectedLineItem(lineItem);
      setFeedId(feedId);
    },
    [setFeedId, setSelectedLineItem],
  );

  const closeLineItemDrawer = React.useCallback(
    () => setSelectedLineItem(null),
    [setSelectedLineItem],
  );

  const isMobile = useBreakpoint({ '768': false }) ?? true;

  return React.useMemo(
    () => ({
      openLineItemDrawer,
      isLineItemDrawerOpen: !isMobile && !!selectedLineItem,
      closeLineItemDrawer,
      selectedLineItem,
      feedId,
    }),
    [openLineItemDrawer, isMobile, selectedLineItem, closeLineItemDrawer, feedId],
  );
};
