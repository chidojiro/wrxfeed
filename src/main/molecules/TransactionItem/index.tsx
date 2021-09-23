import React from 'react';
import { Transaction } from '@main/types';
import TransactionContent from '@main/atoms/TransactionContent';
import CommentBox from '@main/atoms/CommentBox';
import { Stack, Box } from '@mui/material';

export interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.VFC<TransactionItemProps> = ({ transaction }) => {
  // const classes = useStyles();

  return (
    <Stack sx={{ p: 2 }} spacing={2}>
      <Box sx={{ pt: 1 }}>
        <TransactionContent transaction={transaction} />
      </Box>
      <Box sx={{ pl: 6, pt: 1, pb: 1 }}>
        <CommentBox />
      </Box>
    </Stack>
  );
};

export default TransactionItem;
