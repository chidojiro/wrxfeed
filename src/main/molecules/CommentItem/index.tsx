import React from 'react';
import { Comment } from '@main/entity';
import { Stack, StackProps } from '@mui/material';
import CommentOwner from '@main/atoms/CommentOwner';
import CommentText from '@main/atoms/CommentText';
import { styled } from '@mui/styles';
import { LightBG } from '@theme/colors';
import { SxProps } from '@mui/system';
import CommentImage from '@main/atoms/CommentImage';

const IMAGE_EXT = 'jpg,png,jpeg,gif';

export type CommentItemProps = StackProps & {
  comment: Comment;
  sx?: SxProps;
};

const Container = styled(Stack)({
  padding: '8px 14px',
  backgroundColor: LightBG,
});

const CommentItem: React.VFC<CommentItemProps> = ({ comment, ...rest }) => {
  const attachmentType = comment.attachment?.split('.').slice(-1) || '';
  const attachmentName = comment.attachment?.split('/').slice(-1) || '';

  const renderAttachment = () =>
    IMAGE_EXT.includes(attachmentType) ? (
      <CommentImage src={comment.attachment} />
    ) : (
      <a href={comment.attachment} download>
        {attachmentName}
      </a>
    );
  return (
    <Container spacing={0.5} {...rest}>
      <CommentOwner owner={comment.user} commentDate={comment.createdAt} />
      <CommentText content={comment.content} />
      {!!comment.attachment && renderAttachment()}
    </Container>
  );
};

export default CommentItem;
