import { FieldValues } from 'react-hook-form';
import { ApiError, ApiErrorCode, FormError } from './types';

export function isApiError(error: Error | ApiError | unknown): error is ApiError {
  return (error as ApiError).code !== undefined;
}

export function isUnauthenticated(error: Error | unknown): boolean {
  return isApiError(error) && error.code === ApiErrorCode.Unauthenticated;
}

export function isBadRequest(error: Error | unknown): boolean {
  return isApiError(error) && error.code === ApiErrorCode.BadRequest;
}

export function isFormError<TFieldValues extends FieldValues>(
  error: Error | FormError<TFieldValues> | unknown,
): error is FormError<TFieldValues> {
  return isApiError(error) && error.details !== undefined;
}
