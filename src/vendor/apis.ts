import { DEFAULT_PAGINATION_PARAMS } from './../rest/constants';
import { VendorDescription } from '@/main/entity';
import { RestApis } from '@/rest/apis';
import { GetVendorsParams, Vendor } from './types';

const get = (id: number) => RestApis.get(`/feed/vendors/${id}`).then(({ data }) => data);

const getList = (params: GetVendorsParams) => {
  const offset = params.offset ?? DEFAULT_PAGINATION_PARAMS.offset;
  const limit = params.limit ?? DEFAULT_PAGINATION_PARAMS.limit;

  return RestApis.get<Vendor[]>(`/feed/vendors`, { params: { offset, limit } }).then(
    ({ data }) => data,
  );
};

const update = (id: number, payload: VendorDescription) =>
  RestApis.patch(`/feed/vendors/${id}`, payload).then(({ data }) => data);

export const VendorApis = { get, getList, update };
