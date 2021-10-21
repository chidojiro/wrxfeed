import React, { CSSProperties } from 'react';
import { Comment } from '@main/entity';
import CommentOwner from '@main/atoms/CommentOwner';
import CommentText from '@main/atoms/CommentText';
import CommentImage from '@main/atoms/CommentImage';

const IMAGE_EXT = 'jpg,png,jpeg,gif';

export interface CommentItemProps {
  comment: Comment;
  className?: string;
  style?: CSSProperties;
}

const CommentItem: React.VFC<CommentItemProps> = ({ className, comment, ...rest }) => {
  const attachmentType = comment.attachment?.split('.').slice(-1)[0] ?? '';
  const attachmentName = comment.attachment?.split('/').slice(-1) ?? '';

  const renderAttachment = () =>
    IMAGE_EXT.includes(attachmentType.toLowerCase()) ? (
      <CommentImage src={comment.attachment ?? ''} />
    ) : (
      <a href={comment.attachment} download>
        {attachmentName}
      </a>
    );
  return (
    <div className={`bg-LightBG py-2 px-3.5 space-y-1 ${className}`} {...rest}>
      <CommentOwner owner={comment.user} commentDate={comment.createdAt} />
      <CommentText content={comment.content} />
      {!!comment.attachment && renderAttachment()}
    </div>
  );
};

export default CommentItem;
