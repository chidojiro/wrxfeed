import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ChangePwdFormModel } from '../../types';
import ActionButtons from '../../../common/atoms/ActionButtons';
import { useNavUtils } from '../../../common/hooks';
import LoadingButton from '../../../common/atoms/LoadingButton';
import { useFormErrorHandler } from '../../../error';

const schema = yup.object({
  currentPassword: yup.string().required('This field is required'),
  newPassword: yup
    .string()
    .required('This field is required')
    .min(6, 'A minimum of 6 characters is required'),
  confirmPassword: yup
    .string()
    .required('This field is required')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

export interface ChangePwdFormProps {
  onSubmit: SubmitHandler<ChangePwdFormModel>;
}

const ChangePwdForm: React.VFC<ChangePwdFormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<ChangePwdFormModel>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });
  const { getLinkProps } = useNavUtils();
  const handleFormError = useFormErrorHandler<ChangePwdFormModel>();
  const handleFormSubmit: SubmitHandler<ChangePwdFormModel> = React.useCallback(
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
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <TextField
                label="Current Password"
                type="password"
                required
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <TextField
                label="New Password"
                type="password"
                required
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                label="Repeat Password"
                type="password"
                required
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
      <ActionButtons>
        <Button variant="contained" {...getLinkProps()}>
          Cancel
        </Button>
        <LoadingButton loading={isSubmitting} type="submit" variant="contained" color="primary">
          Submit
        </LoadingButton>
      </ActionButtons>
    </form>
  );
};

export default ChangePwdForm;
