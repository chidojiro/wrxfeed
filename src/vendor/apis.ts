import { RestApis } from '@/rest/apis';
import { withDefaultPaginationParams } from '@/rest/utils';
import {
  GetVendorsParams,
  GetVendorSpendingsParams,
  UpdateVendorPayload,
  Vendor,
  VendorSpendings,
} from './types';

const get = (id: number) => RestApis.get<Vendor>(`/feed/vendors/${id}`);

const getList = (params?: GetVendorsParams) =>
  RestApis.get<Vendor[]>(`/feed/vendors`, {
    params: withDefaultPaginationParams(params),
  });

const update = (id: number, payload: UpdateVendorPayload) =>
  RestApis.patch<Vendor>(`/feed/vendors/${id}`, payload);

const getSpendings = (id: number, params?: GetVendorSpendingsParams) =>
  RestApis.get<VendorSpendings>(`feed/vendors/${id}/spends`, {
    params: { year: params?.year ?? new Date().getFullYear() },
  });

export const VendorApis = { get, getList, update, getSpendings };
