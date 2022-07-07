import axios, { AxiosRequestConfig } from 'axios';

const myAxios = axios.create({
  baseURL: '/api',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const RestApis = myAxios;

export type RestApiConfig = AxiosRequestConfig;
