import {
  AuthProfile,
  ChangePwdFormModel,
  ForgotPwdFormModel,
  LoginFormModel,
  Profile,
  ProfileFormModel,
  SearchTypes,
} from '@/auth/types';
import { Identity, UserToken } from '@/identity/types';
import {
  Category,
  Comment,
  Contact,
  Department,
  FeedItem,
  LineItem,
  Notification,
  Subscription,
  TopCategories,
  Transaction,
  TransLineItem,
  User,
  Vendor,
  VendorDescription,
} from '@/main/entity';
import { FeedBackFormModel, InviteFormModel, SearchResult } from '@/main/types';
import { PaginationParams } from '@/rest/types';
import {
  PatchCalcSpendingFilters,
  TargetPeriod,
  TargetProps,
  TargetSummaries,
} from '@/target/types';

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
  getTransactions: (body?: TransactionBody) => Promise<Transaction[]>;
  getUnreadLineItemsCount: (filters?: FeedFilters) => Promise<number>;
  readAllTransactions: () => Promise<void>;
  getComments: (filters: CommentFilters) => Promise<Comment[]>;
  addComment: (transactionId: number, data: AddCommentParams) => Promise<Comment>;
  deleteComment: (commentId: number) => Promise<void>;
  editComment: (commentId: number, data: AddCommentParams) => Promise<void>;
  getTransactionById: (id: number) => Promise<Transaction>;
  getFeeds: (filters: FeedFilters) => Promise<FeedItem[]>;
  getFeedItemTransactions: (id: FeedItemFilters) => Promise<Transaction[]>;
  getFeedLineItems: (id: FeedItemFilters) => Promise<TransLineItem[]>;
  getFeedItemComments: (id: FeedCommentFilters) => Promise<Comment[]>;
  addFeedItemComment: (feedId: number, data: AddFeedCommentParams) => Promise<Comment>;
  getFeedItemById: (feedId: number) => Promise<FeedItem>;
  getCategoryById: (catId: number) => Promise<Category>;
  getVendorById: (venId: number) => Promise<Vendor>;
  updateVendorById: (id: number, data: VendorDescription) => Promise<void>;
  getDepartmentById: (depId: number) => Promise<Department>;
  getTopCategories: (depId: number) => Promise<TopCategories[]>;
  maskLineItemAsRead: (id: number) => Promise<void>;
  getLineItemById: (id: number) => Promise<TransLineItem>;
  getLineItems: (departmentId: number, query: any) => Promise<TransLineItem[]>;
  updateLineItemById: (id: number, data: LineItem) => Promise<void>;
  // feedback
  postFeedBackFeed: (feedId: number, data: FeedBackFormModel) => Promise<void>;
  postFeedBackLineItem: (id: number, data: FeedBackFormModel) => Promise<void>;
  // Media
  getUploadFileToken: (body: GetUploadTokenBody) => Promise<UploadToken>;
  uploadAttachment: (data: File, uploadToken: UploadToken) => Promise<string>;
  // For Inbox page
  getMentions: (pagination?: PaginationParams) => Promise<User[]>;
  sendInvitation: (data: InviteFormModel) => Promise<void>;
  getUsers: (filters: GetUsersFilter) => Promise<User[]>;
  getContacts: (filters: GetContactsFilter) => Promise<Contact[]>;
  postFeedback: (transactionId: number, data: FeedBackFormModel) => Promise<void>;
  // Directory
  getDepartments: (filters?: DepartmentFilter) => Promise<Department[]>;
  getCategories: (filter?: CategoryFilter) => Promise<Category[]>;
  getVendors: (pagination?: PaginationParams) => Promise<Vendor[]>;
  updateCategory: (data?: Partial<Category>) => Promise<void>;
  // Notification
  getNotifications: (page?: PaginationParams) => Promise<NotificationsResponse>;
  patchNotification: (id: number) => Promise<void>;
  patchAllNotification: () => Promise<void>;
  patchCalcSpending: (data: PatchCalcSpendingFilters) => Promise<TargetPeriod[]>;
  getTargetSummaries: () => Promise<TargetSummaries>;
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

export enum OrderDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface MentionsFilters {
  order?: OrderDirection;
  pagination?: PaginationParams;
}

export interface CommentFilters {
  transactionId: number;
  order?: OrderDirection;
  pagination?: PaginationParams;
}

export interface TransactionBody {
  props?: TargetProps[];
  periods?: TargetPeriod[];
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
  pagination?: PaginationParams;
}

export interface GetContactsFilter {
  text?: string;
  pagination?: PaginationParams;
}

export interface AddCommentParams {
  content?: string;
  attachment?: string;
}

export interface DepartmentFilter extends PaginationParams {
  parent?: number;
  term?: string;
  includeSub?: 1 | 0;
}
export interface CategoryFilter extends PaginationParams {
  term?: string;
  dep?: number;
}

export interface SubscriptionParams {
  departments?: number[];
  vendors?: number[];
  categories?: number[];
}

export interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
}

export interface FeedItemFilters {
  id: number;
  page?: PaginationParams;
}

export interface FeedCommentFilters {
  feedId: number;
  order?: OrderDirection;
  page?: PaginationParams;
}

export interface AddFeedCommentParams {
  content?: string;
  attachment?: string;
}

export interface FeedFilters {
  page?: PaginationParams;
  forYou?: 1 | 0;
  department?: number;
  targetId?: number;
  vendor?: number;
  category?: number;
  rootDepartment?: number;
  month?: number;
  year?: number;
}

export interface SearchFilters {
  keyword: string;
  searchDept?: boolean;
  searchVend?: boolean;
  searchCate?: boolean;
  ignoreEmptyKeyword?: boolean;
  searchType?: SearchTypes;
  except?: SearchResult[] | null;
}
