import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserToken } from '@identity/types';
import { Comment, Transaction, User, Discussion, Contact } from '@main/entity';
import { CommentFormModel } from '@main/types';
import { ApiError } from '@error';
import { Identity } from '@identity';
import {
  ApiClient,
  ChangePasswordDto,
  CommentFilters,
  GetUploadTokenBody,
  Pagination,
  ResetPasswordDto,
  TransactionFilter,
  UploadToken,
  GetUsersFilter,
  GetContactsFilter,
} from '@api/types';
import { ForgotPwdFormModel, LoginFormModel, Profile, ProfileFormModel } from '@auth/types';
import { removeEmptyFields } from '@common/utils';
import { handleResponseFail } from '@api/utils';
import {
  InviteFormModel,
  Activity,
  ActivityFilterModel,
  ActivityFormModel,
  Revenue,
} from '../diary/types';
import { getTimeRangeFromFilter } from '../diary/utils';

export default class ApiUtils implements ApiClient {
  private client: AxiosInstance;

  constructor(endpoint: string) {
    this.client = axios.create({ baseURL: endpoint });
    this.client.interceptors.request.use((response) => response, handleResponseFail);
  }

  request = async <T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> => {
    try {
      return await this.client.request<T, R>(config);
    } catch (error) {
      throw new ApiError(error);
    }
  };

  login = async (data: LoginFormModel): Promise<Identity> => {
    const resp = await this.request<Identity>({
      url: '/auth/admin/tokens',
      method: 'POST',
      data,
    });
    return {
      id: resp.data.id,
      fullName: resp.data.fullName,
      expireAt: resp.data.expireAt,
      // token won't be saved in local storage but in http cookie
      token: '',
      avatar: resp.data.avatar,
      email: resp.data.email,
    };
  };

