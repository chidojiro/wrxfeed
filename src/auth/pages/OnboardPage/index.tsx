import React, { useRef, useState } from 'react';
import BlankLayout from '@common/templates/BlankLayout';
import BasicUserInfoForm from '@auth/organisms/BasicUserInfoForm';
import { LightBG } from '@theme/colors';
import UserRoleForm from '@auth/organisms/UserRoleForm';
import { OnboardFormModel } from '@auth/types';
import OnboardTemplate from '@auth/templates/OnboardTemplate';

enum InputStep {
  BasicInfo,
  Role,
}

const OnboardPage: React.VFC = () => {
  const [step, setStep] = useState(InputStep.BasicInfo);
  const formDataRef = useRef<OnboardFormModel>();

  const handleSubmitBasicInfo = (data: OnboardFormModel) => {
    setStep(step + 1);
    formDataRef.current = { ...formDataRef.current, ...data };
  };

  const handleSubmitRole = (data: OnboardFormModel) => {
    formDataRef.current = { ...formDataRef.current, ...data };
    console.log(formDataRef.current);
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
