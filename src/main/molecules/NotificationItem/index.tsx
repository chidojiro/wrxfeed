import { Avatar, Button } from '@/common/components';
import { distanceToNow } from '@/common/utils';
import { CommentText } from '@/feed/CommentText';
import { Notification, NotifyStatus } from '@/main/entity';
import { getColorByText, getNameAbbreviation } from '@/main/utils';
import { identifyMixPanelUserProfile } from '@/mixpanel/useMixPanel';
import { useProfile } from '@/profile/useProfile';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';
import React from 'react';

export interface NotificationItemProps {
  item: Notification;
  index?: number;
  style?: React.CSSProperties;
  onClick: (item: Notification) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ item, onClick }) => {
  const avatarBgColor = React.useMemo(() => getColorByText(item?.content ?? ''), [item?.content]);
  const isNew = item.status === NotifyStatus.UNREAD;
  const { profile } = useProfile();

  const renderAvatarOrShortname = () => {
    const shortName = getNameAbbreviation(item?.causedByUser?.fullName);
    const isHaveAvatar = item?.causedByUser?.avatar;
    return (
      <div
        className="flex flex-row justify-center items-center w-10 h-10 rounded-full"
        style={{ backgroundColor: avatarBgColor }}
      >
        {isHaveAvatar && (
          <Avatar size="lg" fullName={item.causedByUser.fullName as string} src={isHaveAvatar} />
        )}
        {!isHaveAvatar && <p className="text-sm font-bold text-white">{shortName}</p>}
      </div>
    );
  };

  return (
    <Button
      onClick={() => {
        onClick(item);

        mixpanel.track('Notification Click', {
          user_id: profile?.id,
          email: profile?.email,
          company_id: profile?.company?.id,
        });
        identifyMixPanelUserProfile(profile);
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
        className="text-left leading-6 break-words ml-4 !whitespace-normal"
      />
      <div className="flex w-40 ml-auto">
        <div className="flex text-Gray-6 font-regular ml-auto text-right text-xs">
          {distanceToNow(item?.createdAt)}
        </div>
      </div>
    </Button>
  );
};

export default NotificationItem;
