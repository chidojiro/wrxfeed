import React, { MouseEventHandler } from 'react';
import Button from '@/common/atoms/Button';
import { Category, Department, Vendor } from '@/main/entity';
// Icons
import { ReactComponent as AddIcon } from '@/assets/icons/solid/add-small.svg';
import { ReactComponent as TickIcon } from '@/assets/icons/solid/tick-small.svg';

interface DepartmentItemProps {
  item: Department | Category | Vendor;
  disableFollow?: boolean;
  isFollowing?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onFollow?: MouseEventHandler<HTMLButtonElement>;
  onUnfollow?: MouseEventHandler<HTMLButtonElement>;
}

const DepartmentItem: React.VFC<DepartmentItemProps> = ({
  item,
  isFollowing,
  disableFollow = false,
  onClick,
  onFollow,
  onUnfollow,
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
        <p className="text-sm font-medium text-Gray-1">{item?.name}</p>
      </div>
      {!disableFollow &&
        (isFollowing ? (
          <Button onClick={handleUnfollow} className="rounded-full border-Gray-3">
            <TickIcon
              width={16}
              height={16}
              className="stroke-current path-no-stroke text-Gray-3"
              viewBox="0 0 15 15"
            />
            <span>Following</span>
          </Button>
        ) : (
          <Button onClick={handleFollow} className="rounded-full border-Gray-3">
            <AddIcon
              width={16}
              height={16}
              className="stroke-current stroke-1 path-no-stroke text-Gray-3"
              viewBox="0 0 15 15"
            />
            <span className="text-Gray-3">Follow</span>
          </Button>
        ))}
    </div>
  );
};

export default DepartmentItem;
