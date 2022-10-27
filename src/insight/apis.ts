import { RestApis } from '@/rest/apis';
import { CreateInsightPayload, Insight, InsightFeedItem, UpdateInsightPayload } from './types';

const get = (id: number) => RestApis.get<Insight>(`/insight/items/${id}`);

const create = async (payload: CreateInsightPayload) =>
  RestApis.post<Insight>('/insight/items', payload);

const update = async (id: number, payload: UpdateInsightPayload) =>
  RestApis.put<Insight>(`/insight/items/${id}`, payload);

const _delete = async (id: number) => RestApis.delete<any>(`/insight/items/${id}`);

export const InsightApis = { get, create, update, delete: _delete };
