import { Category } from '@/main/entity';
import { RestApis } from '@/rest/apis';
import { withDefaultPaginationParams } from '@/rest/utils';
import { SpendingsReport } from '@/spending/types';
import { GetCategoriesParams, GetCategorySpendingsParams } from './types';

const getSpendingsReport = (id: number, params?: GetCategorySpendingsParams) =>
  RestApis.get<SpendingsReport>(`feed/categories/${id}/spends`, {
    params: { year: params?.year ?? new Date().getFullYear() },
  });

const get = (id: number) => RestApis.get<Category>(`/feed/categories/${id}`);

const getList = async (params?: GetCategoriesParams) =>
  RestApis.get<Category[]>('/feed/categories', {
    params: withDefaultPaginationParams(params),
  });

const update = async (id: number, payload: Partial<Category>) =>
  RestApis.patch<Category>(`/feed/categories/${id}`, payload);

export const CategoryApis = { getSpendingsReport, get, getList, update };
