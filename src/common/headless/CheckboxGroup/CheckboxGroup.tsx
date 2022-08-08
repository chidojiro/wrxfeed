import React from 'react';
import { useControllable } from '../../hooks';
import { ChangeHandler, CheckboxGroupProvider } from './CheckboxGroupProvider';
import { CheckboxGroupProps } from './types';

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { onChange: onChangeProp, defaultValue = [], value: valueProp, children } = props;

  const [value, setValue] = useControllable({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  });

  const handleChange: ChangeHandler = React.useCallback(
    (targetValue, isChecked) => {
      let newValue;
      if (isChecked) {
        newValue = [...value, targetValue];
      } else {
        newValue = value.filter((value: any) => value !== targetValue);
      }

      setValue({ internal: newValue, external: newValue });
    },
    [setValue, value],
  );

  const providerValue = React.useMemo(
    () => ({ handleChange, value, groupProps: props }),
    [props, handleChange, value],
  );

  return <CheckboxGroupProvider value={providerValue}>{children}</CheckboxGroupProvider>;
};
