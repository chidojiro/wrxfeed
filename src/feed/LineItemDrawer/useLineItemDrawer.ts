import { useWindowState } from '@/common/hooks';
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

  return React.useMemo(
    () => ({
      openLineItemDrawer,
      isLineItemDrawerOpen: !!selectedLineItem,
      closeLineItemDrawer,
      selectedLineItem,
      feedId,
    }),
    [closeLineItemDrawer, openLineItemDrawer, selectedLineItem, feedId],
  );
};
