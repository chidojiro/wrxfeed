import { User } from '@/main/entity';
import { getColorByText, getNameAbbreviation } from '@/main/utils';
import { useProfile } from '@/profile/useProfile';
import clsx from 'clsx';
import React from 'react';

export interface UserAvatarProps {
  size?: number;
  className?: string;
  user: User;
  onClick?: (value?: string) => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ size, className = '', user }) => {
  const { profile } = useProfile();
  const avatarBgColor = React.useMemo(() => getColorByText(user?.fullName ?? ''), [user?.fullName]);

  const sizeToWidthHeight =
    size && size > 0
      ? {
          width: size,
          height: size,
          borderRadius: size / 2,
        }
      : {};

  const isMine = user?.id === profile?.id;
  if (isMine) {
    return (
      <img
        className={clsx('w-6 h-6 rounded-full', className)}
        style={{
          ...sizeToWidthHeight,
        }}
        src={profile?.avatar}
        alt="avatar"
      />
    );
  }
  if (user?.avatar) {
    return (
      <img
        className={clsx('w-6 h-6 rounded-full', className)}
        style={{
          ...sizeToWidthHeight,
        }}
        src={user?.avatar}
        alt="avatar"
      />
    );
  }
  const shortName = getNameAbbreviation(user?.fullName);

  return (
    <div
      className={clsx('flex w-6 h-6 rounded-full justify-center items-center', className)}
      style={{
        backgroundColor: user?.fullName ? avatarBgColor : '#DFE1E6',
        ...sizeToWidthHeight,
      }}
    >
      <p className="text-white text-xs font-semibold">{shortName}</p>
    </div>
  );
};

export default React.memo(UserAvatar);
