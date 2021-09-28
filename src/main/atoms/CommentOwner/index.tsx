import React from 'react';
import { User } from '@main/entity';
import { Stack, Typography } from '@mui/material';
import { formatDate } from '@common/utils';
import { Gray } from '@theme/colors';

export interface CommentOwnerProps {
  owner: User;
  commentDate: Date;
}

const CommentOwner: React.VFC<CommentOwnerProps> = ({ owner, commentDate }) => {
  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <Typography variant="h5" fontWeight={600}>
        {owner.fullName}
      </Typography>
      {!!commentDate && (
        <>
          <Typography color={Gray[3]} variant="body2">
            •
          </Typography>
          <Typography color={Gray[3]} variant="body2">
            {formatDate(commentDate)}
          </Typography>
        </>
      )}
    </Stack>
  );
};

export default CommentOwner;
