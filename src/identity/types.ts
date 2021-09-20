export interface Identity {
  displayName: string;
  token: string;
  expireAt: Date;
  email: string;
  roles: string[];
  avatar?: string;
}
