import React, { ChangeEvent } from 'react';
import { useRadioGroupContext } from './RadioGroupProvider';

export type CheckboxGroupOptionRenderPropState = {
  value: string;
  isChecked: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

export type RadioGroupOptionProps = {
  value: string;
  shouldChange?: (
    e: ChangeEvent<HTMLInputElement>,
    checkboxGroupValue?: string,
  ) => boolean | Promise<boolean>;
  children?: (state: CheckboxGroupOptionRenderPropState) => React.ReactNode;
};

export const RadioGroupOption = ({
  value,
  shouldChange: shouldChangeProp,
  children,
}: RadioGroupOptionProps) => {
  const groupProviderValue = useRadioGroupContext();

  const isChecked = groupProviderValue.value === value;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const value = e.target.value;

    const shouldChange = (await shouldChangeProp?.(e, groupProviderValue.value)) ?? true;

    if (shouldChange) {
      groupProviderValue?.handleChange(value);
    }
  };

  return <>{children?.({ value, isChecked, handleChange })}</>;
};
