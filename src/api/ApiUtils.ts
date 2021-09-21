import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiError } from '../error';
import { Identity } from '../identity';
import { ForgotPwdFormModel, LoginFormModel, Profile, ProfileFormModel } from '../auth/types';
import { ApiClient, ChangePasswordDto, ResetPasswordDto } from './types';
import { Activity, ActivityFilterModel, ActivityFormModel, Revenue } from '../diary/types';
import { removeEmptyFields, sleep } from '../common/utils';
import { getTimeRangeFromFilter } from '../diary/utils';

export default class ApiUtils implements ApiClient {
  private client: AxiosInstance;

  constructor(endpoint: string) {
    this.client = axios.create({ baseURL: endpoint });
  }

  async request<T, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    try {
      const result = await this.client.request<T, R>(config);
      return result;
    } catch (error) {
      throw new ApiError(error);
    }
  }

  async login(data: LoginFormModel): Promise<Identity> {
    const resp = await this.request<Identity>({
      url: '/auth/admin/tokens',
      method: 'POST',
      data,
    });
    const identity: Identity = {
      displayName: resp.data.displayName,
      expireAt: new Date(resp.data.expireAt),
      // token won't be saved in local storage but in http cookie
      token: '',
      avatar: resp.data.avatar,
      email: resp.data.email,
      roles: resp.data.roles,
    };
    return identity;
  }

  async logout(): Promise<void> {
    return this.request({
      url: '/auth/tokens/mine',
      method: 'DELETE',
    });
  }

  async getProfile(): Promise<Profile> {
    const resp = await this.request<Profile>({
      url: '/admin/accounts/me',
      method: 'GET',
    });
    return resp.data;
  }

  async updateProfile(data: ProfileFormModel): Promise<Profile> {
    const resp = await this.request<Profile>({
      url: '/admin/accounts/me',
      method: 'PATCH',
      data,
    });
    return resp.data;
  }

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
      displayName: 'Admin',
      token: '',
      expireAt: new Date(),
      email: '',
      roles: [],
    };
    return fakeIdenity;
  },

  logout: async () => undefined,

  getProfile: async () => {
    await sleep(1000);
    return {
      displayName: 'Admin',
      email: 'john@gmail.com',
    };
  },

  updateProfile: async () => {
    return {
      displayName: 'Admin',
      email: 'john@gmail.com',
    };
  },

  changePassword: async () => undefined,

  forgotPassword: async () => undefined,

  resetPassword: async () => undefined,

  searchActivities: async () => {
    const models = [
      {
        id: '1',
        time: '2021-06-15T01:21:03.368Z',
        tags: ['play', 'gog'],
        income: 100.0,
        outcome: 0,
        content:
          'Lorem ipsum dolor sit amet\nconsectetur adipiscing elit\nmagnam aliquam quaerat voluptatem',
      },
      {
        id: '2',
        time: '2021-06-15T01:20:03.368Z',
        tags: ['play'],
        income: 0,
        outcome: 123.0,
        content: 'Nemo enim ipsam voluptatem',
      },
      {
        id: '3',
        time: '2021-06-15T01:19:03.368Z',
        tags: ['nec'],
        income: 0,
        outcome: 230.0,
        content:
          'At vero eos et accusamus et iusto odio dignissimos\nut aut reiciendis voluptatibus ',
      },
      {
        id: '4',
        time: '2021-06-14T01:21:03.368Z',
        tags: ['play', 'gog'],
        income: 100.0,
        outcome: 0,
        content:
          'Lorem ipsum dolor sit amet\nconsectetur adipiscing elit\nmagnam aliquam quaerat voluptatem',
      },
      {
        id: '5',
        time: '2021-06-14T01:20:03.368Z',
        tags: ['play'],
        income: 0,
        outcome: 123.0,
        content: 'Nemo enim ipsam voluptatem',
      },
      {
        id: '6',
        time: '2021-06-13T01:19:03.368Z',
        tags: ['nec'],
        income: 0,
        outcome: 230.0,
        content:
          'At vero eos et accusamus et iusto odio dignissimos\nut aut reiciendis voluptatibus ',
      },
    ];
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
