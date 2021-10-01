import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ProfileFormModel } from '@auth/types';
import LoadingButton from '@common/atoms/LoadingButton';
import FormInput from '@auth/atoms/FormInput';
import { MenuItem, Select, Stack } from '@mui/material';
import { Gray } from '@theme/colors';
import { ReactComponent as ArrowRightIcon } from '@assets/icons/outline/arrow-right.svg';
import { SxProps } from '@mui/system';
import { Departments } from '@common/constants';
import { ReactComponent as ChevronDown } from '@assets/icons/outline/down-small.svg';

const schema = yup.object({
  title: yup.string().required('This field is required'),
  department: yup.string().required('This field is required'),
  bio: yup.string(),
});

export interface UserRoleFormProps {
  onSubmit: SubmitHandler<ProfileFormModel>;
  sx: SxProps;
}

const DownIcon: React.FC<React.SVGAttributes<SVGElement>> = (props) => (
  <ChevronDown viewBox="2 2 10 10" {...props} />
);

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
              error={!!errors.firstName}
              {...field}
            />
          )}
        />
        <Controller
          name="department"
          control={control}
          render={({ field }) => (
            <Select
              displayEmpty
              inputProps={{ 'aria-label': 'Department', placeholder: 'Department' }}
              IconComponent={DownIcon}
              {...field}
            >
              <MenuItem key={0} value="">
                Department
              </MenuItem>
              {Object.values(Departments).map((dept) => (
                <MenuItem key={dept} value={dept}>
                  {dept}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <FormInput placeholder="About you" type="text" error={!!errors.lastName} {...field} />
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
