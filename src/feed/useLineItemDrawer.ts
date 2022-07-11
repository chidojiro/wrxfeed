import { useGlobalState } from '@/common/hooks';
import { TransLineItem } from '@/main/entity';
import React from 'react';

export const useLineItemDrawer = () => {
  const [selectedLineItem, setSelectedLineItem] = useGlobalState('lineItemDrawer-selectedItem');
  const [feedId, setFeedId] = useGlobalState('lineItemDrawer-feedId');

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
