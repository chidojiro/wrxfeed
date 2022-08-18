import { Subscription } from '@/main/entity';
import { RestApis } from '@/rest/apis';
import { DeleteSubscriptionPayload, UpdateSubscriptionPayload } from './types';

const get = () => RestApis.get<Subscription>('/subs/subscriptions/mine');

const update = (payload: UpdateSubscriptionPayload) =>
  RestApis.patch<Subscription>('/subs/subscriptions/mine', payload);

const _delete = (payload: DeleteSubscriptionPayload) =>
  RestApis.delete<Subscription>('/subs/subscriptions/mine', {
    data: payload,
  });

export const SubscriptionApis = { get, update, delete: _delete };
