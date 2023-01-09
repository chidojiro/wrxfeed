import { AuthUtils } from '@/auth/utils';
import { API_BASE_URL, IS_TEST } from '@/env';
import { ApiErrorCode } from '@/error';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiError } from './../error/types';
import { BYPASS_INTERCEPTOR_HEADER_KEY } from './constants';

const myAxios = axios.create({
  baseURL: API_BASE_URL ?? '/api',
  withCredentials: false,
});

myAxios.interceptors.request.use(function (config) {
  if (IS_TEST) {
    config.baseURL = '';
  }

  return config;
});

myAxios.interceptors.response.use(
  function (response) {
    const isBypassed = response.config.headers?.[BYPASS_INTERCEPTOR_HEADER_KEY] === 'true';

    return isBypassed ? response : response.data;
  },
  function (error: AxiosError) {
    if (
      error.response?.status === ApiErrorCode.Unauthenticated &&
      window.location.pathname !== '/login'
    ) {
      AuthUtils.logout();
    }

    return Promise.reject(new ApiError(error));
  },
);

export const RestApis = myAxios;

export type RestApiConfig = AxiosRequestConfig;
