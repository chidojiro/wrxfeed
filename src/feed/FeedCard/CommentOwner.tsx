import { profileState } from '@/auth/containers/ProfileEditForm/states';
import { Avatar } from '@/common/components';
import { ClassName } from '@/common/types';
import { formatDate } from '@/common/utils';
import { User } from '@/main/entity';
import { getColorByText, getNameAbbreviation } from '@/main/utils';
import clsx from 'clsx';
import React from 'react';
import { useRecoilValue } from 'recoil';

export type CommentOwnerProps = ClassName & {
  owner: User;
  commentDate: string;
  showAva?: boolean;
};

export const CommentOwner = ({
  owner,
  commentDate,
  className,
  showAva = false,
}: CommentOwnerProps) => {
  const profile = useRecoilValue(profileState);
  const avatarBgColor = React.useMemo(
    () => getColorByText(owner?.fullName ?? ''),
    [owner?.fullName],
  );
  const renderAvaOrShortName = () => {
    const isMyComment = owner?.id === profile?.id;
    if (isMyComment) {
      return (
        <Avatar
          className="w-6 h-6 rounded-full"
          src={profile?.avatar}
          fullName={profile?.fullName as string}
        />
      );
    }
    if (owner?.avatar) {
      return (
        <Avatar
          className="w-6 h-6 rounded-full"
          src={owner?.avatar}
          fullName={owner?.fullName as string}
        />
      );
    }
    const shortName = getNameAbbreviation(owner?.fullName);
    return (
      <div
        className="flex w-6 h-6 rounded-full justify-center items-center"
        style={{ backgroundColor: avatarBgColor }}
      >
        <p className="text-white text-xs font-semibold">{shortName}</p>
      </div>
    );
  };
  return (
    <div className={clsx('flex space-x-1 items-center', className ?? '')}>
      {showAva && renderAvaOrShortName()}
      <p className="text-Gray-1 text-sm font-semibold">{owner.fullName}</p>
      {!!commentDate && (
        <>
          <p className="text-Gray-6 text-xs">•</p>
          <p className="text-Gray-6 text-xs">{formatDate(commentDate)}</p>
        </>
      )}
    </div>
  );
};
