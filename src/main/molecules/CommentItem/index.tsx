import React from 'react';
import { Comment } from '@main/entity';
import { Stack, StackProps } from '@mui/material';
import CommentOwner from '@main/atoms/CommentOwner';
import CommentText from '@main/atoms/CommentText';
import { styled } from '@mui/styles';
import { LightBG } from '@theme/colors';
import { SxProps } from '@mui/system';

export type CommentItemProps = StackProps & {
  comment: Comment;
  sx?: SxProps;
};

const Container = styled(Stack)({
  padding: '8px 14px',
  backgroundColor: LightBG,
});

const CommentItem: React.VFC<CommentItemProps> = ({ comment, ...rest }) => {
  return (
    <Container spacing={0.5} {...rest}>
      <CommentOwner owner={comment.user} commentDate={comment.createdAt} />
      <CommentText content={comment.content} />
    </Container>
  );
};

export default CommentItem;
