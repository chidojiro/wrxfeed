import clsx from 'clsx';
import React from 'react';
import { Children, ClassName, HTMLButtonProps } from '../../types';
import { Spinner } from '../Spinner';

type Variant = 'outline' | 'solid' | 'ghost' | 'text';
type ColorScheme = 'primary' | 'danger' | 'white' | 'purple' | 'gray';
type Size = 'sm' | 'md' | 'lg';

type ClassNameByVariant = Partial<Record<Variant, string>>;

const primaryBackgroundClassNames: ClassNameByVariant = {
  solid: 'bg-primary',
};
const dangerBackgroundClassNames: ClassNameByVariant = {
  solid: 'bg-system-alert',
};
const whiteBackgroundClassNames: ClassNameByVariant = {
  solid: 'bg-white',
};
const purpleBackgroundClassNames: ClassNameByVariant = {
  ghost: 'hover:bg-purple-8',
  outline: 'hover:bg-purple-8',
  solid: 'bg-purple-6 hover:bg-purple-5',
};
const grayBackgroundClassNames: ClassNameByVariant = {
  ghost: 'hover:bg-Gray-12',
  outline: 'hover:bg-Gray-12',
  solid: 'bg-Gray-6',
};
const backgroundClassNames: Record<ColorScheme, ClassNameByVariant> = {
  primary: primaryBackgroundClassNames,
  danger: dangerBackgroundClassNames,
  white: whiteBackgroundClassNames,
  purple: purpleBackgroundClassNames,
  gray: grayBackgroundClassNames,
};

const primaryBorderColorClassNames: ClassNameByVariant = {
  outline: 'border-primary',
};
const dangerBorderColorClassNames: ClassNameByVariant = {
  outline: 'border-system-alert',
};
const whiteBorderColorClassNames: ClassNameByVariant = {
  outline: 'border-white',
};
const purpleBorderColorClassNames: ClassNameByVariant = {
  outline: 'border-purple-6',
};
const grayBorderColorClassNames: ClassNameByVariant = {
  outline: 'border-Gray-11',
};
const borderColorClassNames: Record<ColorScheme, ClassNameByVariant> = {
  danger: dangerBorderColorClassNames,
  primary: primaryBorderColorClassNames,
  white: whiteBorderColorClassNames,
  purple: purpleBorderColorClassNames,
  gray: grayBorderColorClassNames,
};

const primaryTextColorClassNames: ClassNameByVariant = {
  ghost: 'text-primary',
  outline: 'text-primary',
  solid: 'text-white',
  text: 'text-primary',
};
const dangerTextColorClassNames: ClassNameByVariant = {
  ghost: 'text-system-alert',
  outline: 'text-system-alert',
  solid: 'text-white',
  text: 'text-system-alert',
};
const whiteTextColorClassNames: ClassNameByVariant = {
  outline: 'text-white',
  solid: 'text-white',
  text: 'text-white',
};
const purpleTextColorClassNames: ClassNameByVariant = {
  ghost: 'text-purple-6',
  outline: 'text-purple-6',
  solid: 'text-white',
  text: 'text-purple-6',
};
const grayTextColorClassNames: ClassNameByVariant = {
  ghost: 'text-Gray-6',
  outline: 'text-Gray-6',
  solid: 'text-white',
  text: 'text-Gray-6',
};
const textColorClassNames: Record<ColorScheme, ClassNameByVariant> = {
  danger: dangerTextColorClassNames,
  primary: primaryTextColorClassNames,
  white: whiteTextColorClassNames,
  purple: purpleTextColorClassNames,
  gray: grayTextColorClassNames,
};

const paddingClassNames: Record<Size, string> = {
  sm: 'px-2',
  md: 'px-4',
  lg: 'px-4',
};

const heightClassNames: Record<Size, string> = { sm: 'h-7', md: 'h-8', lg: 'h-9' };

export type ButtonProps = Children &
  ClassName &
  HTMLButtonProps & {
    variant?: Variant;
    colorScheme?: ColorScheme;
    size?: Size;
    pill?: boolean;
    square?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    loading?: boolean;
    style?: React.CSSProperties;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      colorScheme = 'primary',
      className,
      children,
      type = 'button',
      disabled,
      iconLeft,
      iconRight,
      loading,
      size = 'md',
      pill,
      square,
      ...restProps
    },
    ref,
  ) => {
    if (!variant)
      return (
        <button {...restProps} type={type} ref={ref} className={className} disabled={disabled}>
          {children}
        </button>
      );

    const backgroundColorClassName = backgroundClassNames[colorScheme][variant];
    const borderColorClassName =
      borderColorClassNames[colorScheme][variant] ?? 'border-transparent';
    const textColorClassName = textColorClassNames[colorScheme][variant];
    const paddingClassName = !square && paddingClassNames[size];
    const heightClassName = heightClassNames[size];
    const borderRadiusClassName = pill ? 'rounded-full' : 'rounded-sm';
    const fontWeightClassName = 'font-medium';

    const renderIconLeft = () => {
      const iconClassName = clsx(
        '!w-4 !h-4 flex items-center justify-center',
        size === 'sm' ? 'mr-1' : 'mr-2',
      );

      if (loading && iconLeft) return <Spinner className={iconClassName} />;

      if (iconLeft) return <span className={iconClassName}>{iconLeft}</span>;

      return null;
    };

    const renderIconRight = () => {
      const iconClassName = clsx(
        '!w-4 !h-4 flex items-center justify-center',
        size === 'sm' ? 'ml-1' : 'ml-2',
      );

      const hasNoIcons = !iconLeft && !iconRight;

      if (loading && (iconRight || hasNoIcons)) return <Spinner className={iconClassName} />;

      if (iconRight) return <span className={iconClassName}>{iconRight}</span>;

      return null;
    };

    return (
      <button
        {...restProps}
        disabled={disabled || loading}
        ref={ref}
        type={type}
        className={clsx(
          'inline-flex justify-center items-center border select-none transition-all text-xs leading-5 max-h-full',
          paddingClassName,
          textColorClassName,
          backgroundColorClassName,
          borderColorClassName,
          fontWeightClassName,
          borderRadiusClassName,
          heightClassName,
          {
            disabled,
            'aspect-square': square,
          },
          className,
        )}
      >
        <div className="flex items-center justify-center">
          {renderIconLeft()}
          {children}
          {renderIconRight()}
        </div>
      </button>
    );
  },
);

Button.displayName = 'Button';
