import { CommentIcon } from '@/assets';
import { AvatarGroup, AvatarProps } from '@/common/components';
import { ClassName } from '@/common/types';
import { Comment } from '@/main/entity';
import { uniqBy } from 'lodash-es';
import React from 'react';

export type CommentGroupProps = ClassName & {
  comments: Comment[];
};

export const CommentGroup = ({ comments, className }: CommentGroupProps) => {
  const uniqueAvatars: AvatarProps[] = uniqBy(
    comments.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()),
    'user.id',
  ).map((comment) => ({
    src: comment?.user?.avatar,
    fullName: comment?.user?.fullName ?? '',
  }));

  const avatars = uniqueAvatars.length > 3 ? uniqueAvatars.slice(0, 3) : uniqueAvatars;

  const trailingCommentIcon = (
    <div className="relative">
      <CommentIcon className="text-Gray-7 h-7 w-6" />
      <div className="absolute bottom-2 left-3 transform -translate-x-1/2 text-Gray-3 text-2xs font-semibold">
        {comments.length}
      </div>
    </div>
  );

  return (
    <AvatarGroup className={className} trailingComponent={trailingCommentIcon} items={avatars} />
  );
};
