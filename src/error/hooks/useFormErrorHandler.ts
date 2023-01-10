import React from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FormErrorHandler } from '../types';
import { isFormError } from '../utils';
import useErrorHandler from './useErrorHandler';

export default function useFormErrorHandler<
  TFieldValues extends FieldValues = FieldValues,
>(): FormErrorHandler<TFieldValues> {
  const handleError = useErrorHandler();
  return React.useCallback(
    async (error, setError, message) => {
      if (isFormError<TFieldValues>(error)) {
        if (message) {
          toast.error('Please revise your input entry.');
        }
        Object.entries(error.details).forEach(([field, msg]) => {
          setError(field as FieldPath<TFieldValues>, { message: msg }, { shouldFocus: true });
        });
      } else {
        handleError(error);
      }
    },
    [handleError],
  );
}
