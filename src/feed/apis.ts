import { Category, TransLineItem } from '@/main/entity';
import { RestApis } from '@/rest/apis';
import { GetLineItemPayload } from './types';

const getLineItemDetails = ({ lineItemId }: GetLineItemPayload) =>
  RestApis.get<TransLineItem>(`/feed/line-items/${lineItemId}`).then((res) => res.data);

const getCategory = (id: number) =>
  RestApis.get<Category>(`/feed/categories/${id}`).then((res) => res.data);

export const FeedApis = {
  getLineItemDetails,
  getCategory,
};
