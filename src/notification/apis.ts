import { Notification } from '@/main/entity';
import { RestApis } from '@/rest/apis';
import { BYPASS_INTERCEPTOR_HEADER } from '@/rest/constants';
import { withDefaultPaginationParams } from '@/rest/utils';
import { AxiosResponse } from 'axios';
import { GetNotificationsParams } from './types';

const getList = (params?: GetNotificationsParams) =>
  RestApis.get<AxiosResponse<Notification[]>>('/noti/notifications', {
    params: withDefaultPaginationParams(params),
    headers: { [BYPASS_INTERCEPTOR_HEADER]: 'true' },
  }).then((res) => ({
    notifications: res.data,
    unreadCount: parseInt(res.headers['x-unread-count'], 10),
  }));

const markAsRead = (id: number) => RestApis.patch(`/noti/notifications/${id}`);

const markAllAsRead = () => RestApis.patch('/noti/notifications');

export const NotificationApis = { getList, markAsRead, markAllAsRead };
