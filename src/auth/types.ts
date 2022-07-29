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

export type LoginPayload = {
  email: string;
  password: string;
};

export type GoogleAccessToken = {
  token: string;
  expireAt?: string;
  roles: string[];
};
