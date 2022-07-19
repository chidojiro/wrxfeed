import React from 'react';
import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import { ClassName } from '@/common/types';
import { BinIcon, EditIcon, EyeIcon, MoreVerticalIcon } from '@/assets';
import PopoverMenu from '@/main/atoms/PopoverMenu';
import PopoverMenuItem from '@/main/atoms/PopoverMenuItem';

type OptionsButtonProps = ClassName & {
  onViewClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  menuIconClass?: ClassName;
};

export const OptionsButton = ({
  className,
  onViewClick,
  onEditClick,
  onDeleteClick,
  menuIconClass,
}: OptionsButtonProps) => {
  return (
    <Menu as="div" className={clsx('relative inline-block z-10 text-left', className)}>
      <div>
        <Menu.Button
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => event.stopPropagation()}
          className="-m-2 p-2 rounded-full flex datas-center text-gray-400 hover:text-gray-600"
        >
          <span className="sr-only">Open options</span>
          <MoreVerticalIcon
            className={clsx('fill-current text-Gray-3 path-no-filled', menuIconClass?.className)}
            aria-hidden="true"
            viewBox="0 0 15 15"
          />
        </Menu.Button>
      </div>
      <PopoverMenu>
        {!!onViewClick && (
          <PopoverMenuItem
            key="View-Details"
            value="view-details"
            label="View Details"
            onClick={onViewClick}
            stopPropagation
            Icon={EyeIcon}
            className="text-Gray-3"
          />
        )}
        {!!onEditClick && (
          <PopoverMenuItem
            key="Edit-Target"
            value="edit-target"
            label="Edit Target"
            onClick={onEditClick}
            stopPropagation
            Icon={EditIcon}
            className="text-Gray-3"
          />
        )}
        {!!onDeleteClick && (
          <PopoverMenuItem
            key="Delete-Target"
            value="delete-target"
            label="Delete Target"
            onClick={onDeleteClick}
            stopPropagation
            Icon={BinIcon}
            className="text-system-alert"
          />
        )}
      </PopoverMenu>
    </Menu>
  );
};
