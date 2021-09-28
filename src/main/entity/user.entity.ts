import { Account } from './account.entity';
import { Company } from './company.entity';

export enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'IN_ACTIVE',
}

export type User = {
  id?: number;
  email: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
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
