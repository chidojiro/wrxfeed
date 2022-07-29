import { Category, Department } from '@/main/entity';
import { ToggleFollowButton } from '@/subscription/ToggleFollowButton';
import { Vendor } from '@/vendor/types';
import React, { MouseEventHandler } from 'react';

interface DepartmentItemProps {
  item: Department | Category | Vendor;
  disableFollow?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  hideName?: boolean;
  inHeader?: boolean;
}

const DepartmentItem: React.FC<DepartmentItemProps> = ({
  item,
  disableFollow = false,
  onClick,
  hideName = false,
  inHeader,
}) => {
  return (
    <div
      aria-hidden="true"
      className="flex items-center space-x-2 cursor-pointer py-3 min-h-16 px-2 sm:px-6 w-full text-sm text-Gray-3"
      onClick={onClick}
    >
      <div className="flex flex-1">
        {!hideName && <p className="text-sm font-medium text-Gray-1">{item?.name}</p>}
      </div>
      {!disableFollow && (
        <ToggleFollowButton
          type="departments"
          item={item}
          colorScheme={inHeader ? 'white' : 'primary'}
        />
      )}
    </div>
  );
};

export default DepartmentItem;
