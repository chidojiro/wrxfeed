import { BitBoolean } from '@/common/types';
import { RestApis } from '@/rest/apis';
import { PaginationParams } from '@/rest/types';
import { Target, TargetPeriod, TargetProps } from './types';

// const get = () => {};

export type GetTargetsParams = Partial<PaginationParams> & {
  dep?: number;
  forYou?: BitBoolean;
  month?: number;
  year?: number;
  isPrimary?: BitBoolean;
};

const getList = ({
  offset = 0,
  limit = 0,
  forYou = 0,
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1,
  isPrimary = 0,
  ...restParams
}: GetTargetsParams) =>
  RestApis.get<Target[]>('/target/targets', {
    params: { offset, limit, forYou, year, month, isPrimary, ...restParams },
  }).then((res) => res.data);

export type CreateTargetPayload = {
  name: string;
  depId?: number;
  isPrimary: boolean;
  props: TargetProps[];
  periods?: TargetPeriod[];
};

const create = (payload: CreateTargetPayload) =>
  RestApis.post('/target/targets', payload).then((res) => res.data);

export interface UpdateTargetPayload {
  name: string;
  depId?: number;
  isPrimary: boolean;
  props: TargetProps[];
  periods: TargetPeriod[];
}

const update = (id: number, payload: UpdateTargetPayload) =>
  RestApis.put(`/target/targets/${id}`, payload).then((res) => res.data);

const _delete = (id: number) => RestApis.delete(`/target/targets/${id}`).then((res) => res.data);

export const TargetApis = {
  getList,
  create,
  update,
  delete: _delete,
};
