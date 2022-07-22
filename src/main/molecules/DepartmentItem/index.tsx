import { ToggleFollowButton } from '@/common/components';
import { Category, Department } from '@/main/entity';
import { Vendor } from '@/vendor/types';
import React, { MouseEventHandler } from 'react';

interface DepartmentItemProps {
  item: Department | Category | Vendor;
  disableFollow?: boolean;
  isFollowing?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onFollow?: MouseEventHandler<HTMLButtonElement>;
  onUnfollow?: MouseEventHandler<HTMLButtonElement>;
  hideName?: boolean;
  inHeader?: boolean;
}

const DepartmentItem: React.FC<DepartmentItemProps> = ({
  item,
  isFollowing,
  disableFollow = false,
  onClick,
  onFollow,
  onUnfollow,
  hideName = false,
  inHeader,
}) => {
  const handleFollow: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (onFollow) {
      onFollow(event);
    }
  };

  const handleUnfollow: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    if (onUnfollow) {
      onUnfollow(event);
    }
  };

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
          colorScheme={inHeader ? 'white' : 'primary'}
          following={!!isFollowing}
          onFollow={handleFollow}
          onUnFollow={handleUnfollow}
        />
      )}
    </div>
  );
};

export default DepartmentItem;
