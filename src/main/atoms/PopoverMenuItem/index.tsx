/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from '@common/utils';

interface PopoverMenuItemProps {
  value: string;
  label: string;
  labelClassName?: string;
  onClick?: () => void;
}

const PopoverMenuItem: React.VFC<PopoverMenuItemProps> = ({
  value,
  label,
  labelClassName,
  onClick,
  ...rest
}) => {
  return (
    <Menu.Item key={value} {...rest}>
      {({ active }) => (
        <a
          aria-hidden="true"
          className={classNames(
            active ? 'bg-purple-7 text-Gray-1' : 'text-Gray-1',
            'flex px-4 py-2 text-sm',
            labelClassName ?? '',
          )}
          onClick={onClick}
        >
          <span>{label}</span>
        </a>
      )}
    </Menu.Item>
  );
};

export default PopoverMenuItem;
