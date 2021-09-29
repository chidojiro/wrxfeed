import { Account } from './account.entity';
import { Company } from './company.entity';

export enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'IN_ACTIVE',
}

export enum ProviderName {
  GOOGLE = 'GOOGLE',
}

export type ProviderProfile = {
  id?: string;
  imageUrl?: string;
  email?: string;
  name?: string;
  givenName?: string;
  familyName?: string;
};

export type Provider = {
  name: ProviderName;
  profile: ProviderProfile | null;
};

export type User = {
  id?: number;
  provider?: Provider;
  email?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  title?: string;
  department?: string;
  signupDate?: string;
  status?: UserStatus;
  company?: Company;
  referer?: User;
  account?: Account;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};
