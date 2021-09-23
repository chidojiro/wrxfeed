export enum AccountType {
  User = 'USER',
  Admin = 'ADMIN',
}

export type Account = {
  id: number;
  google_login_id?: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
};
