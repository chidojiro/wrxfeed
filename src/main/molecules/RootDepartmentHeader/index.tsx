import React, { MouseEventHandler, VFC } from 'react';
import Button from '@common/atoms/Button';
import { Department } from '@main/entity';
// Icons
import { ReactComponent as AddIcon } from '@assets/icons/solid/add-small.svg';
import { ReactComponent as TickIcon } from '@assets/icons/solid/tick-small.svg';
import { getColorByText } from '@main/utils';

interface DirectoryItem {
  item: Department;
  isFollowing?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onFollow?: MouseEventHandler<HTMLButtonElement>;
  onUnfollow?: MouseEventHandler<HTMLButtonElement>;
}

const RootDepartmentHeader: VFC<DirectoryItem> = ({
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
      className="flex justify-between items-center px-4 py-4 sm:pl-6 cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-sm text-white uppercase font-semibold">{item.name || 'Unknown'}</h3>
      {isFollowing ? (
        <Button onClick={handleUnfollow} className="rounded-full border-white">
          <TickIcon
            width={16}
            height={16}
            className="stroke-current path-no-stroke text-white"
            viewBox="0 0 15 15"
          />
          <span className="text-white">Following</span>
        </Button>
      ) : (
        <Button onClick={handleFollow} className="rounded-full border-white">
          <AddIcon
            width={16}
            height={16}
            className="stroke-current path-no-stroke text-white"
            viewBox="0 0 15 15"
          />
          <span className="text-white">Follow</span>
        </Button>
      )}
    </div>
  );
};

export default RootDepartmentHeader;
