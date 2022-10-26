import { RestApis } from '@/rest/apis';
import { CreateInsightPayload } from './types';

const create = async (payload: CreateInsightPayload) =>
  RestApis.post<any>('/insight/items', payload);

export const InsightApis = { create };
