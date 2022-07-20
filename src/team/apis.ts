import { GetDepartmentsParams, GetRecentlyViewedDepartmentSummariesParams } from './types';
import { RestApis } from '@/rest/apis';
import { DepartmentSummary, Target } from '@/target/types';
import { Department } from '@/main/entity';
import { withDefaultPaginationParams } from '@/rest/utils';

const viewSummary = (id: number) =>
  RestApis.put<void>(`/recent/departments/${id}`).then(({ data }) => data);

const getRecentlyViewedSummaries = ({
  offset = 0,
  limit = 6,
}: GetRecentlyViewedDepartmentSummariesParams = {}) =>
  RestApis.get<Target[]>('/recent/departments', { params: { offset, limit } }).then(
    ({ data }) => data,
  );

const getSummaries = () =>
  RestApis.get<DepartmentSummary[]>('/target/departments').then(({ data }) => data);

const getList = async (params?: GetDepartmentsParams): Promise<Department[]> =>
  RestApis.get<Department[]>('/feed/departments', {
    params: withDefaultPaginationParams(params),
  }).then(({ data }) => data);

export const DepartmentApis = { getList, viewSummary, getRecentlyViewedSummaries, getSummaries };
