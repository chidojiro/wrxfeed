import { DateUtils } from '@/common/utils';
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

const getListEndpoint = () => '/target/targets';
const getList = ({
  mode = 'company',
  year = DateUtils.getThisYear(),
  isPrimary = 0,
  type = 'normal',
  ...restParams
}: GetTargetsParams) =>
  RestApis.get<Target[]>(getListEndpoint(), {
    params: { mode, year, isPrimary, type, ...restParams },
  });

const createEndpoint = () => '/target/targets';
const create = (payload: CreateTargetPayload) => RestApis.post<Target>(createEndpoint(), payload);

export const updateEndpoint = (id: number) => `/target/targets/${id}`;
const update = (id: number, payload: UpdateTargetPayload) =>
  RestApis.put<Target>(updateEndpoint(id), payload);

const deleteEndpoint = (id: number) => `/target/targets/${id}`;
const _delete = (id: number) => RestApis.delete(deleteEndpoint(id));

const getSpendingEndpoint = () => '/target/spending';
const getSpending = (params: GetTargetSpendingParams) => {
  return RestApis.patch<AxiosResponse<TargetSpending[]>>(
    getSpendingEndpoint(),
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

const getSummariesEndpoint = () => '/target/summaries';
const getSummaries = () => RestApis.get<TargetSummaries>(getSummariesEndpoint());

export const TargetApiEndpoints = {
  getList: getListEndpoint,
  create: createEndpoint,
  update: updateEndpoint,
  delete: deleteEndpoint,
  getSpending: getSpendingEndpoint,
  getSummaries: getSummariesEndpoint,
};

export const TargetApis = {
  getList,
  create,
  update,
  delete: _delete,
  getSpending,
  getSummaries,
};
