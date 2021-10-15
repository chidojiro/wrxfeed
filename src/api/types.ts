import { UserToken } from '@identity/types';
import {
  Comment,
  Transaction,
  Discussion,
  User,
  Contact,
  Department,
  Category,
  Vendor,
} from '@main/entity';
import {
  ChangePwdFormModel,
  ForgotPwdFormModel,
  LoginFormModel,
  Profile,
  ProfileFormModel,
} from '@auth/types';
import { Identity } from '@identity';
import { InviteFormModel, FeedBackFormModel } from '@main/types';

export interface ApiClient {
  // Authentication API
  login: (data: LoginFormModel) => Promise<Identity>;
  logout: () => Promise<void>;
  signInWithGoogle: (accessToken: string) => Promise<UserToken>;
  getProfile: () => Promise<Profile>;
  updateProfile: (data: ProfileFormModel) => Promise<Profile>;
  changePassword: (data: ChangePasswordDto) => Promise<void>;
  forgotPassword: (data: ForgotPwdFormModel) => Promise<void>;
  resetPassword: (data: ResetPasswordDto) => Promise<void>;
  // Transaction API
  getTransactions: (filters?: TransactionFilter) => Promise<Transaction[]>;
  getComments: (filters: CommentFilters) => Promise<Comment[]>;
  addComment: (transactionId: number, data: AddCommentParams) => Promise<Comment>;

  getDiscussions: (pagination?: Pagination) => Promise<Discussion[]>;
  // Media
  getUploadFileToken: (body: GetUploadTokenBody) => Promise<UploadToken>;
  uploadAttachment: (data: File, uploadToken: UploadToken) => Promise<string>;
  // For Inbox/Discussion list
  getMentions: (pagination?: Pagination) => Promise<User[]>;
  postAddInvitation: (data: InviteFormModel) => Promise<void>;
  getUsers: (filter: GetUsersFilter) => Promise<User[]>;
  getContacts: (filter: GetContactsFilter) => Promise<Contact[]>;
  postFeedback: (transactionId: number, data: FeedBackFormModel) => Promise<void>;
  // Directory
  getDepartments: (pagination?: Pagination) => Promise<Department[]>;
  getCategories: (pagination?: Pagination) => Promise<Category[]>;
  getVendors: (pagination?: Pagination) => Promise<Vendor[]>;
}

export interface AuthClient {
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<UserToken>;
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

export interface CommentFilters {
  transactionId: number;
  order?: OrderDirection;
  pagination?: Pagination;
}

export interface TransactionFilter {
  department?: number;
  vendor?: number;
  category?: number;
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
  text: string;
  pagination?: Pagination;
}

export interface AddCommentParams {
  content?: string;
  attachment?: string;
}
