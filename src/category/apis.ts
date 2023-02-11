import { Category } from '@/main/entity';
import { RestApis } from '@/rest/apis';
import { withDefaultPaginationParams } from '@/rest/utils';
import { SpendingsReport } from '@/spending/types';
import { GetCategoriesParams, GetCategorySpendingsParams } from './types';

const getSpendingsReport = (id: number, params?: GetCategorySpendingsParams) =>
  RestApis.patch<SpendingsReport>(`feed/spending`, {
    groupByItem: params?.groupBy,
    groupByTime: 'month',
    dateRange: 'year-to-date',
    props: [{ id: id, type: 'CATEGORY', exclude: false }],
  });

const get = (id: number) => RestApis.get<Category>(`/feed/categories/${id}`);

const getList = async (params?: GetCategoriesParams) =>
  RestApis.get<Category[]>('/feed/categories', {
    params: withDefaultPaginationParams(params),
  });

const update = async (id: number, payload: Partial<Category>) =>
  RestApis.patch<Category>(`/feed/categories/${id}`, payload);

export const CategoryApis = { getSpendingsReport, get, getList, update };
