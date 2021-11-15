import React, { MouseEventHandler, VFC } from 'react';
import Button from '@common/atoms/Button';
import { Category, Department, Vendor } from '@main/entity';
// Icons
import { ReactComponent as AddIcon } from '@assets/icons/solid/add-small.svg';
import { ReactComponent as TickIcon } from '@assets/icons/solid/tick-small.svg';

interface DirectoryItem {
  item: Department | Category | Vendor;
  disableFollow?: boolean;
  isFollowing?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onFollow?: MouseEventHandler<HTMLButtonElement>;
  onUnfollow?: MouseEventHandler<HTMLButtonElement>;
}

const DirectoryItem: VFC<DirectoryItem> = ({
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
      className="flex justify-between items-center cursor-pointer min-h-[2rem] w-full"
      onClick={onClick}
    >
      <p className="ml-3 text-sm font-medium text-Gray-1">{item.name}</p>
      {!disableFollow &&
        (isFollowing ? (
          <Button onClick={handleUnfollow}>
            <TickIcon
              width={16}
              height={16}
              className="stroke-current path-no-stroke text-Gray-1"
              viewBox="0 0 15 15"
            />
            <span>Following</span>
          </Button>
        ) : (
          <Button onClick={handleFollow}>
            <AddIcon
              width={16}
              height={16}
              className="stroke-current path-no-stroke text-Gray-6"
              viewBox="0 0 15 15"
            />
            <span className="text-Gray-6">Follow</span>
          </Button>
        ))}
    </div>
  );
};

export default DirectoryItem;
