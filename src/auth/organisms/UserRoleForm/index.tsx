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
  title: yup.string().required('This field is required'),
  department: yup.string().required('This field is required'),
  bio: yup.string(),
});

export interface UserRoleFormProps {
  onSubmit: SubmitHandler<ProfileFormModel>;
  sx: SxProps;
}

const UserRoleForm: React.VFC<UserRoleFormProps> = ({ sx, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ProfileFormModel>({
    defaultValues: {
      title: '',
      department: '',
      bio: '',
    },
    resolver: yupResolver<yup.AnyObjectSchema>(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={sx} width={433} spacing={2.25}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <FormInput
              placeholder="Title"
              type="title"
              required
              error={!!errors.title}
              {...field}
            />
          )}
        />
        <Controller
          name="department"
          control={control}
          render={({ field }) => (
            <FormInput
              placeholder="Department"
              type="text"
              error={!!errors.department}
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
            Get started
          </LoadingButton>
        </FormControl>
      </Stack>
    </form>
  );
};

export default UserRoleForm;
