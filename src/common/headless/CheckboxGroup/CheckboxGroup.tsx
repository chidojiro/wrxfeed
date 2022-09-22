import React from 'react';
import { useControllableState } from '../../hooks';
import {
  CheckboxGroupChangeHandler,
  CheckboxGroupProvider,
  CheckboxGroupProviderValue,
} from './CheckboxGroupProvider';

type Selection = 'none' | 'partial' | 'all';

type CheckboxGroupRenderPropState = {
  selection: 'none' | 'partial' | 'all';
  toggleSelectAll: () => void;
  toggleValue: (value: string) => void;
};

export type CheckboxGroupProps = {
  onSelectionChange?: (selection: Selection) => void;
  onChange?: (value: string[]) => void;
  value?: string[];
  defaultValue?: string[];
  error?: boolean;
  children?: React.ReactNode | ((state: CheckboxGroupRenderPropState) => void);
};

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const {
    onChange: onChangeProp,
    onSelectionChange,
    defaultValue = [],
    value: valueProp,
    children,
  } = props;

  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  });

  const [valueOptions, setValueOptions] = React.useState<string[]>([]);

  const registerValue = React.useCallback((value: string) => {
    setValueOptions((prev) => [...prev, value]);
  }, []);

  const unregisterValue = React.useCallback((toBeUnregisteredValue: string) => {
    setValueOptions((prev) => prev.filter((value) => value !== toBeUnregisteredValue));
  }, []);

  const getSelection = React.useCallback(
    (value: string[]): Selection => {
      if (value.length === valueOptions.length) return 'all';
      if (value.length > 0) return 'partial';
      return 'none';
    },
    [valueOptions.length],
  );

  const handleChange: CheckboxGroupChangeHandler = React.useCallback(
    (targetValue, isChecked) => {
      let newValue: string[];
      if (isChecked) {
        newValue = [...value, targetValue];
      } else {
        newValue = value.filter((value) => value !== targetValue);
      }

      onChangeProp?.(newValue);
      onSelectionChange?.(getSelection(newValue));
      setValue(newValue);
    },
    [getSelection, onChangeProp, onSelectionChange, setValue, value],
  );

  const providerValue = React.useMemo<CheckboxGroupProviderValue>(
    () => ({ handleChange, value, groupProps: props, registerValue, unregisterValue }),
    [handleChange, value, props, registerValue, unregisterValue],
  );

  const selection = getSelection(value);

  const toggleSelectAll = React.useCallback(() => {
    if (selection === 'none') {
      setValue(valueOptions);
    } else {
      setValue([]);
    }
  }, [selection, setValue, valueOptions]);

  const toggleValue = React.useCallback(
    (value: string) => {
      setValue((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
      );
    },
    [setValue],
  );

  return (
    <CheckboxGroupProvider value={providerValue}>
      {typeof children === 'function'
        ? children({ selection, toggleSelectAll, toggleValue })
        : children}
    </CheckboxGroupProvider>
  );
};
