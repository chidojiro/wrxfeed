import { useControllable } from '@/common/hooks';
import { HTMLInputProps } from '@/common/types';
import { AssertUtils, NumberUtils } from '@/common/utils';
import clsx from 'clsx';
import React from 'react';

type BaseInputProps = HTMLInputProps & {
  variant?: 'underline';
};

const BaseInput = React.forwardRef(
  ({ type = 'text', variant, className, ...restProps }: BaseInputProps, ref: any) => {
    return (
      <input
        {...restProps}
        ref={ref}
        type={type}
        className={clsx(
          'outline-none',
          'w-full h-9 px-2.5',
          'text-primary text-sm placeholder-Gray-6',
          {
            'bg-Gray-12': !variant,
            'border-b border-Gray-11 focus:bg-Gray-12 focus:border-transparent':
              variant === 'underline',
          },
          className,
        )}
      />
    );
  },
);

BaseInput.displayName = 'BaseInput';

export type InputProps = Omit<BaseInputProps, 'min' | 'max'> & {
  includeNumberSeparator?: boolean;
  min?: number;
  max?: number;
  allowNegative?: boolean;
};

const numberPatterns = [/^-?\d*$/, /^-?\d+(\.(\d)*)?$/];

const isValidNumber = (num: string) =>
  numberPatterns.some((pattern) => pattern.test(num.toString()));

export const Input = React.forwardRef(
  (
    {
      type,
      value: valueProp,
      onChange,
      defaultValue,
      min,
      max,
      allowNegative = true,
      includeNumberSeparator = true,
      ...restProps
    }: InputProps,
    ref: any,
  ) => {
    const [value, setValue] = useControllable({
      value: valueProp,
      onChange,
      defaultValue: defaultValue ?? '',
    });

    const resolveValidNumberValue = (value: string) => {
      if (!isValidNumber(value)) {
        throw new Error();
      }

      if (!allowNegative && value.includes('-')) {
        throw new Error();
      }

      const zerosTrimmedEvenValue = NumberUtils.trimZeroes(value);

      if (!AssertUtils.isNullOrUndefined(min) && +zerosTrimmedEvenValue < min) {
        return min?.toString() ?? '';
      }

      if (!AssertUtils.isNullOrUndefined(max) && +zerosTrimmedEvenValue > max) {
        return max?.toString() ?? '';
      }

      return zerosTrimmedEvenValue as string;
    };

    if (type === 'number') {
      if (includeNumberSeparator) {
        const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
          try {
            const targetValueWithoutSeparator = e.target.value.replace(/,/g, '');
            const validNumberValue = resolveValidNumberValue(targetValueWithoutSeparator);
            setValue(validNumberValue);
          } catch {
            return;
          }
        };

        const [whole, decimal] = value.split('.');
        const valueWithSeparator = [whole && (+whole).toLocaleString(), decimal]
          .filter((num) => !AssertUtils.isNullOrUndefined(num))
          .join('.');

        return (
          <BaseInput
            {...restProps}
            type="text"
            ref={ref}
            value={valueWithSeparator}
            onChange={handleChange}
          />
        );
      }

      const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        try {
          const validNumberValue = resolveValidNumberValue(e.target.value);
          e.target.value = validNumberValue;
          setValue(e);
        } catch {
          return;
        }
      };

      return (
        <BaseInput {...restProps} type="text" ref={ref} value={value} onChange={handleChange} />
      );
    }

    return <BaseInput {...restProps} ref={ref} type={type} value={value} onChange={setValue} />;
  },
);

Input.displayName = 'Input';
