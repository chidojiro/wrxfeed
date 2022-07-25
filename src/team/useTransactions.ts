import { useFetcher } from '@/common/hooks';
import { FeedApis } from '@/feed/apis';
import { GetLineItemsParams } from '@/feed/types';

export const useTransactions = (params: GetLineItemsParams) => {
  return useFetcher(['transactions', params], () => FeedApis.getLineItems(params));
};
