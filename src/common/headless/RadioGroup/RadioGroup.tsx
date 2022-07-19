import React from 'react';
import { useControllable } from '../../hooks';
import { RadioGroupProvider } from './RadioGroupProvider';
import { RadioGroupProps } from './types';

export const RadioGroup = (props: RadioGroupProps) => {
  const { value: valueProp, onChange: onChangeProp, defaultValue, children } = props;

  const [value, setValue] = useControllable({
    value: valueProp?.toString(),
    onChange: onChangeProp,
    defaultValue,
  });

  const handleChange = React.useCallback(
    (value: string) => {
      let _value: string | boolean = value;
      if (value === 'true') _value = true;
      if (value === 'false') _value = false;

      setValue?.(_value);
    },
    [setValue],
  );

  const providerValue = React.useMemo(
    () => ({ handleChange, value, groupProps: props }),
    [handleChange, props, value],
  );

  return <RadioGroupProvider value={providerValue}>{children}</RadioGroupProvider>;
};
