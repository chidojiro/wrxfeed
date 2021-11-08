import { classNames } from '@common/utils';
import React, { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps } from 'react';

interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  className?: string;
  style?: CSSProperties;
  type?: 'submit' | 'reset' | 'button';
}

/**
 * Buttons container
 */
const Button: React.FC<ButtonProps> = ({ children, className, style, type, ...rest }) => {
  return (
    <button
      style={style}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={classNames(
        'flex justify-center items-center border border-Gray-11 py-2 px-4 space-x-2 text-xs font-medium text-Gray-1',
        className ?? '',
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: '',
  style: undefined,
  type: 'button',
};

export default Button;
