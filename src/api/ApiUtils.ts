import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserToken, Identity } from '@identity/types';
import {
  Comment,
  Transaction,
  User,
  Contact,
  Department,
  Category,
  Vendor,
  Notification,
  Target,
  Subscription,
  FeedItem,
  TransLineItem,
} from '@main/entity';
import { ApiError } from '@error';
import {
  ApiClient,
  ChangePasswordDto,
  CommentFilters,
  GetUploadTokenBody,
  Pagination,
  ResetPasswordDto,
  TransactionBody,
  UploadToken,
  GetUsersFilter,
  GetContactsFilter,
  AddCommentParams,
  OrderDirection,
  DepartmentFilter,
  TargetFilter,
  PostTargetParams,
  PutTargetParams,
  PatchCalcSpendingFilters,
  SubscriptionParams,
  NotificationsResponse,
  FeedItemFilters,
  FeedCommentFilters,
  AddFeedCommentParams,
  FeedFilters,
  CategoryFilter,
  TargetPeriod,
} from '@api/types';
import {
  AuthProfile,
  ForgotPwdFormModel,
  LoginFormModel,
  Profile,
  ProfileFormModel,
} from '@auth/types';
import { handleResponseFail } from '@api/utils';
import { InviteFormModel, FeedBackFormModel } from '@main/types';

export default class ApiUtils implements ApiClient {
  private client: AxiosInstance;

