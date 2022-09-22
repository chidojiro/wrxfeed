import { UserRole } from '@/auth/constants';
import { Role, VisibilityConfig } from './types';

const transformVisibilityConfig = (config: any) => {
  return {
    ...config,
    default: config.resettable ? !config.visible : config.visible,
  } as VisibilityConfig;
};

export const transformRoleResponse = (data: any) => {
  const { categories, departments, vendors } = data;

  return {
    ...data,
    categories: categories?.map(transformVisibilityConfig),
    departments: departments?.map(transformVisibilityConfig),
    vendors: vendors?.map(transformVisibilityConfig),
  } as Role;
};

export const isAdmin = (role: Role) => role.name === UserRole.ADMIN;
