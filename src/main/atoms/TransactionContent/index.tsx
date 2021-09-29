import React from 'react';
import { Transaction } from '@main/entity';
import { Avatar, Grid, Stack, Typography } from '@mui/material';
import { formatDate, formatCurrency, stringAvatar } from '@common/utils';
import { Gray } from '@theme/colors';
import StatusTag from '@common/atoms/StatusTag';

export interface TransactionContentProps {
  transaction: Transaction;
}

const TransactionContent: React.VFC<TransactionContentProps> = ({ transaction }) => {
  const avatarProps = stringAvatar(transaction.category || '');

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Avatar sx={{ width: 32, height: 32, ...avatarProps.sx }}>
            <Typography variant="h5">{avatarProps.children}</Typography>
          </Avatar>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column">
            <Grid item xs>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography variant="h4">{transaction.category}</Typography>
                <Typography color={Gray[3]} variant="body2">
                  •
                </Typography>
                <Typography color={Gray[3]} variant="body2">
                  {formatDate(transaction?.transDate)}
                </Typography>
                {transaction.status !== undefined && <StatusTag status={transaction.status} />}
              </Stack>
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: '0.875rem' }}>{transaction.description}</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h5" color={Gray[2]}>
              -$
              {formatCurrency(transaction.amount)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TransactionContent;
