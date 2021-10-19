import React, { useRef, useState, useEffect } from 'react';
import BlankLayout from '@common/templates/BlankLayout';
import BasicUserInfoForm from '@auth/organisms/BasicUserInfoForm';
import { LightBG } from '@theme/colors';
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
      redirect(Routes.Overview.path);
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
      redirect(Routes.Overview.path);
    } catch (error: unknown) {
      await errorHandler(error);
    }
  };

  return (
    <BlankLayout sx={{ backgroundColor: LightBG, display: 'flex' }}>
      <OnboardTemplate
        title="Tell us a bit about yourself."
        description="Let’s start by getting your name and company info"
        formComponent={<BasicUserInfoForm sx={{ mb: 5 }} onSubmit={handleSubmitBasicInfo} />}
        visible={step === InputStep.BasicInfo}
      />
      <OnboardTemplate
        title="Let’s get some highlights."
        description="What’s your role at the company?"
        formComponent={<UserRoleForm sx={{ mb: 5 }} onSubmit={handleSubmitRole} />}
        visible={step === InputStep.Role}
      />
    </BlankLayout>
  );
};

export default OnboardPage;
