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
import {
  AuthProfile,
  ChangePwdFormModel,
  ForgotPwdFormModel,
  LoginFormModel,
  Profile,
  ProfileFormModel,
  SearchTypes,
} from '@auth/types';
import { InviteFormModel, FeedBackFormModel, SearchResult } from '@main/types';

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
  getDepartmentById: (depId: number) => Promise<Department>;
  maskLineItemAsRead: (id: number) => Promise<void>;
  getLineItemById: (id: number) => Promise<TransLineItem>;
  // feedback
  postFeedBackFeed: (feedId: number, data: FeedBackFormModel) => Promise<void>;
  postFeedBackLineItem: (id: number, data: FeedBackFormModel) => Promise<void>;
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
  getCategories: (pagination?: CategoryFilter) => Promise<Category[]>;
  getVendors: (pagination?: Pagination) => Promise<Vendor[]>;
  updateCategory: (data?: Partial<Category>) => Promise<void>;
  // Notification
  getNotifications: (page?: Pagination) => Promise<NotificationsResponse>;
  patchNotification: (id: number) => Promise<void>;
  patchAllNotification: () => Promise<void>;
  // targets
  getTargets: (filters?: TargetFilter) => Promise<Target[]>;
  postTarget: (data: PostTargetParams) => Promise<void>;
  putTarget: (id: number, data: PutTargetParams) => Promise<Target>;
  deleteTarget: (id: number) => Promise<void>;
  patchCalcSpending: (data: PatchCalcSpendingFilters) => Promise<TargetPeriod[]>;
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

export interface TransactionBody {
  props?: TargetProp[];
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
  term?: string;
}
export interface CategoryFilter extends Pagination {
  term?: string;
  dep?: number;
}

export interface TargetFilter extends Pagination {
  year: number;
  month?: number;
  timestamp?: number;
  dep?: number;
}

export interface PostTargetParams {
  name: string;
  depId?: number;
  isPrimary: boolean;
  props: TargetProp[];
  periods?: TargetPeriod[];
}
export interface PutTargetParams {
  name: string;
  depId?: number;
  isPrimary: boolean;
  props: TargetProp[];
  periods: TargetPeriod[];
}

export interface TargetProp {
  id: number;
  type: TargetPropType;
  name: string;
  exclude?: boolean;
}

export type TargetPeriod = {
  month: number;
  year: number;
  amount?: number;
  total?: number; // TODO: require backend return number type
};
export interface PatchCalcSpendingFilters {
  props: TargetProp[];
  periods: TargetPeriod[];
}

export enum TargetPropType {
  DEPARTMENT = 'DEPARTMENT',
  CATEGORY = 'CATEGORY',
  VENDOR = 'VENDOR',
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

export interface FeedFilters {
  page?: Pagination;
  forYou?: number;
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
