import { useDisclosure } from '@/common/hooks';
import { StringUtils } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';

export type RadioProps = Omit<JSX.IntrinsicElements['input'], 'value'> & {
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

export const Radio = ({
  className,
  label,
  onChange,
  checked,
  colorScheme,
  disabled,
  ...restProps
}: RadioProps) => {
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
      return <div className="w-2 h-2 rounded-full bg-Gray-3"></div>;
    }

    return null;
  };

  return (
    <label
      className={clsx(
        StringUtils.withProjectClassNamePrefix('Radio'),
        'flex items-center gap-3 cursor-pointer',
        textColor,
        className,
      )}
    >
      <div
        className={clsx(
          'w-4 h-4 flex-shrink-0 rounded-full border border-soli flex items-center justify-center',
          borderColor,
          { disabled },
        )}
      >
        {renderInnerIcon()}
      </div>
      {!!label && <div className="text-sm">{label}</div>}
      <input
        type="radio"
        {...restProps}
        className="minimized"
        onChange={handleChange}
        checked={isChecked}
        disabled={disabled}
      />
    </label>
  );
};
