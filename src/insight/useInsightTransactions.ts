import { EMPTY_ARRAY } from '@/common/constants';
import { useFetcher } from '@/common/hooks';
import { FeedApis } from '@/feed/apis';
import React from 'react';
import { GetInsightLineItemsBody } from './types';

export const useInsightTransactions = (body: GetInsightLineItemsBody) => {
  const { data, isInitializing, isValidating, mutate } = useFetcher(
    ['insight-transactions', body],
    () => FeedApis.getInsightLineItems(body),
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
