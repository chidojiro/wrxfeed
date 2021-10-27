export interface Profile {
  company?: string;
  id: number;
  email: string;
  fullName: string;
  title?: string;
  department?: string;
  signupDate?: string;
  bio?: string;
  lastLoginAt?: string;
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

export interface ResetPwdFormModel {
  newPassword: string;
  confirmPassword: string;
}
