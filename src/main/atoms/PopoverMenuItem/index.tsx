/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FunctionComponent, SVGAttributes } from 'react';
import { Menu } from '@headlessui/react';
import clsx from 'clsx';

interface PopoverMenuItemProps {
  value: string;
  label: string;
  className?: string;
  onClick?: () => void;
  stopPropagation?: boolean;
  preventDefault?: boolean;
  Icon?: FunctionComponent<SVGAttributes<SVGElement>> | null;
  iconClass?: string;
}

const PopoverMenuItem: React.FC<PopoverMenuItemProps> = ({
  value,
  label,
  className = '',
  onClick,
  stopPropagation,
  preventDefault,
  Icon,
  iconClass = '',
  ...rest
}) => {
  const onClickItem = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (stopPropagation) {
      event.stopPropagation();
    }
    if (preventDefault) {
      event.preventDefault();
    }
    if (onClick) onClick();
  };
  return (
    <Menu.Item key={value} {...rest}>
      {({ active }) => (
        <a
          aria-hidden="true"
          className={clsx(
            'flex flex-row items-center space-x-2 px-4 py-2 text-sm cursor-pointer text-Gray-1',
            active ? 'bg-purple-7' : '',
            className,
          )}
          onClick={onClickItem}
        >
          {Icon && (
            <Icon
              className={clsx('w-4 h-4 fill-current path-no-filled', iconClass)}
              aria-hidden="false"
              viewBox="0 0 16 16"
            />
          )}
          <span>{label}</span>
        </a>
      )}
    </Menu.Item>
  );
};

export default PopoverMenuItem;
