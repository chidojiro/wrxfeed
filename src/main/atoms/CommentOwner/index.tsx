import React from 'react';
import { User } from '@main/entity';
import { formatDate } from '@common/utils';

export interface CommentOwnerProps {
  owner: User;
  commentDate: string;
}

const CommentOwner: React.VFC<CommentOwnerProps> = ({ owner, commentDate }) => {
  return (
    <div className="flex space-x-1 items-center">
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
