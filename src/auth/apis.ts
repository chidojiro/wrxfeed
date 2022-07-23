import { AuthProfile } from '@/auth/types';
import { Identity, UserToken } from '@/identity';
import { RestApis } from '@/rest/apis';
import { LoginPayload } from './types';

const login = (payload: LoginPayload) => RestApis.post<Identity>('/auth/admin/tokens', payload);

const signInWithGoogle = (accessToken: string) =>
  RestApis.post<UserToken>('/auth/google/access-tokens', null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

const logout = () => RestApis.delete('/auth/access-tokens/mine');

const getProfile = () => RestApis.get<AuthProfile>('/auth/me');

export const AuthApis = {
  login,
  logout,
  signInWithGoogle,
  getProfile,
};
