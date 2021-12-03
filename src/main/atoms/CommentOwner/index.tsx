import React from 'react';
import { User } from '@main/entity';
import { classNames, formatDate } from '@common/utils';
import { getDepartmentBgColor, getNameAbbreviation } from '@main/utils';

export interface CommentOwnerProps {
  owner: User;
  commentDate: string;
  className?: string;
  showAva?: boolean;
}

const CommentOwner: React.VFC<CommentOwnerProps> = ({
  owner,
  commentDate,
  className,
  showAva = false,
}) => {
  const avatarBgColor = React.useMemo(
    () => getDepartmentBgColor(owner?.fullName ?? ''),
    [owner?.fullName],
  );
  const renderAvaOrShortName = () => {
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
    <div className={classNames('flex space-x-1 items-center', className ?? '')}>
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
