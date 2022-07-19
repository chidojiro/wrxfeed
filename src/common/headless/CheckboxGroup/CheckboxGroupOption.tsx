import React, { ChangeEvent } from 'react';
import { useCheckboxGroupContext } from './CheckboxGroupProvider';

export type CheckboxGroupOptionRenderPropState = {
  value: string;
  isChecked: boolean;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  error: boolean;
};

export type CheckboxGroupOptionProps = {
  value: string;
  shouldChange?: (
    e: ChangeEvent<HTMLInputElement>,
    checkboxGroupValue: string[],
  ) => boolean | Promise<boolean>;
  children?: (state: CheckboxGroupOptionRenderPropState) => React.ReactNode;
};

export const CheckboxGroupOption = ({
  value,
  shouldChange: shouldChangeProp,
  children,
}: CheckboxGroupOptionProps) => {
  const groupProviderValue = useCheckboxGroupContext();

  const isChecked = groupProviderValue.value.includes(value);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const isChecked = e.target.checked;
    const value = e.target.value;

    const shouldChange = (await shouldChangeProp?.(e, groupProviderValue.value)) ?? true;

    if (shouldChange) {
      groupProviderValue?.handleChange(value, isChecked);
    }
  };

  return (
    <>
      {children?.({ value, isChecked, handleChange, error: !!groupProviderValue.groupProps.error })}
    </>
  );
};
