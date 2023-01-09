import { MinusIcon, TickIcon } from '@/assets';
import { useDisclosure } from '@/common/hooks';
import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';

export type CheckboxProps = Omit<JSX.IntrinsicElements['input'], 'value'> & {
  label?: React.ReactNode;
  partial?: boolean;
  colorScheme?: 'accent';
  value?: string;
};

const borderColors = {
  accent: 'border-Accent-2',
};

const textColors = {
  accent: 'text-Accent-2',
};

export const Checkbox = ({
  className,
  label,
  onChange,
  partial,
  checked,
  colorScheme,
  disabled,
  ...restProps
}: CheckboxProps) => {
  const checkedDisclosure = useDisclosure();
  const isChecked = checked ?? checkedDisclosure.isOpen;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange?.(e);
    checkedDisclosure.set(e.target.checked);
  };

  const borderColor = colorScheme ? borderColors[colorScheme] : 'border-Gray-6';
  const textColor = colorScheme ? textColors[colorScheme] : 'text-Gray-6';

  const renderInnerIcon = () => {
    if (isChecked) {
      return <TickIcon />;
    }

    if (partial) {
      return <MinusIcon />;
    }

    return null;
  };

  return (
    <label
      className={clsx(
        StringUtils.withProjectClassNamePrefix('checkbox'),
        'flex items-center gap-3 cursor-pointer',
        textColor,
        className,
      )}
    >
      <div
        className={clsx(
          'w-4 h-4 flex-shrink-0 rounded-sm bg-Gray-12 border border-soli flex items-center justify-center',
          borderColor,
          { disabled },
        )}
      >
        {renderInnerIcon()}
      </div>
      {!!label && <div className="text-sm">{label}</div>}
      <input
        type="checkbox"
        {...restProps}
        className="minimized"
        onChange={handleChange}
        checked={isChecked}
        disabled={disabled}
      />
    </label>
  );
};
