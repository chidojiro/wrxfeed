import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserToken } from '@identity/types';
import { Comment, Transaction, User } from '@main/entity';
import { CommentFormModel } from '@main/types';
import { ApiError } from '@error';
import { Identity } from '@identity';
import {
  ApiClient,
  ChangePasswordDto,
  CommentFilters,
  Pagination,
  ResetPasswordDto,
} from '@api/types';
import { ForgotPwdFormModel, LoginFormModel, Profile, ProfileFormModel } from '@auth/types';
import { removeEmptyFields, sleep } from '@common/utils';
import { handleResponseFail } from '@api/utils';
import { Activity, ActivityFilterModel, ActivityFormModel, Revenue } from '../diary/types';
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

  getTransactions = async (pagination?: Pagination): Promise<Transaction[]> => {
    const res = await this.request<Transaction[]>({
      url: '/feed/transactions',
      method: 'GET',
      params: pagination,
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

  // /api/media/upload-tokens
  postUploadAttachment = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('file', file, file.name);
    const res = await this.request<User[]>({
      url: '/media/me/upload-tokens',
      method: 'POST',
      data: formData,
    });
    console.log(res);
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

export const fakeApiUtils: ApiClient = {
  login: async () => {
    const fakeIdenity: Identity = {
      fullName: 'Admin',
      token: '',
      expireAt: new Date().toISOString(),
      email: '',
    };
    return fakeIdenity;
  },

  signInWithGoogle: async () => {
    const userToken: UserToken = {
      token: '',
      expireAt: new Date().toISOString(),
    };
    return userToken;
  },

  logout: async () => undefined,

  getProfile: async () => {
    await sleep(1000);
    return {
      id: 1,
      email: 'antran@gmail.com',
      fullName: 'An Tran',
      title: 'Admin',
      department: 'Dev',
      signupDate: new Date().toISOString(),
    };
  },

  updateProfile: async () => {
    return {
      id: 1,
      email: 'antran@gmail.com',
      fullName: 'An Tran',
      title: 'Admin',
      department: 'Dev',
      signupDate: new Date().toISOString(),
    };
  },

  changePassword: async () => undefined,

  forgotPassword: async () => undefined,

  resetPassword: async () => undefined,

  async getTransactions(): Promise<Transaction[]> {
    return [];
  },

  async getComments(): Promise<Comment[]> {
    return [];
  },

  searchActivities: async () => {
    const models: Activity[] = [];
    const pageCount = 12;
    return [models, pageCount];
  },

  addActivity: async (data) => {
    return {
      ...data,
      id: 'newid',
      time: data.time.toISOString(),
      income: data.income || 0,
      outcome: data.outcome || 0,
    };
  },

  updateActivity: async (id: string, data: ActivityFormModel) => {
    return {
      ...data,
      id,
      time: data.time.toISOString(),
      income: data.income || 0,
      outcome: data.outcome || 0,
    };
  },

  deleteActivity: async () => {
    await sleep(10);
  },

  getActivity: async () => {
    // await sleep(1000);
    // const err = new ApiError('Test');
    // err.statusCode = 404;
    // throw err;
    return {
      id: '1',
      time: '2021-06-15T01:21:03.368Z',
      tags: ['play', 'gog'],
      income: 100.0,
      outcome: 0,
      content:
        'Lorem ipsum dolor sit amet\nconsectetur adipiscing elit\nmagnam aliquam quaerat voluptatem',
    };
  },

  getTags: async () => {
    const tags = ['abc', 'def', 'ghi'];
    return tags;
  },

  getRevenue: async () => {
    return { income: 123, outcome: 456 };
  },
};
