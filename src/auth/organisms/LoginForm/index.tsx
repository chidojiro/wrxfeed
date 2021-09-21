import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
// import Link from '@mui/material/Link';
// import { Link as RouterLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoginFormModel } from '@auth/types';
import LoadingButton from '@common/atoms/LoadingButton';

const schema = yup.object({
  email: yup.string().email('This field must be an email').required('This field is required'),
  password: yup
    .string()
    .min(3, 'A minimum of 3 characters is required')
    .required('This field is required'),
});

export interface LoginFormProps {
  onSubmit: SubmitHandler<LoginFormModel>;
}

const LoginForm: React.VFC<LoginFormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormModel>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            required
            error={!!errors.email}
            helperText={errors.email?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            error={!!errors.password}
            helperText={errors.password?.message}
            {...field}
          />
        )}
      />
      <FormControl>
        <LoadingButton
          loading={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          SIGN IN
        </LoadingButton>
      </FormControl>
      {/* <Link to="/forgot-pwd" variant="body2" display="block" align="center" component={RouterLink}>
        Forgot your password?
      </Link> */}
    </form>
  );
};

export default LoginForm;
