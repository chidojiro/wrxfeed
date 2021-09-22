import { User } from 'firebase/auth';

export interface Identity {
  displayName: string | null;
  token: string;
  expireAt?: Date;
  email: string | null;
  roles?: string[];
  avatar?: string;
  status?: string;
  user?: User;
}
