import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';
import FormInput from '@/auth/atoms/FormInput';
import { ProfileFormModel } from '../../types';
import { useFormErrorHandler } from '../../../error';

const schema = yup.object({
  displayName: yup.string().required('This field is required'),
});

export interface ProfileFormProps {
  defaultValues: Partial<ProfileFormModel>;
  onSubmit: SubmitHandler<ProfileFormModel>;
}

const ProfileForm: React.VFC<ProfileFormProps> = ({ defaultValues, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<ProfileFormModel>({
    defaultValues,
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });
  const handleFormError = useFormErrorHandler<ProfileFormModel>();
  const handleFormSubmit: SubmitHandler<ProfileFormModel> = React.useCallback(
    async (data) => {
      try {
        await onSubmit(data);
      } catch (error) {
        handleFormError(error, setError, 'Please correct your inputs');
      }
    },
    [onSubmit, handleFormError, setError],
  );

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <FormInput placeholder="Name" required error={!!errors.firstName} {...field} />
        )}
      />
      <FormInput placeholder="Password" value="******" type="password" contentEditable={false} />
      <div>
        <RouterLink to="/">Cancel</RouterLink>
        <button disabled={isSubmitting} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
