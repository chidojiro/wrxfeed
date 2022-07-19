import { Transaction } from './../main/entity/transaction.entity';
import { Category, TransLineItem } from '@/main/entity';
import { RestApis } from '@/rest/apis';
import { RestUtils } from '@/rest/utils';
import { Vendor } from '@/vendor/types';
import { GetCategoriesParams, GetTransactionsParams } from './types';

const getLineItem = (id: number) =>
  RestApis.get<TransLineItem>(`/feed/line-items/${id}`).then((res) => res.data);

const getCategory = (id: number) =>
  RestApis.get<Category>(`/feed/categories/${id}`).then((res) => res.data);

const getCategories = async (params?: GetCategoriesParams) =>
  RestApis.get<Category[]>('/feed/categories', {
    params: RestUtils.withDefaultPaginationParams(params),
  }).then((res) => res.data);

const updateCategory = async (payload?: Partial<Category>) =>
  RestApis.patch<Category>(`/feed/categories/${payload?.id}`, payload).then((res) => res.data);

const getVendor = (id: number) =>
  RestApis.get<Vendor>(`/feed/vendors/${id}`).then((res) => res.data);

const getTransactions = (params: GetTransactionsParams) =>
  RestApis.get<Transaction[]>(`/feed/transactions`, { params }).then((res) => res.data);

export const FeedApis = {
  getLineItem,
  getCategory,
  getVendor,
  getCategories,
  updateCategory,
  getTransactions,
};
