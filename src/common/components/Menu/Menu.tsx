import { MoreVerticalIcon } from '@/assets';
import { useDisclosure } from '@/common/hooks';
import { Children } from '@/common/types';
import clsx from 'clsx';
import React from 'react';
import { Button } from '../Button';
import { Popover, PopoverPlacement } from '../Popover';
import { MenuProvider, useMenuContext } from './MenuProvider';

export type MenuProps = Children &
  JSX.IntrinsicElements['button'] & {
    placement?: PopoverPlacement;
    onClose?: () => void;
  };

export const Menu = ({
  children,
  placement,
  ref: _,
  className,
  onClose,
  ...restProps
}: MenuProps) => {
  const disclosure = useDisclosure();
  const providerValue = React.useMemo(() => ({ disclosure }), [disclosure]);

  return (
    <Popover
      open={disclosure.isOpen}
      onClose={() => {
        disclosure.close();
        onClose?.();
      }}
      placement={placement}
      trigger={
        <Button onClick={disclosure.toggle} className={clsx('rounded', className)} {...restProps}>
          <MoreVerticalIcon />
        </Button>
      }
    >
      <MenuProvider value={providerValue}>{children}</MenuProvider>
    </Popover>
  );
};

export type MenuItemProps = JSX.IntrinsicElements['button'] & {
  leftIcon?: React.ReactNode;
  closeOnClick?: boolean;
};

const MenuItem = ({
  className,
  children,
  ref: _,
  leftIcon,
  closeOnClick = true,
  onClick,
  ...restProps
}: MenuItemProps) => {
  const { disclosure } = useMenuContext();

  return (
    <Button
      {...restProps}
      onClick={(e) => {
        onClick?.(e);
        if (closeOnClick) {
          disclosure.close();
        }
      }}
      className={clsx(
        'w-full',
        'flex items-center gap-2',
        'py-3 px-4',
        'shadow-card',
        'bg-white',
        'text-xs',
        className,
      )}
    >
      <div className="text-Gray-2">{leftIcon}</div>
      {children}
    </Button>
  );
};

Menu.Item = MenuItem;