  signInWithGoogle = async (accessToken: string): Promise<UserToken> => {
    const resp = await this.request<UserToken>({
      url: '/auth/google/access-tokens',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return resp.data;
  };

  logout = async (): Promise<void> => {
    return this.request({
      url: '/auth/access-tokens/mine',
      method: 'DELETE',
    });
  };

  getProfile = async (): Promise<Profile> => {
    const resp = await this.request<Profile>({
      url: '/user/me',
      method: 'GET',
    });
    return resp.data;
  };

  updateProfile = async (data: ProfileFormModel): Promise<Profile> => {
    const resp = await this.request<Profile>({
      url: '/user/me',
      method: 'PATCH',
      data,
    });
    return resp.data;
  };

  async changePassword(data: ChangePasswordDto): Promise<void> {
    await this.request<void>({
      url: '/admin/accounts/me/password',
      method: 'POST',
      data,
    });
  }

  async forgotPassword(data: ForgotPwdFormModel): Promise<void> {
    await this.request<void>({
      url: '/admin/accounts/forgot-password',
      method: 'POST',
      data,
    });
  }

  async resetPassword(data: ResetPasswordDto): Promise<void> {
    await this.request<void>({
      url: '/admin/accounts/reset-password',
      method: 'PUT',
      data,
    });
  }

  getTransactions = async (filter?: TransactionFilter): Promise<Transaction[]> => {
    const params = {
      ...filter?.pagination,
      dep: filter?.department,
      ven: filter?.vendor,
      cat: filter?.category,
    };
    const res = await this.request<Transaction[]>({
      url: '/feed/transactions',
      method: 'GET',
      params,
    });
    return res.data;
  };

  getComments = async (filters: CommentFilters): Promise<Comment[]> => {
    const params = {
      order: filters.order,
      ...filters.pagination,
    };
    const res = await this.request<Comment[]>({
      url: `/feed/transactions/${filters.transactionId}/comments`,
      method: 'GET',
      params,
    });
    return res.data;
  };

  addComment = async (transactionId: number, data: CommentFormModel): Promise<Comment> => {
    const res = await this.request<Comment>({
      url: `/feed/transactions/${transactionId}/comments`,
      method: 'POST',
      data,
    });
    return res.data;
  };

  getMentions = async (pagination?: Pagination): Promise<User[]> => {
    const res = await this.request<User[]>({
      url: '/user/me/mentions',
      method: 'GET',
      params: pagination,
    });
    // console.log('Check res = ', res);
    return res.data;
  };

  getUsers = async (filter: GetUsersFilter): Promise<User[]> => {
    const params = {
      text: filter?.text,
      ...filter.pagination,
    };
    const res = await this.request<User[]>({
      url: '/user/users',
      method: 'GET',
      params,
    });
    return res.data;
  };

  getContacts = async (filter: GetContactsFilter): Promise<Contact[]> => {
    const params = {
      text: filter.text,
      ...filter.pagination,
    };
    const res = await this.request<Contact[]>({
      url: '/inv/contacts',
      method: 'GET',
      params,
    });
    return res.data;
  };

  getDiscussions = async (pagination?: Pagination): Promise<Discussion[]> => {
    const res = await this.request<Discussion[]>({
      url: '/user/me/mentions',
      method: 'GET',
      params: pagination,
    });
    return res.data;
  };

  // Media
  getUploadFileToken = async (body: GetUploadTokenBody): Promise<UploadToken> => {
    const res = await this.request<UploadToken>({
      url: '/media/upload-tokens',
      method: 'POST',
      data: body,
    });
    return res.data;
  };

  uploadAttachment = async (file: File, uploadToken: UploadToken): Promise<string> => {
    const fileData = new Uint8Array(await file.arrayBuffer());
    const res = await this.request<string>({
      url: uploadToken.uploadUrl,
      method: 'PUT',
      data: fileData,
    });
    return res.data;
  };

  postAddInvitation = async (data: InviteFormModel): Promise<void> => {
    console.log('Check postAddInvitation data = ', data);
    const res = await this.request<void>({
      url: '/inv/invitations',
      method: 'POST',
      data,
    });
    console.log('Check postAddInvitation res = ', res);
    // return res.data;
  };

  async searchActivities(filter: ActivityFilterModel): Promise<[Activity[], number]> {
    const [from, to] = getTimeRangeFromFilter(filter);
    const resp = await this.request<Activity[]>({
      url: '/diary/activities',
      method: 'GET',
      params: removeEmptyFields({
        text: filter.text,
        tags: filter.tags,
        from: from?.toISOString(),
        to: to?.toISOString(),
        limit: filter.pageSize,
        offset: (filter.page - 1) * filter.pageSize,
      }),
    });
    const total = parseInt(resp.headers['x-total-count'], 10);
    return [resp.data, Math.ceil(total / filter.pageSize)];
  }

  async addActivity(data: ActivityFormModel): Promise<Activity> {
    const resp = await this.request<Activity>({
      url: '/diary/activities',
      method: 'POST',
      data: removeEmptyFields(data),
    });
    return resp.data;
  }

  async updateActivity(id: string, data: ActivityFormModel): Promise<Activity> {
    const resp = await this.request<Activity>({
      url: `/diary/activities/${id}`,
      method: 'PUT',
      data: removeEmptyFields(data),
    });
    return resp.data;
  }

  async deleteActivity(id: string): Promise<void> {
    await this.request<void>({
      url: `/diary/activities/${id}`,
      method: 'DELETE',
    });
  }

  async getActivity(id: string): Promise<Activity> {
    const resp = await this.request<Activity>({
      url: `/diary/activities/${id}`,
      method: 'GET',
    });
    return resp.data;
  }

  async getTags(): Promise<string[]> {
    const resp = await this.request<string[]>({
      url: '/diary/tags',
      method: 'GET',
    });
    return resp.data;
  }

  async getRevenue(filter: ActivityFilterModel): Promise<Revenue> {
    const [from, to] = getTimeRangeFromFilter(filter);
    const resp = await this.request<Revenue>({
      url: '/diary/stat/revenue',
      method: 'GET',
      params: {
        text: filter.text || undefined,
        tags: filter.tags || undefined,
        from: from?.toISOString(),
        to: to?.toISOString(),
      },
    });
    return resp.data;
  }
}
