import { Profile } from '@auth/types';
import { Provider } from '@main/entity';

export interface UserToken {
  token: string;
  expireAt?: Date;
}

export interface Identity extends UserToken, Profile {
  provider?: Provider;
}
