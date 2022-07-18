import { Children } from '../../types';

export type RadioGroupProps = Children & {
  onChange?: (value: string) => void;
  value?: string;
  defaultValue?: string;
  error?: boolean;
};
