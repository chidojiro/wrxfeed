import { EMPTY_ARRAY } from '@/common/constants';
import { useFetcher } from '@/common/hooks';
import { FeedApis } from '@/feed/apis';
import { GetLineItemsPayload } from '@/feed/types';
import React from 'react';

export const useTransactions = (params: GetLineItemsPayload) => {
  const { data, isInitializing, isValidating, mutate } = useFetcher(
    ['transactions', params],
    () => FeedApis.getLineItems(params),
    { laggy: true },
  );

  const { lineItems = EMPTY_ARRAY, totalCount = 0 } = data ?? {};

  return React.useMemo(
    () => ({
      transactions: lineItems,
      totalCount,
      isInitializingTransactions: isInitializing,
      isValidatingTransactions: isValidating,
      mutateTransactions: mutate,
    }),
    [isInitializing, isValidating, lineItems, mutate, totalCount],
  );
};
