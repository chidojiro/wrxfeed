import React, { useRef, useState, useEffect } from 'react';
import BlankLayout from '@common/templates/BlankLayout';
import BasicUserInfoForm from '@auth/organisms/BasicUserInfoForm';
import UserRoleForm from '@auth/organisms/UserRoleForm';
import { ProfileFormModel } from '@auth/types';
import OnboardTemplate from '@auth/templates/OnboardTemplate';
import { useApi } from '@api';
import { useIdentity, useSetIdentity } from '@identity/hooks';
import { useNavUtils } from '@common/hooks';
import Routes from '@src/routes';
import { useErrorHandler } from '@error/hooks';

enum InputStep {
  BasicInfo,
  Role,
}

const OnboardPage: React.VFC = () => {
  const { updateProfile } = useApi();
  const setIdentity = useSetIdentity();
  const identity = useIdentity();
  const { redirect } = useNavUtils();
  const errorHandler = useErrorHandler();
  const [step, setStep] = useState(InputStep.BasicInfo);
  const formDataRef = useRef<ProfileFormModel>();

  useEffect(() => {
    if (identity?.token && identity?.lastLoginAt) {
      redirect(Routes.Overview.path as string);
    }
  }, [redirect, identity]);

  const handleSubmitBasicInfo = (data: ProfileFormModel) => {
    setStep(step + 1);
    formDataRef.current = { ...formDataRef.current, ...data };
  };

  const handleSubmitRole = async (data: ProfileFormModel) => {
    formDataRef.current = { ...formDataRef.current, ...data };
    const lastLoginAt = new Date().toISOString();
    const updates = {
      ...formDataRef.current,
      lastLoginAt,
    };
    try {
      const profile = await updateProfile(updates);
      if (identity) {
        setIdentity({
          ...identity,
          ...profile,
          lastLoginAt,
        });
      }
      redirect(Routes.Overview.path as string);
    } catch (error: unknown) {
      await errorHandler(error);
    }
  };

  return (
    <BlankLayout className="flex bg-LightBG">
      <OnboardTemplate
        title="Tell us a bit about yourself."
        description="Let’s start by getting your name and company info"
        formComponent={<BasicUserInfoForm className="mb-10" onSubmit={handleSubmitBasicInfo} />}
        visible={step === InputStep.BasicInfo}
      />
      <OnboardTemplate
        title="Let’s get some highlights."
        description="What’s your role at the company?"
        formComponent={<UserRoleForm className="mb-10" onSubmit={handleSubmitRole} />}
        visible={step === InputStep.Role}
      />
    </BlankLayout>
  );
};

export default OnboardPage;
