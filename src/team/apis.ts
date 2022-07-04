import { RestApis } from '@/rest/apis';
import { Target } from '@/target/types';

const viewSummary = (id: number) =>
  RestApis.put<void>(`/recent/departments/${id}`).then(({ data }) => data);

const getRecentlyViewedSummaries = () =>
  RestApis.get<Target[]>('/recent/departments').then(({ data }) => data);

export const DepartmentApis = { viewSummary, getRecentlyViewedSummaries };
