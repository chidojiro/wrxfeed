import { AxiosError } from 'axios';
import { FieldValues, UseFormSetError } from 'react-hook-form';

export enum ApiErrorCode {
  NetworkError = 1,
  BadRequest = 400,
  Unauthenticated = 401,
  Unauthorized = 403,
  Notfound = 404,
  ServerError = 500,
  GatewayTimeout = 504,
}

function isAxiosError<T = unknown>(error: Error | AxiosError<T> | unknown): error is AxiosError<T> {
  return (error as AxiosError).isAxiosError;
}

export class ApiError extends Error {
  public readonly code: ApiErrorCode;

  public readonly details?: FieldValues;

  constructor(error: Error | unknown) {
    if (!isAxiosError<FormError<FieldValues>>(error)) {
      throw new Error('The error passed in constructor must be an axios error');
    }

    super(error.message);
    this.stack = error.stack;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      this.code = error.response.status;
      this.details = error.response.data.details;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      this.code = ApiErrorCode.NetworkError;
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('An error occurred while setting up the api request');
    }
  }
}

export interface FormError<TFieldValues extends FieldValues> extends ApiError {
  details: TFieldValues;
}

export interface ErrorHandler {
  (error: Error | unknown): Promise<void>;
}

export interface FormErrorHandler<TFieldValues extends FieldValues> {
  (
    error: Error | unknown,
    setError: UseFormSetError<TFieldValues>,
    message?: string,
  ): Promise<void>;
}
