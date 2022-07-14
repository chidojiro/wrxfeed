import React from 'react';
import { useRecoilValue } from 'recoil';

import { User } from '@/main/entity';
import { formatDate } from '@/common/utils';
import clsx from 'clsx';
import { getColorByText, getNameAbbreviation } from '@/main/utils';
import { profileState } from '@/auth/containers/ProfileEditForm/states';

export interface CommentOwnerProps {
  owner: User;
  commentDate: string;
  className?: string;
  showAva?: boolean;
}

const CommentOwner: React.FC<CommentOwnerProps> = ({
  owner,
  commentDate,
  className,
  showAva = false,
}) => {
  const profile = useRecoilValue(profileState);
  const avatarBgColor = React.useMemo(
    () => getColorByText(owner?.fullName ?? ''),
    [owner?.fullName],
  );
  const renderAvaOrShortName = () => {
    const isMyComment = owner?.id === profile?.id;
    if (isMyComment) {
      return <img className="w-6 h-6 rounded-full" src={profile?.avatar} alt="avatar" />;
    }
    if (owner?.avatar) {
      return <img className="w-6 h-6 rounded-full" src={owner?.avatar} alt="avatar" />;
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

export default CommentOwner;
