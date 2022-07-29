import { FeedApis } from '@/feed/apis';
import React from 'react';
import useSWR from 'swr';
import { GetUnreadLineItemCountParams } from './types';

export const useUnreadLineItemCount = (params?: GetUnreadLineItemCountParams) => {
  const { data, error, isValidating, mutate } = useSWR(['useNewFeedsCount', params], () =>
    FeedApis.getUnreadLineItemsCount(params),
  );

  return React.useMemo(
    () => ({
      useUnreadLineItemCount: data,
      unreadLineItemCountError: error,
      isValidatingUnreadLineItemCount: isValidating,
      mutateUnreadLineItemCount: mutate,
    }),
    [data, error, isValidating, mutate],
  );
};
