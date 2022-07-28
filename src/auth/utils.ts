import { CookiesUtils } from '@/common/utils';

const getToken = () => CookiesUtils.get('token');

const setToken = (token: string) => CookiesUtils.set('token', token);

const clearToken = () => CookiesUtils.remove('token');

const logout = () => {
  clearToken();
  localStorage.clear();
  window.location.href = '/login';
};

export const AuthUtils = {
  getToken,
  setToken,
  clearToken,
  logout,
};
