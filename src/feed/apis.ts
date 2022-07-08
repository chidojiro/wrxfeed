import { Category, TransLineItem } from '@/main/entity';
import { RestApis } from '@/rest/apis';
import { GetLineItemPayload, GetCategoryByIdPayload } from './types';

const getLineItemDetails = ({ lineItemId }: GetLineItemPayload) =>
  RestApis.get<TransLineItem>(`/feed/line-items/${lineItemId}`).then((res) => res.data);

const getCategoryById = ({ categoryId }: GetCategoryByIdPayload) =>
  RestApis.get<Category>(`/feed/categories/${categoryId}`).then((res) => res.data);

export const FeedApis = {
  getLineItemDetails,
  getCategoryById,
};
