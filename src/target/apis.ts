import { RestApis } from '@/rest/apis';
import {
  CreateTargetPayload,
  GetTargetsParams,
  GetTargetSpendingParams,
  Target,
  TargetPeriod,
  TargetSummaries,
  UpdateTargetPayload,
} from './types';

const getList = ({
  forYou = 0,
  year = new Date().getFullYear(),
  isPrimary = 0,
  type = 'normal',
  ...restParams
}: GetTargetsParams) =>
  RestApis.get<Target[]>('/target/targets', {
    params: { forYou, year, isPrimary, type, ...restParams },
  }).then((res) => res.data);

const create = (payload: CreateTargetPayload) =>
  RestApis.post<Target>('/target/targets', payload).then((res) => res.data);

const update = (id: number, payload: UpdateTargetPayload) =>
  RestApis.put<Target>(`/target/targets/${id}`, payload).then((res) => res.data);

const _delete = (id: number) => RestApis.delete(`/target/targets/${id}`).then(({ data }) => data);

const getSpending = (params: GetTargetSpendingParams): Promise<TargetPeriod[]> =>
  RestApis.patch<TargetPeriod[]>('/target/spending', params).then(({ data }) => data);

const getSummaries = () =>
  RestApis.get<TargetSummaries>('/target/summaries').then(({ data }) => data);

export const TargetApis = {
  getList,
  create,
  update,
  delete: _delete,
  getSpending,
  getSummaries,
};
