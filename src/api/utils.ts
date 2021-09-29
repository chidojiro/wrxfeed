import { AxiosError } from 'axios';
import { ApiErrorCode } from '@src/error';
import DeferredObject from './DeferredObject';
import { ApiClient } from './types';

// A deferred object created to access ApiUtils outside of Component
const deferred = new DeferredObject<ApiClient>();

export function getApiClient(): PromiseLike<ApiClient> {
  return deferred.promise;
}

export function setApiClient(val: ApiClient): void {
  deferred.resolve(val);
}

export async function handleResponseFail(error: AxiosError): Promise<never> {
  const apiClient = await getApiClient();
  if (error.response?.status === ApiErrorCode.Unauthenticated) {
    // Force Logout
    await apiClient.logout();
    localStorage.clear();
    window.location.href = '/logout';
  }
  return Promise.reject(error);
}