  constructor(endpoint: string) {
    this.client = axios.create({ baseURL: endpoint });
    this.client.interceptors.response.use((response) => response, handleResponseFail);
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

  getAuthProfile = async (): Promise<AuthProfile> => {
    const resp = await this.request<AuthProfile>({
      url: '/auth/me',
      method: 'GET',
    });
    return resp.data;
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

  getTransactions = async (body?: TransactionBody): Promise<Transaction[]> => {
    const res = await this.request<Transaction[]>({
      url: '/feed/transactions',
      method: 'PATCH',
      data: body,
    });
    return res.data;
  };

  getUnreadLineItemsCount = async (filters?: FeedFilters): Promise<number> => {
    const params = {
      ...filters?.page,
      forYou: filters?.forYou,
      dep: filters?.department,
      rootDep: filters?.rootDepartment,
      cat: filters?.category,
    };
    const res = await this.request<FeedItem[]>({
      url: '/feed/items',
      method: 'GET',
      params,
    });
    return parseInt(res.headers['x-unread-count'], 10);
  };

  readAllTransactions = async (): Promise<void> => {
    const res = await this.request<void>({
      url: '/feed/items',
      method: 'PATCH',
    });
    return res.data;
  };

  getComments = async (filters: CommentFilters): Promise<Comment[]> => {
    const params = {
      order: filters.order,
      ...filters.pagination,
    };
    const res = await this.request<Comment[]>({
      url: `/feed/items/${filters.transactionId}/comments`,
      method: 'GET',
      params,
    });
    return res.data;
  };

  addComment = async (transactionId: number, data: AddCommentParams): Promise<Comment> => {
    const res = await this.request<Comment>({
      url: `/feed/items/${transactionId}/comments`,
      method: 'POST',
      data,
    });
    return res.data;
  };

  deleteComment = async (commentId: number): Promise<void> => {
    const res = await this.request<void>({
      url: `/feed/comments/${commentId}`,
      method: 'DELETE',
    });
    return res.data;
  };

  editComment = async (commentId: number, data: AddCommentParams): Promise<void> => {
    const res = await this.request<void>({
      url: `/feed/comments/${commentId}`,
      method: 'PUT',
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

  getUsers = async (filters: GetUsersFilter): Promise<User[]> => {
    const params = {
      text: filters?.text,
      ...filters.pagination,
    };
    const res = await this.request<User[]>({
      url: '/user/users',
      method: 'GET',
      params,
    });
    return res.data;
  };

  getContacts = async (filters: GetContactsFilter): Promise<Contact[]> => {
    const params = {
      text: filters?.text,
      ...filters?.pagination,
    };
    const res = await this.request<Contact[]>({
      url: '/inv/contacts',
      method: 'GET',
      params,
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
      url: `/feed/items/${transactionId}/feedback`,
      method: 'POST',
      data,
    });
    return res.data;
  };

  // DIRECTORY
  getDepartments = async (filters?: DepartmentFilter): Promise<Department[]> => {
    const res = await this.request<Department[]>({
      url: '/feed/departments',
      method: 'GET',
      params: filters,
    });
    return res.data;
  };

  getCategories = async (filter?: CategoryFilter): Promise<Category[]> => {
    const res = await this.request<Category[]>({
      url: '/feed/categories',
      method: 'GET',
      params: {
        ...filter,
      },
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

  getNotifications = async (page?: Pagination): Promise<NotificationsResponse> => {
    const res = await this.request<Notification[]>({
      url: '/noti/notifications',
      method: 'GET',
      params: {
        ...page,
      },
    });
    return {
      notifications: res.data,
      unreadCount: parseInt(res.headers['x-unread-count'], 10),
    };
  };

  patchNotification = async (id: number): Promise<void> => {
    const res = await this.request<void>({
      url: `/noti/notifications/${id}`,
      method: 'PATCH',
    });
    return res.data;
  };

  patchAllNotification = async (): Promise<void> => {
    const res = await this.request<void>({
      url: '/noti/notifications',
      method: 'PATCH',
    });
    return res.data;
  };

  getTargets = async (filters?: TargetFilter): Promise<Target[]> => {
    const res = await this.request<Target[]>({
      url: '/target/targets',
      method: 'GET',
      params: {
        year: filters?.year,
        month: filters?.month,
        dep: filters?.dep,
        forYou: filters?.forYou,
      },
    });
    return res.data;
  };

  postTarget = async (data: PostTargetParams): Promise<void> => {
    await this.request<void>({
      url: '/target/targets',
      method: 'POST',
      data,
    });
  };

  putTarget = async (id: number, data: PutTargetParams): Promise<void> => {
    await this.request<void>({
      url: `/target/targets/${id}`,
      method: 'PUT',
      data,
    });
  };

  deleteTarget = async (id: number): Promise<void> => {
    await this.request<void>({
      url: `/target/targets/${id}`,
      method: 'DELETE',
    });
  };

  patchCalcSpending = async (data: PatchCalcSpendingFilters): Promise<TargetPeriod[]> => {
    const res = await this.request<TargetPeriod[]>({
      url: '/target/spending',
      method: 'PATCH',
      data,
    });
    return res.data;
  };

  getTransactionById = async (id: number): Promise<Transaction> => {
    const res = await this.request<Transaction>({
      url: `/feed/transactions/${id}`,
      method: 'GET',
    });
    return res.data;
  };

  getSubscriptions = async (): Promise<Subscription> => {
    const res = await this.request<Subscription>({
      url: '/subs/subscriptions/mine',
      method: 'GET',
    });
    return res.data;
  };

  updateSubscriptions = async (data: SubscriptionParams): Promise<Subscription> => {
    const res = await this.request<Subscription>({
      url: '/subs/subscriptions/mine',
      method: 'PATCH',
      data,
    });
    return res.data;
  };

  deleteSubscriptions = async (data: SubscriptionParams): Promise<Subscription> => {
    const res = await this.request<Subscription>({
      url: '/subs/subscriptions/mine',
      method: 'DELETE',
      data,
    });
    return res.data;
  };

  getFeeds = async (filters: FeedFilters): Promise<FeedItem[]> => {
    const res = await this.request<FeedItem[]>({
      url: '/feed/items',
      method: 'GET',
      params: {
        ...filters?.page,
        forYou: filters?.forYou,
        dep: filters?.department,
        rootDep: filters?.rootDepartment,
        cat: filters?.category,
        vend: filters?.vendor,
        targetId: filters?.targetId,
        month: filters?.month,
        year: filters?.year,
      },
    });
    return res.data;
  };

  getFeedItemTransactions = async (filter: FeedItemFilters): Promise<Transaction[]> => {
    const res = await this.request<Transaction[]>({
      url: `/feed/items/${filter?.id}/line-items`,
      method: 'GET',
      params: filter?.page,
    });
    return res.data;
  };

  getFeedLineItems = async (filter: FeedItemFilters): Promise<TransLineItem[]> => {
    const res = await this.request<TransLineItem[]>({
      url: `/feed/items/${filter?.id}/line-items`,
      method: 'GET',
      params: filter?.page,
    });
    return res.data;
  };

  getFeedItemComments = async (filter: FeedCommentFilters): Promise<Comment[]> => {
    const res = await this.request<Comment[]>({
      url: `/feed/items/${filter.feedId}/comments`,
      method: 'GET',
      params: {
        ...filter?.page,
        order: filter?.order,
      },
    });
    return res.data;
  };

  addFeedItemComment = async (feedId: number, data: AddFeedCommentParams): Promise<Comment> => {
    const res = await this.request<Comment>({
      url: `/feed/items/${feedId}/comments`,
      method: 'POST',
      data,
    });
    return res.data;
  };

  getFeedItemById = async (feedId: number): Promise<FeedItem> => {
    const res = await this.request<FeedItem>({
      url: `/feed/items/${feedId}`,
      method: 'GET',
    });
    return res.data;
  };

  postFeedBackFeed = async (feedId: number, data: FeedBackFormModel): Promise<void> => {
    const res = await this.request<void>({
      url: `/feedback/feed-items/${feedId}/feedback`,
      method: 'POST',
      data,
    });
    return res.data;
  };

  getCategoryById = async (catId: number): Promise<Category> => {
    const res = await this.request<Category>({
      url: `/feed/categories/${catId}`,
      method: 'GET',
    });
    return res.data;
  };

  getVendorById = async (venId: number): Promise<Vendor> => {
    const res = await this.request<Vendor>({
      url: `/feed/vendors/${venId}`,
      method: 'GET',
    });
    return res.data;
  };

  getDepartmentById = async (dep: number): Promise<Department> => {
    const res = await this.request<Department>({
      url: `/feed/departments/${dep}`,
      method: 'GET',
    });
    return res.data;
  };

  maskLineItemAsRead = async (id: number): Promise<void> => {
    const res = await this.request<void>({
      url: `/feed/line-items/${id}`,
      method: 'PATCH',
    });
    return res.data;
  };

  postFeedBackLineItem = async (id: number, data: FeedBackFormModel): Promise<void> => {
    const res = await this.request<void>({
      url: `/feedback/line-items/${id}/feedback`,
      method: 'POST',
      data,
    });
    return res.data;
  };

  getLineItemById = async (id: number): Promise<TransLineItem> => {
    const res = await this.request<TransLineItem>({
      url: `/feed/line-items/${id}`,
      method: 'GET',
    });
    return res.data;
  };
}
