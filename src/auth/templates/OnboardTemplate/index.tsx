import React, { Fragment, ReactNode } from 'react';
import { Transition } from '@headlessui/react';

interface OnboardTemplateProps {
  title: string;
  description: string;
  formComponent: ReactNode;
  visible: boolean;
}

const OnboardTemplate: React.VFC<OnboardTemplateProps> = ({
  title,
  description,
  formComponent,
  visible,
}) => {
  return (
    <Transition
      as={Fragment}
      show={visible}
      enter="transition-opacity ease-in-out duration-250"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-in-out duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="absolute inset-0 flex flex-col justify-center items-center mb-[5px] space-y-10">
        <p className="text-5xl font-bold text-center mb-[5px] text-Gray-1">{title}</p>
        <p className="text-lg font-semibold text-center text-Gray-1">{description}</p>
        {formComponent}
      </div>
    </Transition>
  );
};

export default OnboardTemplate;
