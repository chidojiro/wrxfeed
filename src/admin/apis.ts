import { RestApis } from '@/rest/apis';
import { Role } from './types';

const getRoles = () => RestApis.get<Role[]>(`/rbac/roles`);

export const AdminApis = { getRoles };
