import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ProfileFormModel } from '@/auth/types';
import LoadingButton from '@/common/atoms/LoadingButton';
import FormInput from '@/auth/atoms/FormInput';
import { ReactComponent as ArrowRightIcon } from '@/assets/icons/outline/arrow-right.svg';
import { classNames } from '@/common/utils';

const schema = yup.object({
  firstName: yup.string().required('This field is required'),
  lastName: yup.string().required('This field is required'),
  companyName: yup.string().required('This field is required'),
});

export interface BasicUserInfoFormProps {
  onSubmit: SubmitHandler<ProfileFormModel>;
  className?: string;
}

const BasicUserInfoForm: React.VFC<BasicUserInfoFormProps> = ({ className, onSubmit }) => {
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
      <div className={classNames('w-[433px] space-y-5', className ?? '')}>
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
        <LoadingButton
          loading={isSubmitting}
          type="submit"
          className="justify-between w-full h-[56px] px-8 mt-5 text-base font-semibold"
        >
          Next
          <ArrowRightIcon className="stroke-current path-no-stroke text-white" />
        </LoadingButton>
      </div>
    </form>
  );
};

export default BasicUserInfoForm;
