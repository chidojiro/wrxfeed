import { ReactUtils } from '../../utils';
import { RadioGroupProps } from './types';

export type RadioGroupProviderValue = {
  value?: string;
  handleChange: (value: string) => void;
  groupProps: RadioGroupProps;
};

const [RadioGroupProvider, useRadioGroupContext] =
  ReactUtils.createContext<RadioGroupProviderValue>();

export { RadioGroupProvider, useRadioGroupContext };
