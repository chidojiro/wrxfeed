import { VendorDescription } from '@/main/entity';
import { RestApis } from '@/rest/apis';
import { GetVendorsParams, Vendor } from './types';
import { RestUtils } from '@/rest/utils';

const get = (id: number) => RestApis.get(`/feed/vendors/${id}`).then(({ data }) => data);

const getList = (params?: GetVendorsParams) =>
  RestApis.get<Vendor[]>(`/feed/vendors`, {
    params: RestUtils.withDefaultPaginationParams(params),
  }).then(({ data }) => data);

const update = (id: number, payload: VendorDescription) =>
  RestApis.patch(`/feed/vendors/${id}`, payload).then(({ data }) => data);

export const VendorApis = { get, getList, update };
