import { RestApis } from '@/rest/apis';
import { BYPASS_INTERCEPTOR_HEADER } from '@/rest/constants';
import { AxiosResponse } from 'axios';
import {
  CreateTargetPayload,
  GetTargetsParams,
  GetTargetSpendingParams,
  Target,
  TargetSpending,
  TargetSummaries,
  UpdateTargetPayload,
} from './types';
import { getFullYearPeriods } from './utils';

const getList = ({
  forYou = 0,
  year = new Date().getFullYear(),
  isPrimary = 0,
  type = 'normal',
  ...restParams
}: GetTargetsParams) =>
  RestApis.get<Target[]>('/target/targets', {
    params: { forYou, year, isPrimary, type, ...restParams },
  });

const create = (payload: CreateTargetPayload) => RestApis.post<Target>('/target/targets', payload);

const update = (id: number, payload: UpdateTargetPayload) =>
  RestApis.put<Target>(`/target/targets/${id}`, payload);

const _delete = (id: number) => RestApis.delete(`/target/targets/${id}`);

const getSpending = (params: GetTargetSpendingParams) => {
  return RestApis.patch<AxiosResponse<TargetSpending[]>>(
    '/target/spending',
    {
      ...params,
      periods: getFullYearPeriods(params.periods),
    },
    { headers: BYPASS_INTERCEPTOR_HEADER },
  ).then((res) => ({
    spendings: res.data,
    trackingStatus: res.headers['x-tracking-status'] as Target['trackingStatus'],
  }));
};

const getSummaries = () => RestApis.get<TargetSummaries>('/target/summaries');

export const TargetApis = {
  getList,
  create,
  update,
  delete: _delete,
  getSpending,
  getSummaries,
};
