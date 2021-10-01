import { Profile } from '@auth/types';
import { Provider } from '@main/entity';

export interface UserToken {
  token: string;
  expireAt?: string;
}

export interface Identity extends UserToken, Profile {
  provider?: Provider;
}
