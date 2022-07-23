import { VendorDescription } from '@/main/entity';
import { RestApis } from '@/rest/apis';
import { withDefaultPaginationParams } from '@/rest/utils';
import { GetVendorsParams, Vendor } from './types';

const get = (id: number) => RestApis.get<Vendor>(`/feed/vendors/${id}`);

const getList = (params?: GetVendorsParams) =>
  RestApis.get<Vendor[]>(`/feed/vendors`, {
    params: withDefaultPaginationParams(params),
  });

const update = (id: number, payload: VendorDescription) =>
  RestApis.patch<Vendor>(`/feed/vendors/${id}`, payload);

export const VendorApis = { get, getList, update };
