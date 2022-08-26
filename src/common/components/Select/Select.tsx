import { Option } from '@/common/types';
import { StringUtils } from '@/common/utils';
import clsx from 'clsx';

export type SelectProps = JSX.IntrinsicElements['select'] & {
  options: Option[];
};

export const Select = ({ className, options, ...restProps }: SelectProps) => {
  return (
    <select
      {...restProps}
      className={clsx(
        StringUtils.withProjectClassNamePrefix('select'),
        'outline-none text-xs',
        className,
      )}
    >
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
