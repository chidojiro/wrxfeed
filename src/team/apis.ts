import {
  GetDepartmentsParams,
  GetRecentlyViewedDepartmentSummariesParams,
  GetTopCategoriesParams,
} from './types';
import { RestApis } from '@/rest/apis';
import { DepartmentSummary, Target } from '@/target/types';
import { Department, TopCategories } from '@/main/entity';
import { withDefaultPaginationParams } from '@/rest/utils';

const get = (id: number) => RestApis.get<Department>(`/feed/departments/${id}`);

const getList = (params?: GetDepartmentsParams): Promise<Department[]> =>
  RestApis.get<Department[]>('/feed/departments', {
    params: withDefaultPaginationParams(params),
  });

const viewSummary = (departmentId: number) =>
  RestApis.put<void>(`/recent/departments/${departmentId}`);

const getRecentlyViewedSummaries = ({
  offset = 0,
  limit = 6,
}: GetRecentlyViewedDepartmentSummariesParams = {}) =>
  RestApis.get<Target[]>('/recent/departments', { params: { offset, limit } });

const getSummaries = () => RestApis.get<DepartmentSummary[]>('/target/departments');

const getTopCategories = async (departmentId: number, params?: GetTopCategoriesParams) =>
  RestApis.get<TopCategories[]>(`/feed/departments/${departmentId}/categories`, { params });

export const DepartmentApis = {
  get,
  getList,
  viewSummary,
  getRecentlyViewedSummaries,
  getSummaries,
  getTopCategories,
};
