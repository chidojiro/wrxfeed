import React, { useMemo, useState } from 'react';
import { CommentFormModel } from '@main/types';
import { Comment, Transaction } from '@main/entity';
import TransactionContent from '@main/atoms/TransactionContent';
import CommentBox from '@main/atoms/CommentBox';
import { Stack, Box, List, Collapse } from '@mui/material';
import CommentItem from '@main/molecules/CommentItem';
import CommentRemaining from '@main/atoms/CommentRemaining';
import { useIdentity } from '@identity/hooks';
import { TransitionGroup } from 'react-transition-group';
import { useComment } from '@main/hooks';

const INITIAL_COMMENT_NUMBER = 2;

export interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.VFC<TransactionItemProps> = ({ transaction }) => {
  // Recoil states
  const identity = useIdentity();
  // Local States
  const { comments, setComments } = useComment(transaction.id);
  const [isShowAllComments, showAllComments] = useState(false);
  // Variables
  const shownComments = useMemo(() => {
    return isShowAllComments ? comments : comments?.slice(0, INITIAL_COMMENT_NUMBER);
  }, [isShowAllComments, comments]);
  const hasComment = !!comments?.length;
  const hiddenCommentCount = (comments?.length ?? 0) - INITIAL_COMMENT_NUMBER;

  const onSubmitComment = (values: CommentFormModel) => {
    const parsedContent = values.content
      .split(' ')
      .map((word) => {
        if (word.startsWith('@')) {
          return `<mention userid="123" tagname="${word.replace('@', '')}"/>`;
        }
        return word;
      })
      .join(' ');
    setComments((prevComments) => {
      const newComment: Comment = {
        id: (prevComments?.length ?? 0 + 1).toString(),
        user: {
          email: identity?.email || '',
          fullName: identity?.displayName || identity?.email || '',
        },
        content: parsedContent,
        createdAt: new Date(),
      };
      return prevComments ? [newComment, ...prevComments] : [];
    });
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
              {shownComments?.map((comment, idx) => (
                <Collapse key={`${comment.id}-${idx.toString()}`}>
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
