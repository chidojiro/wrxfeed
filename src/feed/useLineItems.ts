import { useFetcher } from '@/common/hooks';
import { FeedApis } from './apis';

export const useLineItems = (params: any) => {
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
