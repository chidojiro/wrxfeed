import { AuthApis } from '@/auth/apis';
import { ApiErrorCode } from '@/error';
import { AxiosError } from 'axios';

export async function handleResponseFail(error: AxiosError): Promise<never> {
  if (
    error.response?.status === ApiErrorCode.Unauthenticated &&
    window.location.pathname !== '/login'
  ) {
    // Force Logout
    await AuthApis.logout();
    localStorage.clear();
    window.location.href = '/login';
  }
  return Promise.reject(error);
}
