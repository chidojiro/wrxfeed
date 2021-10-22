import React, {
  ChangeEventHandler,
  DetailedHTMLProps,
  FocusEventHandler,
  InputHTMLAttributes,
  useState,
} from 'react';
import { classNames } from '@main/utils';

interface FormInputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  error?: boolean;
}

const FormInput: React.ForwardRefRenderFunction<HTMLInputElement, FormInputProps> = (
  { className, error, onChange, onFocus, onBlur, ...rest },
  ref,
) => {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setFilled(!!event.target?.value);
    if (onChange) {
      onChange(event);
    }
  };

  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    setFocused(true);
    if (onFocus) {
      onFocus(event);
    }
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    setFocused(false);
    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <input
      ref={ref}
      className={classNames(
        focused || filled ? 'bg-white' : 'bg-transparent',
        'flex flex-1 py-[11px] px-6',
        className ?? '',
      )}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleOnChange}
      aria-invalid={error}
      {...rest}
    />
  );
};

export default React.forwardRef(FormInput);
