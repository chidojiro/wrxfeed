import { Children } from '../../types';

export type CheckboxGroupProps = Children & {
  onChange?: (value: string[]) => void;
  value?: string[];
  defaultValue?: string[];
  error?: boolean;
};
