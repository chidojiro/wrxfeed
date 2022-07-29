import { RestApis } from '@/rest/apis';
import { SortOrder } from '@/rest/types';
import { withDefaultPaginationParams } from '@/rest/utils';
import {
  ChangePasswordPayload,
  ForgotPasswordPayload,
  GetMentionsParams,
  GetUsersParams,
  GoogleProfile,
  Profile,
  ResetPasswordPayload,
  UpdateProfilePayload,
  User,
} from './types';

const get = () => RestApis.get<Profile>('/user/me');

const getGoogleProfile = () => RestApis.get<GoogleProfile>('/auth/me');

const update = (payload: UpdateProfilePayload) => RestApis.patch<Profile>('/user/me', payload);

const getUsers = (params: GetUsersParams) =>
  RestApis.get<User[]>('/user/users', { params: withDefaultPaginationParams(params) });

const changePassword = (payload: ChangePasswordPayload) =>
  RestApis.post('/admin/accounts/me/password', payload);

const forgotPassword = (payload: ForgotPasswordPayload) =>
  RestApis.post('/admin/accounts/forgot-password', payload);

const resetPassword = (payload: ResetPasswordPayload) =>
  RestApis.put('/admin/accounts/reset-password', payload);

const getMentions = async (params?: GetMentionsParams) =>
  RestApis.get<User[]>('/user/me/mentions', {
    params: withDefaultPaginationParams({ ...params, order: 'ASC' as SortOrder }),
  });

export const ProfileApis = {
  get,
  getGoogleProfile,
  update,
  getUsers,
  changePassword,
  forgotPassword,
  resetPassword,
  getMentions,
};
