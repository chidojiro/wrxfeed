import { AuthUtils } from '@/auth/utils';
import { API_BASE_URL } from '@/config';
import { ApiErrorCode } from '@/error';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { BYPASS_INTERCEPTOR_HEADER } from './constants';

const myAxios = axios.create({
  baseURL: API_BASE_URL ?? '/api',
  withCredentials: false,
});

myAxios.interceptors.response.use(
  function (response) {
    const isBypassed = response.config.headers?.[BYPASS_INTERCEPTOR_HEADER] === 'true';

    return isBypassed ? response : response.data;
  },
  function (error: AxiosError) {
    if (
      error.response?.status === ApiErrorCode.Unauthenticated &&
      window.location.pathname !== '/login'
    ) {
      AuthUtils.logout();
    }
    return Promise.reject(error);
  },
);

export const RestApis = myAxios;

export type RestApiConfig = AxiosRequestConfig;
