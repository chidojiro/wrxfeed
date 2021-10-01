import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ProfileFormModel } from '@auth/types';
import LoadingButton from '@common/atoms/LoadingButton';
import FormInput from '@auth/atoms/FormInput';
import { Stack } from '@mui/material';
import { Gray } from '@theme/colors';
import { ReactComponent as ArrowRightIcon } from '@assets/icons/outline/arrow-right.svg';
import { SxProps } from '@mui/system';

const schema = yup.object({
  firstName: yup.string().required('This field is required'),
  lastName: yup.string().required('This field is required'),
  companyName: yup.string().required('This field is required'),
});

export interface BasicUserInfoFormProps {
  onSubmit: SubmitHandler<ProfileFormModel>;
  sx: SxProps;
}

const BasicUserInfoForm: React.VFC<BasicUserInfoFormProps> = ({ sx, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ProfileFormModel>({
    defaultValues: {
      firstName: '',
      lastName: '',
      companyName: '',
    },
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={sx} width={433} spacing={2.25}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <FormInput
              placeholder="First name"
              type="firstName"
              required
              error={!!errors.firstName}
              {...field}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <FormInput
              placeholder="Last name"
              type="lastName"
              required
              error={!!errors.lastName}
              {...field}
            />
          )}
        />
        <Controller
          name="companyName"
          control={control}
          render={({ field }) => (
            <FormInput
              placeholder="Company name"
              type="companyName"
              required
              error={!!errors.lastName}
              {...field}
            />
          )}
        />
        <FormControl>
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
            color="highlight"
            size="large"
            sx={{
              marginTop: '2px',
              boxShadow: 'none',
              color: Gray[1],
              fontSize: '1.125rem',
              justifyContent: 'space-between',
              height: 60,
              pr: 5,
            }}
            fullWidth
            endIcon={<ArrowRightIcon />}
          >
            Next
          </LoadingButton>
        </FormControl>
      </Stack>
    </form>
  );
};

export default BasicUserInfoForm;
