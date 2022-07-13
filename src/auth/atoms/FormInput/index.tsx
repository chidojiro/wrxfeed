import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface FormInputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  error?: boolean;
}

const FormInput: React.ForwardRefRenderFunction<HTMLInputElement, FormInputProps> = (
  { className, error, ...rest },
  ref,
) => {
  return (
    <input
      ref={ref}
      className={clsx(
        'shadow-sm focus:outline-none focus:border-purple-4 focus:bg-white block w-full sm:text-sm border border-purple-7 bg-Gray-12 rounded-sm py-[11px] px-6',
        className ?? '',
      )}
      aria-invalid={error}
      {...rest}
    />
  );
};

export default React.forwardRef(FormInput);
