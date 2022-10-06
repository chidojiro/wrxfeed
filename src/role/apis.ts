import { Category, Department } from '@/main/entity';
import { RestApis } from '@/rest/apis';
import { Vendor } from '@/vendor/types';
import {
  CreateRolePayload,
  UpdateRolePayload,
  Role,
  UpdateAssignedRolesPayload,
  RestrictedItem,
} from './types';
import { transformRoleResponse } from './utils';

const get = (id: number) => RestApis.get(`/rbac/roles/${id}`).then(transformRoleResponse);

const getList = (): Promise<Role[]> =>
  RestApis.get(`/rbac/roles`).then((roles: any) => roles.map(transformRoleResponse));

const create = (payload: CreateRolePayload) => RestApis.post(`/rbac/roles`, payload);

const update = (id: number, payload: UpdateRolePayload) =>
  RestApis.put(`/rbac/roles/${id}`, payload);

const updateAssigned = (id: number, payload: UpdateAssignedRolesPayload) =>
  RestApis.put(`/rbac/accounts/${id}/roles`, payload);

const getCategories = () => RestApis.get<Category[]>('/rbac/categories');

const getDepartments = () =>
  RestApis.get<Department[]>('/rbac/departments', { params: { hierarchy: true } });

const getVendors = () => RestApis.get<Vendor[]>('/rbac/vendors');

const getRestrictedItems = () => RestApis.get<RestrictedItem[]>('/rbac/items?type=restricted');

export const RoleApis = {
  get,
  getList,
  create,
  update,
  updateAssigned,
  getCategories,
  getDepartments,
  getVendors,
  getRestrictedItems,
};
