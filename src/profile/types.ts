import { Account, Company, Provider, UserStatus } from '@/main/entity';
import { PaginationParams } from '@/rest/types';

export type UpdateProfilePayload = {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  title?: string;
  department?: string;
  bio: string;
  lastLoginAt: string;
  avatar?: string;
};

export type GetUsersParams = PaginationParams & {
  text?: string;
};

export type Profile = {
  id?: number;
  email?: string;
  fullName?: string;
  title?: string;
  bio?: string;
  avatar?: string;
  company?: Company;
  department?: string;
  depId?: number;
  refererId?: number;
  signupDate?: string;
  lastLoginAt?: string;
};

export type User = Profile & {
  provider?: Provider;
  firstName?: string;
  lastName?: string;
  status?: UserStatus;
  referer?: User;
  account?: Account;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  password: string;
  token: string;
};

export type GetMentionsParams = PaginationParams;
