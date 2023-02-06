import { RestApis } from '@/rest/apis';

const create = (payload: any) => RestApis.post('/user/companies', payload);

export const CompanyApis = { create };
