import { VendorDescription } from '@/main/entity';
import { RestApis } from '@/rest/apis';
import { withDefaultPaginationParams } from '@/rest/utils';
import { GetVendorsParams, Vendor } from './types';

const get = (id: number) => RestApis.get(`/feed/vendors/${id}`).then(({ data }) => data);

const getList = (params?: GetVendorsParams) =>
  RestApis.get<Vendor[]>(`/feed/vendors`, {
    params: withDefaultPaginationParams(params),
  }).then(({ data }) => data);

const update = (id: number, payload: VendorDescription) =>
  RestApis.patch(`/feed/vendors/${id}`, payload).then(({ data }) => data);

export const VendorApis = { get, getList, update };
