import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserToken } from '@identity/types';
import {
  Comment,
  Transaction,
  User,
  Discussion,
  Contact,
  Department,
  Category,
  Vendor,
  Notification,
  Target,
} from '@main/entity';
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
  AddCommentParams,
  OrderDirection,
  DepartmentFilter,
  TargetFilter,
  PostTargetParams,
  PutTargetParams,
} from '@api/types';
import { ForgotPwdFormModel, LoginFormModel, Profile, ProfileFormModel } from '@auth/types';
import { handleResponseFail } from '@api/utils';
import { InviteFormModel, FeedBackFormModel } from '@main/types';

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

  acceptInvitation = async (id: string): Promise<void> => {
    const resp = await this.request<void>({
      url: `/inv/invitations/${id}`,
      method: 'PATCH',
    });
    return resp.data;
  };

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

  addComment = async (transactionId: number, data: AddCommentParams): Promise<Comment> => {
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
      params: {
        ...pagination,
        order: OrderDirection.ASC,
      },
    });
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
      params: {
        ...pagination,
        order: OrderDirection.DESC,
      },
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

  sendInvitation = async (data: InviteFormModel): Promise<void> => {
    const res = await this.request<void>({
      url: '/inv/invitations',
      method: 'POST',
      data,
    });
    return res.data;
  };

  postFeedback = async (transactionId: number, data: FeedBackFormModel): Promise<void> => {
    const res = await this.request<void>({
      url: `/feed/transactions/${transactionId}/feedback`,
      method: 'POST',
      data,
    });
    return res.data;
  };

  // DIRECTORY
  getDepartments = async (filter?: DepartmentFilter): Promise<Department[]> => {
    const res = await this.request<Department[]>({
      url: '/feed/departments',
      method: 'GET',
      params: filter,
    });
    return res.data;
  };

  getCategories = async (pagination?: Pagination): Promise<Category[]> => {
    const res = await this.request<Category[]>({
      url: '/feed/categories',
      method: 'GET',
      params: pagination,
    });
    return res.data;
  };

  getVendors = async (pagination?: Pagination): Promise<Vendor[]> => {
    const res = await this.request<Vendor[]>({
      url: '/feed/vendors',
      method: 'GET',
      params: pagination,
    });
    return res.data;
  };

  updateCategory = async (data?: Partial<Category>): Promise<void> => {
    const res = await this.request<void>({
      url: `/feed/categories/${data?.id}`,
      method: 'PATCH',
      data,
    });
    return res.data;
  };

  getNotifications = async (page?: Pagination): Promise<Notification[]> => {
    const res = await this.request<Notification[]>({
      url: '/noti/notifications',
      method: 'GET',
      params: {
        ...page,
      },
    });
    return res.data;
  };

  patchNotification = async (id: number): Promise<void> => {
    const res = await this.request<void>({
      url: `/noti/notifications/${id}`,
      method: 'PATCH',
    });
    return res.data;
  };

  getTargets = async (filter?: TargetFilter): Promise<Target[]> => {
    const res = await this.request<Target[]>({
      url: '/target/targets',
      method: 'GET',
      params: {
        ...filter,
      },
    });
    return res.data;
  };

  postTarget = async (data: PostTargetParams): Promise<void> => {
    await this.request<void>({
      url: '/target/targets',
      method: 'POST',
      data: {
        ...data,
      },
    });
  };

  putTarget = async (id: number, data: PutTargetParams): Promise<void> => {
    await this.request<void>({
      url: `/target/targets/${id}`,
      method: 'PUT',
      data: {
        ...data,
      },
    });
  };
}
