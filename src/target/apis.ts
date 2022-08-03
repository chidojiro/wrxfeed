import { RestApis } from '@/rest/apis';
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
  forYou = 0,
  year = new Date().getFullYear(),
  isPrimary = 0,
  type = 'normal',
  ...restParams
}: GetTargetsParams) =>
  RestApis.get<Target[]>(getListEndpoint(), {
    params: { forYou, year, isPrimary, type, ...restParams },
  });

const createEndpoint = () => '/target/targets';
const create = (payload: CreateTargetPayload) => RestApis.post<Target>(createEndpoint(), payload);

export const updateEndpoint = (id: number) => `/target/targets/${id}`;
const update = (id: number, payload: UpdateTargetPayload) =>
  RestApis.put<Target>(updateEndpoint(id), payload);

const deleteEndpoint = (id: number) => `/target/targets/${id}`;
const _delete = (id: number) => RestApis.delete(deleteEndpoint(id));

const getSpendingEndpoint = () => '/target/spending';
const getSpending = (params: GetTargetSpendingParams): Promise<TargetSpending[]> => {
  return RestApis.patch<TargetSpending[]>(getSpendingEndpoint(), {
    ...params,
    periods: getFullYearPeriods(params.periods),
  });
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
