import { User } from '@main/entity';

export interface UserToken {
  token: string;
  expireAt?: Date;
}

export interface Identity extends UserToken, User {}
