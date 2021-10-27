import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ProfileFormModel } from '@auth/types';
import LoadingButton from '@common/atoms/LoadingButton';
import FormInput from '@auth/atoms/FormInput';
import { ReactComponent as ArrowRightIcon } from '@assets/icons/outline/arrow-right.svg';
import { classNames } from '@common/utils';

const schema = yup.object({
  title: yup.string().required('This field is required'),
  department: yup.string().required('This field is required'),
  bio: yup.string(),
});

export interface UserRoleFormProps {
  onSubmit: SubmitHandler<ProfileFormModel>;
  className?: string;
}

const UserRoleForm: React.VFC<UserRoleFormProps> = ({ className, onSubmit }) => {
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
      <div className={classNames('w-[433px] space-y-5', className ?? '')}>
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
        <LoadingButton
          loading={isSubmitting}
          type="submit"
          className="justify-between w-full h-[56px] px-8 mt-5 text-base font-semibold"
        >
          Get started
          <ArrowRightIcon className="stroke-current path-no-stroke text-white" />
        </LoadingButton>
      </div>
    </form>
  );
};

export default UserRoleForm;
