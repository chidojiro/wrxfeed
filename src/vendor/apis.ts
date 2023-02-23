import { Spending } from '@/spending/types';
import { RestApis } from '@/rest/apis';
import { withDefaultPaginationParams } from '@/rest/utils';
import { GetVendorsParams, GetVendorSpendingsParams, UpdateVendorPayload, Vendor } from './types';

const get = (id: number) => RestApis.get<Vendor>(`/feed/vendors/${id}`);

const getList = (params?: GetVendorsParams) =>
  RestApis.get<Vendor[]>(`/feed/vendors`, {
    params: withDefaultPaginationParams(params),
  });

const update = (id: number, payload: UpdateVendorPayload) =>
  RestApis.patch<Vendor>(`/feed/vendors/${id}`, payload);

const getSpendings = (id: number, params?: GetVendorSpendingsParams) =>
  RestApis.patch<Spending[]>(`feed/spending`, {
    groupByItem: params?.groupBy,
    props: [{ id: id, type: 'VENDOR', exclude: false }],
  });

export const VendorApis = { get, getList, update, getSpendings };
