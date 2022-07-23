import React, { MouseEventHandler } from 'react';
import { Department } from '@/main/entity';
import { getColorByText } from '@/main/utils';
import { ToggleFollowButton } from '@/common/components';

interface DirectoryItem {
  item: Department;
  isFollowing?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onFollow?: MouseEventHandler<HTMLButtonElement>;
  onUnfollow?: MouseEventHandler<HTMLButtonElement>;
}

const RootDepartmentHeader: React.FC<DirectoryItem> = ({
  item,
  isFollowing,
  onClick,
  onFollow,
  onUnfollow,
}) => {
  const deptBgColor = React.useMemo(() => getColorByText(item?.name ?? '', item.id, true), [item]);

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
      style={{
        background: deptBgColor,
      }}
      className="flex justify-between items-center px-4 py-4 sm:px-6 cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-sm text-white uppercase font-semibold">{item.name || 'Unknown'}</h3>
      <ToggleFollowButton
        following={!!isFollowing}
        onFollow={handleFollow}
        onUnFollow={handleUnfollow}
        colorScheme="white"
      />
    </div>
  );
};

export default RootDepartmentHeader;
