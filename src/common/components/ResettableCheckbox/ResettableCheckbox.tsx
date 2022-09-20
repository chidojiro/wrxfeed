import { AntiClockwiseIcon } from '@/assets';
import { Checkbox, CheckboxProps } from '@/common/components';
import { useDisclosure } from '@/common/hooks';
import React from 'react';

export type ResettableCheckboxProps = CheckboxProps & {
  resettable?: boolean;
  onReset?: () => void;
};

export const ResettableCheckbox = React.memo(
  ({ resettable, onChange, label, checked, value, ...restProps }: ResettableCheckboxProps) => {
    const checkedDisclosure = useDisclosure();
    const isChecked = checked ?? checkedDisclosure.isOpen;

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      onChange?.(e);
      checkedDisclosure.set(e.target.checked);
    };

    return (
      <Checkbox
        {...restProps}
        checked={isChecked}
        onChange={handleChange}
        colorScheme={resettable ? 'accent' : undefined}
        value={value}
        label={
          <div className="">
            {label}
            {resettable && <AntiClockwiseIcon className="inline ml-2 text-Gray-2" />}
          </div>
        }
      />
    );
  },
);

ResettableCheckbox.displayName = 'ResettableCheckbox';
