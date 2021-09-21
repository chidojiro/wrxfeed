import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { ForgotPwdFormModel } from '../../types';
import ActionButtons from '../../../common/atoms/ActionButtons';
import { useFormErrorHandler } from '../../../error';
import LoadingButton from '../../../common/atoms/LoadingButton';

const schema = yup.object({
  email: yup.string().email().required('This field is required'),
});

export interface ForgotPwdFormProps {
  onSubmit: SubmitHandler<ForgotPwdFormModel>;
}

const ForgotPwdForm: React.VFC<ForgotPwdFormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<ForgotPwdFormModel>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  });
  const handleFormError = useFormErrorHandler<ForgotPwdFormModel>();
  const handleFormSubmit: SubmitHandler<ForgotPwdFormModel> = React.useCallback(
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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                label="Email"
                type="email"
                required
                error={!!errors.email}
                helperText={errors.email?.message}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
      <ActionButtons>
        <LoadingButton loading={isSubmitting} type="submit" variant="contained" color="primary">
          Reset password
        </LoadingButton>
      </ActionButtons>
    </form>
  );
};

export default ForgotPwdForm;
