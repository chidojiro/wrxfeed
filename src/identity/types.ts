export interface UserToken {
  token: string;
  expireAt?: Date;
}

export interface Identity extends UserToken {
  displayName?: string | null;
  email?: string | null;
  roles?: string[];
  avatar?: string;
  status?: string;
}
