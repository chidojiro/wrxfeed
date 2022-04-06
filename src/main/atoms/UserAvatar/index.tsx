import React from 'react';
import { useRecoilValue } from 'recoil';

import { profileState } from '@auth/containers/ProfileEditForm/states';
import { getDepartmentBgColor, getNameAbbreviation } from '@main/utils';
import { User } from '@main/entity';
import { classNames } from '@common/utils';

export interface UserAvatarProps {
  size?: number;
  className?: string;
  user: User;
  onClick?: (value?: string) => void;
}

const UserAvatar: React.VFC<UserAvatarProps> = ({ size, className = '', user }) => {
  const profile = useRecoilValue(profileState);
  const avatarBgColor = React.useMemo(
    () => getDepartmentBgColor(user?.fullName ?? ''),
    [user?.fullName],
  );

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
        className={classNames('w-6 h-6 rounded-full', className)}
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
        className={classNames('w-6 h-6 rounded-full', className)}
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
      className={classNames('flex w-6 h-6 rounded-full justify-center items-center', className)}
      style={{
        backgroundColor: avatarBgColor,
        ...sizeToWidthHeight,
      }}
    >
      <p className="text-white text-xs font-semibold">{shortName}</p>
    </div>
  );
};

export default React.memo(UserAvatar);
