import { ReactUtils } from '../../utils';
import { CheckboxGroupProps } from './types';

export type ChangeHandler = (value: string, isChecked: boolean) => void;

export type CheckboxGroupProviderValue = {
  value: string[];
  handleChange: ChangeHandler;
  groupProps: CheckboxGroupProps;
};

const [CheckboxGroupProvider, useCheckboxGroupContext] =
  ReactUtils.createContext<CheckboxGroupProviderValue>();

export { CheckboxGroupProvider, useCheckboxGroupContext };
