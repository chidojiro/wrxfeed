import { Company } from '@/main/entity';

export interface Profile {
  company?: Company;
  id?: number;
  email?: string;
  fullName?: string;
  title?: string;
  department?: string;
  signupDate?: string;
  bio?: string;
  lastLoginAt?: string;
  depId?: number;
  refererId?: number;
  avatar?: string;
}

export interface AuthProfile {
  googleLoginId: string;
  roles: string[];
}

export interface LoginFormModel {
  email: string;
  password: string;
}

export interface ProfileFormModel {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  title?: string;
  department?: string;
  bio: string;
  lastLoginAt: string;
  avatar?: string;
}

export interface ChangePwdFormModel {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ForgotPwdFormModel {
  email: string;
}

export enum SearchTypes {
  Local = 'Local',
  Api = 'Api',
}
