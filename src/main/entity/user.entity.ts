import { Account } from './account.entity';
import { Company } from './company.entity';

export enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'IN_ACTIVE',
}

export type User = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  title?: string;
  department?: string;
  signupDate: Date;
  status: UserStatus;
  company: Company;
  referer?: User;
  account: Account;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
