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
} from '@main/entity';
import {
  AuthProfile,
  ChangePwdFormModel,
  ForgotPwdFormModel,
  LoginFormModel,
  Profile,
  ProfileFormModel,
} from '@auth/types';
import { InviteFormModel, FeedBackFormModel } from '@main/types';

export interface ApiClient {
  // Authentication API
  login: (data: LoginFormModel) => Promise<Identity>;
  logout: () => Promise<void>;
  signInWithGoogle: (accessToken: string) => Promise<UserToken>;
  getProfile: () => Promise<Profile>;
  getAuthProfile: () => Promise<AuthProfile>;
  updateProfile: (data: ProfileFormModel) => Promise<Profile>;
  changePassword: (data: ChangePasswordDto) => Promise<void>;
  forgotPassword: (data: ForgotPwdFormModel) => Promise<void>;
  resetPassword: (data: ResetPasswordDto) => Promise<void>;
  acceptInvitation: (id: string) => Promise<void>;
  // Feed
  getTransactions: (filters?: TransactionFilter) => Promise<Transaction[]>;
  getUnreadTransactionCount: (filters?: TransactionFilter) => Promise<number>;
  readAllTransactions: () => Promise<void>;
  getComments: (filters: CommentFilters) => Promise<Comment[]>;
  addComment: (transactionId: number, data: AddCommentParams) => Promise<Comment>;
  deleteComment: (commentId: number) => Promise<void>;
  editComment: (commentId: number, data: AddCommentParams) => Promise<void>;
  getTransactionById: (id: number) => Promise<Transaction>;
  getFeeds: (filters: GetFeedsFilters) => Promise<FeedItem[]>;
  getFeedItemTransactions: (id: FeedItemFilters) => Promise<Transaction[]>;
  getFeedItemComments: (id: FeedCommentFilters) => Promise<Comment[]>;
  addFeedItemComment: (feedId: number, data: AddFeedCommentParams) => Promise<Comment>;
  getFeedItemById: (feedId: number) => Promise<FeedItem>;
  postFeedBackFeed: (feedId: number, data: FeedBackFormModel) => Promise<void>;
  // Media
  getUploadFileToken: (body: GetUploadTokenBody) => Promise<UploadToken>;
  uploadAttachment: (data: File, uploadToken: UploadToken) => Promise<string>;
  // For Inbox page
  getMentions: (pagination?: Pagination) => Promise<User[]>;
  sendInvitation: (data: InviteFormModel) => Promise<void>;
  getUsers: (filters: GetUsersFilter) => Promise<User[]>;
  getContacts: (filters: GetContactsFilter) => Promise<Contact[]>;
  postFeedback: (transactionId: number, data: FeedBackFormModel) => Promise<void>;
  // Directory
  getDepartments: (filters?: DepartmentFilter) => Promise<Department[]>;
  getCategories: (pagination?: Pagination) => Promise<Category[]>;
  getVendors: (pagination?: Pagination) => Promise<Vendor[]>;
  updateCategory: (data?: Partial<Category>) => Promise<void>;
  // Notification
  getNotifications: (page?: Pagination) => Promise<NotificationsResponse>;
  patchNotification: (id: number) => Promise<void>;
  patchAllNotification: () => Promise<void>;
  // targets
  getTargets: (filters?: TargetFilter) => Promise<Target[]>;
  postTarget: (data: PostTargetParams) => Promise<void>;
  putTarget: (id: number, data: PutTargetParams) => Promise<void>;
  // Subscription
  getSubscriptions: () => Promise<Subscription>;
  updateSubscriptions: (data: SubscriptionParams) => Promise<Subscription>;
  deleteSubscriptions: (data: SubscriptionParams) => Promise<Subscription>;
}

export type ChangePasswordDto = Omit<ChangePwdFormModel, 'confirmPassword'>;

export interface ResetPasswordDto {
  password: string;
  token: string;
}

export interface Pagination {
  offset: number;
  limit: number;
}

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface MentionsFilters {
  order?: OrderDirection;
  pagination?: Pagination;
}

export interface CommentFilters {
  transactionId: number;
  order?: OrderDirection;
  pagination?: Pagination;
}

export interface TransactionFilter {
  department?: number;
  vendor?: number;
  category?: number;
  rootDepartment?: number;
  forYou?: boolean;
  pagination?: Pagination;
}

export enum UploadTypes {
  Attachments = 'attachments',
}

export interface GetUploadTokenBody {
  filename: string;
  contentType: string;
  uploadType: UploadTypes;
}

export interface UploadToken {
  uploadUrl: string;
  fileUrl: string;
}

export interface GetUsersFilter {
  text?: string;
  pagination?: Pagination;
}

export interface GetContactsFilter {
  text?: string;
  pagination?: Pagination;
}

export interface AddCommentParams {
  content?: string;
  attachment?: string;
}

export interface DepartmentFilter extends Pagination {
  parent?: number;
}

export interface TargetFilter extends Pagination {
  year: number;
  month: number;
  timestamp?: number;
}

export interface PutTargetParams {
  amount: number;
}

export interface PostTargetParams {
  month: number;
  year: number;
  amount: number;
  departmentId: number;
}

export interface SubscriptionParams {
  departments?: string[];
  vendors?: string[];
  categories?: string[];
}

export interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
}

export interface FeedItemFilters {
  id: number;
  page?: Pagination;
}

export interface FeedCommentFilters {
  feedId: number;
  order?: OrderDirection;
  page?: Pagination;
}

export interface AddFeedCommentParams {
  content?: string;
  attachment?: string;
}

export interface GetFeedsFilters {
  page?: Pagination;
  forYou?: number;
  department?: number;
  vendor?: number;
  category?: number;
  rootDepartment?: number;
}
