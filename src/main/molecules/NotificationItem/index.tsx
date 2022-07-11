import { Notification, NotifyStatus } from '@/main/entity';
import React from 'react';
import { distanceToNow } from '@/common/utils';
import clsx from 'clsx';
import CommentText from '@/main/atoms/CommentText';
import { getColorByText, getNameAbbreviation } from '@/main/utils';

import mixpanel from 'mixpanel-browser';
import { useIdentity } from '@/identity/hooks';

export interface NotificationItemProps {
  item: Notification;
  index?: number;
  style?: React.CSSProperties;
  onClick: (item: Notification) => void;
}

const NotificationItem: React.VFC<NotificationItemProps> = ({ item, onClick }) => {
  const avatarBgColor = React.useMemo(() => getColorByText(item?.content ?? ''), [item?.content]);
  const isNew = item.status === NotifyStatus.UNREAD;
  const identity = useIdentity();

  const renderAvatarOrShortname = () => {
    const shortName = getNameAbbreviation(item?.causedByUser?.fullName);
    const isHaveAvatar = item?.causedByUser?.avatar;
    return (
      <div
        className="flex flex-row justify-center items-center w-10 h-10 rounded-full"
        style={{ backgroundColor: avatarBgColor }}
      >
        {isHaveAvatar && (
          <img
            className="flex w-10 h-10 rounded-full"
            alt="avatar-who-mention"
            src={isHaveAvatar}
          />
        )}
        {!isHaveAvatar && <p className="text-sm font-bold text-white">{shortName}</p>}
      </div>
    );
  };

  return (
    <button
      type="button"
      onClick={() => {
        onClick(item);

        mixpanel.track('Notification Click', {
          user_id: identity?.id,
          email: identity?.email,
          company: identity?.company?.id,
        });
      }}
      className={clsx(
        'flex flex-row min-h-16 pl-3 pr-5 py-4 w-full',
        isNew ? 'bg-white' : 'bg-Gray-18',
      )}
    >
      <div className="flex flex-row items-center">
        <div
          className={clsx(
            'flex self-center w-1.5 h-1.5 rounded-full mr-1.5',
            isNew ? 'bg-system-success' : 'bg-transparent',
          )}
        />
        {renderAvatarOrShortname()}
      </div>
      <CommentText
        content={item.content}
        className="text-left leading-6 break-words ml-4"
        style={{ whiteSpace: 'normal' }}
      />
      <div className="flex w-40 ml-auto">
        <div className="flex text-Gray-6 font-regular ml-auto text-right text-xs">
          {distanceToNow(item?.createdAt)}
        </div>
      </div>
    </button>
  );
};

export default NotificationItem;
