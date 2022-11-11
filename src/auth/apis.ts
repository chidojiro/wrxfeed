import { GoogleAccessToken } from '@/auth/types';
import { RestApis } from '@/rest/apis';
import { AuthUtils } from './utils';

const signInWithGoogle = (accessToken: string) =>
  RestApis.post<GoogleAccessToken>('/auth/google/access-tokens', null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

const logout = async () => {
  await RestApis.delete('/auth/access-tokens/mine');
  AuthUtils.logout();
};

const _switch = (email: string) => RestApis.patch('/auth/access-tokens', { email });

export const AuthApis = {
  logout,
  signInWithGoogle,
  switch: _switch,
};
