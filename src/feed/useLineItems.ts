import { useFetcher } from '@/common/hooks';
import { FeedApis } from './apis';
import { GetLineItemsPayload } from './types';

export const useLineItems = (params: GetLineItemsPayload) => {
  const {
    data: lineItemsData,
    isInitializing: isInitializingLineItems,
    isValidating: isValidatingLineItems,
  } = useFetcher(['purchaseOrderLineItems', params], () => FeedApis.getLineItems(params), {
    laggy: true,
  });

  return {
    lineItems: lineItemsData?.lineItems ?? [],
    totalLineItemsCount: lineItemsData?.totalCount,
    isInitializingLineItems,
    isValidatingLineItems,
  };
};
