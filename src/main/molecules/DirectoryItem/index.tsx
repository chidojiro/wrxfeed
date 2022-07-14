import React, { MouseEventHandler } from 'react';
import Button from '@/common/atoms/Button';
import { Category, Department, Vendor } from '@/main/entity';
// Icons
import { ReactComponent as AddIcon } from '@/assets/icons/solid/add-small.svg';
import { ReactComponent as TickIcon } from '@/assets/icons/solid/tick-small.svg';
import { getColorByText, getNameAbbreviation } from '@/main/utils';
import Loading from '@/common/atoms/Loading';
import { useSubscription } from '@/main/hooks/subscription.hook';

interface DirectoryItem {
  item: Department | Category | Vendor;
  disableFollow?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  itemType: 'categories' | 'vendors' | 'departments';
}

const DirectoryItem: React.FC<DirectoryItem> = ({
  item,
  disableFollow = false,
  onClick,
  itemType = 'categories',
}) => {
  const { subscribe, unsubscribe, isFollowing, isFollowLoading, isUnfollowLoading } =
    useSubscription();

  const avatarBgColor = React.useMemo(
    () => getColorByText(item?.name ?? '', item.id, true),
    [item],
  );

  const isFollow = isFollowing(itemType, item);
  const isLoading = isFollowLoading || isUnfollowLoading;

  const handleFollow: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    subscribe(itemType, item);
  };

  const handleUnfollow: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    unsubscribe(itemType, item);
  };

  const renderAvatarOrShortName = () => {
    const shortName = getNameAbbreviation(item?.name);
    const isHaveAvatar = item?.avatar;
    return (
      <div
        className="w-8 h-8 flex justify-center items-center rounded-full"
        style={{ background: avatarBgColor }}
      >
        {isHaveAvatar && (
          <img
            className="flex w-8 h-8 rounded-full"
            alt="DirectoryItem-avatar"
            src={isHaveAvatar}
          />
        )}
        {!isHaveAvatar && <p className="text-xs font-semibold text-white">{shortName}</p>}
      </div>
    );
  };

  const renderIcon = () => {
    if (disableFollow) return null;
    if (isFollow) {
      return (
        <Button onClick={handleUnfollow} className="rounded-full border-Gray-3">
          {isLoading ? (
            <div className="flex w-4 h-4 justify-center items-center">
              <Loading width={12} height={12} color="Gray-3" />
            </div>
          ) : (
            <TickIcon
              width={16}
              height={16}
              className="stroke-current path-no-stroke text-Gray-3"
              viewBox="0 0 15 15"
            />
          )}
          <span>Following</span>
        </Button>
      );
    }
    return (
      <Button onClick={handleFollow} className="rounded-full border-Gray-3">
        {isLoading ? (
          <div className="flex w-4 h-4 justify-center items-center">
            <Loading width={12} height={12} color="Gray-3" />
          </div>
        ) : (
          <AddIcon
            width={16}
            height={16}
            className="stroke-current stroke-1 path-no-stroke text-Gray-3"
            viewBox="0 0 15 15"
          />
        )}
        <span className="text-Gray-3">Follow</span>
      </Button>
    );
  };

  return (
    <div
      aria-hidden="true"
      className="flex items-center space-x-2 cursor-pointer px-4 py-3 min-h-16 sm:px-6 bg-white border border-Gray-11 w-full text-sm text-Gray-3 shadow overflow-hidden sm:rounded-card"
      onClick={onClick}
    >
      {renderAvatarOrShortName()}
      <div className="flex flex-1">
        <p className="text-sm font-medium text-Gray-1">{item?.name}</p>
      </div>
      {renderIcon()}
    </div>
  );
};

export default DirectoryItem;
