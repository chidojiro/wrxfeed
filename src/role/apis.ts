import { Category, Department } from '@/main/entity';
import { RestApis } from '@/rest/apis';
import { Vendor } from '@/vendor/types';
import { CreateRolePayload } from './types';
import { transformRoleResponse } from './utils';

const get = (id: number) => RestApis.get(`/rbac/roles/${id}`).then(transformRoleResponse);

const getList = () => null;

const create = (payload: CreateRolePayload) => RestApis.post(`/rbac/roles`, payload);

const update = () => null;

const updateAssigned = () => null;

const getCategories = () => RestApis.get<Category[]>('/rbac/categories');

const getDepartments = () =>
  RestApis.get<Department[]>('/rbac/departments', { params: { hierarchy: true } });

const getVendors = () => RestApis.get<Vendor[]>('/rbac/vendors');

export const RoleApis = {
  get,
  getList,
  create,
  update,
  updateAssigned,
  getCategories,
  getDepartments,
  getVendors,
};
