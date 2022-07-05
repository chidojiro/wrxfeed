import { GetRecentlyViewedDepartmentSummariesParams } from './types';
import { RestApis } from '@/rest/apis';
import { DepartmentSummary, Target } from '@/target/types';

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

export const DepartmentApis = { viewSummary, getRecentlyViewedSummaries, getSummaries };
