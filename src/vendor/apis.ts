import { DateUtils } from '@/common/utils';
import { RestApis } from '@/rest/apis';
import { withDefaultPaginationParams } from '@/rest/utils';
import { SpendingsReport } from '@/spending/types';
import { GetVendorsParams, GetVendorSpendingsParams, UpdateVendorPayload, Vendor } from './types';

const get = (id: number) => RestApis.get<Vendor>(`/feed/vendors/${id}`);

const getList = (params?: GetVendorsParams) =>
  RestApis.get<Vendor[]>(`/feed/vendors`, {
    params: withDefaultPaginationParams(params),
  });

const update = (id: number, payload: UpdateVendorPayload) =>
  RestApis.patch<Vendor>(`/feed/vendors/${id}`, payload);

const getSpendings = (id: number, params?: GetVendorSpendingsParams) =>
  RestApis.get<SpendingsReport>(`feed/vendors/${id}/spends`, {
    params: { ...params, year: params?.year ?? DateUtils.getThisYear() },
  });

export const VendorApis = { get, getList, update, getSpendings };
