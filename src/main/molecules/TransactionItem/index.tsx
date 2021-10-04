import React, { useCallback, useState } from 'react';
import { CommentFormModel } from '@main/types';
import { Transaction } from '@main/entity';
import TransactionContent from '@main/atoms/TransactionContent';
import CommentBox from '@main/molecules/CommentBox';
import { Stack, Box, List, Collapse } from '@mui/material';
import CommentItem from '@main/molecules/CommentItem';
import CommentRemaining from '@main/atoms/CommentRemaining';
import { TransitionGroup } from 'react-transition-group';
import { useComment } from '@main/hooks';
import { Pagination } from '@api/types';

const INITIAL_COMMENT_NUMBER = 2;
const LOAD_MORE_LIMIT = 5;

export interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.VFC<TransactionItemProps> = ({ transaction }) => {
  // Recoil states
  // Local States
  const [filter, setFilter] = useState<Pagination>({ offset: 0, limit: INITIAL_COMMENT_NUMBER });
  const { comments, total, isLoading, addComment } = useComment(transaction, filter);
  // Variables
  const hasComment = !!total;
  const hiddenCommentCount = total - comments.length;

  const onSubmitComment = (values: CommentFormModel) => {
    const isDirty = !!values.content;
    if (!isDirty) return;
    const parsedContent = values.content
      .split(' ')
      .map((word) => {
        if (word.startsWith('@')) {
          // 6 is Harry user id, matt is 8
          return `<mention userid="8" tagname="${word.replace('@', '')}"/>`;
        }
        return word;
      })
      .join(' ');
    addComment({ content: parsedContent });
  };

  const loadMoreComments = useCallback(() => {
    if (isLoading) return;
    setFilter((prevFilter) => ({
      limit: LOAD_MORE_LIMIT,
      offset: prevFilter.offset + prevFilter.limit,
    }));
  }, [isLoading]);

  return (
    <Stack sx={{ p: 2 }} spacing={2}>
      <Box sx={{ pt: 1 }}>
        <TransactionContent transaction={transaction} />
      </Box>
      {hasComment && (
        <Stack sx={{ pl: 6, pt: 1, pb: 1 }} spacing={0.5}>
          <List>
            <TransitionGroup>
              {hiddenCommentCount > 0 && (
                <Collapse key="hidden-comment-count">
                  <CommentRemaining
                    sx={{ marginBottom: 0.5 }}
                    hiddenCount={hiddenCommentCount}
                    onClick={loadMoreComments}
                    loading={isLoading}
                  />
                </Collapse>
              )}
              {comments?.map((comment) => (
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
