import { UserToken } from '@identity/types';
import { Comment, Transaction, Discussion, User, Contact } from '@main/entity';
import { CommentFormModel } from '@main/types';
import { Identity } from '../identity';
import {
  ChangePwdFormModel,
  ForgotPwdFormModel,
  LoginFormModel,
  Profile,
  ProfileFormModel,
} from '../auth/types';
import {
  Activity,
  ActivityFilterModel,
  ActivityFormModel,
  Revenue,
  InviteFormModel,
} from '../diary/types';

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
  addComment: (transactionId: number, data: CommentFormModel) => Promise<Comment>;

  getDiscussions: (pagination?: Pagination) => Promise<Discussion[]>;
  uploadAttachment: (data: File) => Promise<void>;
  // For Inbox/Discussion list
  getMentions: (pagination?: Pagination) => Promise<User[]>;
  postAddInvitation: (data: InviteFormModel) => Promise<void>;
  getUsers: (filter: GetUsersFilter) => Promise<User[]>;
  getContacts: (filter: GetContactsFilter) => Promise<Contact[]>;

  searchActivities: (filter: ActivityFilterModel) => Promise<[Activity[], number]>;
  addActivity: (data: ActivityFormModel) => Promise<Activity>;
  updateActivity: (id: string, data: ActivityFormModel) => Promise<Activity>;
  deleteActivity: (id: string) => Promise<void>;
  getActivity: (id: string) => Promise<Activity>;

  getTags: () => Promise<string[]>;
  getRevenue: (filter: ActivityFilterModel) => Promise<Revenue>;
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
  department?: string;
  vendor?: string;
  category?: string;
  pagination?: Pagination;
}

export interface GetUsersFilter {
  text: string;
  pagination?: Pagination;
}

export interface GetContactsFilter {
  text: string;
  pagination?: Pagination;
}
