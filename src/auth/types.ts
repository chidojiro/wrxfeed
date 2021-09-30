export interface Profile {
  email: string;
  fullName: string;
  title: string;
  department: string;
  signupDate: Date;
}

export interface LoginFormModel {
  email: string;
  password: string;
}

export interface OnboardFormModel {
  firstName: string;
  lastName: string;
  companyName: string;
  title: string;
  department: string;
  bio: string;
}

export interface ProfileFormModel {
  displayName: string;
  email: string;
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
