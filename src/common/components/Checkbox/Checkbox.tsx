import { MinusIcon, TickIcon } from '@/assets';
import { useDisclosure } from '@/common/hooks';
import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';

export type CheckboxProps = JSX.IntrinsicElements['input'] & {
  label?: React.ReactNode;
  partial?: boolean;
};

export const Checkbox = ({
  className,
  label,
  onChange,
  partial,
  checked,
  ...restProps
}: CheckboxProps) => {
  const checkedDisclosure = useDisclosure();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e);
    checkedDisclosure.set(e.target.checked);
  };

  const isChecked = checked ?? checkedDisclosure.isOpen;

  const renderInnerIcon = () => {
    if (isChecked) {
      return <TickIcon />;
    }

    if (partial) {
      return <MinusIcon />;
    }
  };

  return (
    <label
      className={clsx(
        StringUtils.withProjectClassNamePrefix('checkbox'),
        'flex items-center gap-3 cursor-pointer',
        className,
      )}
    >
      <div className="w-4 h-4 flex-shrink-0 rounded-sm bg-Gray-12 border border-solid border-Gray-6 text-Gray-6 flex items-center justify-center">
        {renderInnerIcon()}
      </div>
      {!!label && <span className="text-sm">{label}</span>}
      <input
        type="checkbox"
        {...restProps}
        className="minimized"
        onChange={handleChange}
        checked={isChecked}
      />
    </label>
  );
};
