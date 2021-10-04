import React, { useMemo, useState } from 'react';
import { CommentFormModel } from '@main/types';
import { Transaction } from '@main/entity';
import TransactionContent from '@main/atoms/TransactionContent';
import CommentBox from '@main/molecules/CommentBox';
import { Stack, Box, List, Collapse } from '@mui/material';
import CommentItem from '@main/molecules/CommentItem';
import CommentRemaining from '@main/atoms/CommentRemaining';
import { TransitionGroup } from 'react-transition-group';
import { useComment } from '@main/hooks';

const INITIAL_COMMENT_NUMBER = 2;

export interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.VFC<TransactionItemProps> = ({ transaction }) => {
  // Recoil states
  // Local States
  const { comments, addComment } = useComment(transaction.id);
  const [isShowAllComments, showAllComments] = useState(false);
  // Variables
  const shownComments = useMemo(() => {
    return isShowAllComments ? comments : comments?.slice(-INITIAL_COMMENT_NUMBER);
  }, [isShowAllComments, comments]);
  const hasComment = !!comments?.length;
  const hiddenCommentCount = (comments?.length ?? 0) - INITIAL_COMMENT_NUMBER;

  console.log('Check comments = ', comments);

  const onSubmitComment = (values: CommentFormModel) => {
    const isDirty = !!values.content;
    if (!isDirty) return;
    const parsedContent = values.content
      .split(' ')
      .map((word) => {
        if (word.startsWith('@')) {
          // 6 is Harry user id
          return `<mention userid="6" tagname="${word.replace('@', '')}"/>`;
        }
        return word;
      })
      .join(' ');
    addComment({ content: parsedContent });
  };

  return (
    <Stack sx={{ p: 2 }} spacing={2}>
      <Box sx={{ pt: 1 }}>
        <TransactionContent transaction={transaction} />
      </Box>
      {hasComment && (
        <Stack sx={{ pl: 6, pt: 1, pb: 1 }} spacing={0.5}>
          <List>
            <TransitionGroup>
              {!isShowAllComments && hiddenCommentCount > 0 && (
                <Collapse key="hidden-comment-count">
                  <CommentRemaining
                    sx={{ marginBottom: 0.5 }}
                    hiddenCount={hiddenCommentCount}
                    onClick={() => showAllComments(true)}
                  />
                </Collapse>
              )}
              {shownComments?.map((comment) => (
                <Collapse key={comment.id}>
                  <CommentItem sx={{ marginBottom: 0.5 }} comment={comment} />
                </Collapse>
              ))}
            </TransitionGroup>
          </List>
        </Stack>
      )}
      <Box sx={{ pl: 6, pt: 0.5, pb: 1 }}>
        <CommentBox onSubmit={onSubmitComment} />
      </Box>
    </Stack>
  );
};

export default TransactionItem;
