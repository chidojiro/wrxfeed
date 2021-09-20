export interface Profile {
  email: string;
  displayName: string;
  avatar?: string;
}

export interface LoginFormModel {
  email: string;
  password: string;
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
