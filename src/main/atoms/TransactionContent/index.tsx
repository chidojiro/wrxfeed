import React, { MutableRefObject } from 'react';
import { Transaction } from '@main/entity';
import { Avatar, Grid, Stack, Tooltip, Typography, Box } from '@mui/material';
import { formatDate, formatCurrency, stringAvatar } from '@common/utils';
import { Gray, System } from '@theme/colors';
import StatusTag from '@common/atoms/StatusTag';
import { ReactComponent as MoreVerticalIcon } from '@assets/icons/outline/more-vertical.svg';
import SvgColorIcon from '@common/atoms/SvgColorIcon';
import { ReactComponent as EyeHideIcon } from '@assets/icons/outline/eye-hide.svg';

export interface TransactionContentProps {
  transaction: Transaction;
  isHidden?: boolean;
  onEllipsisClick?: () => void;
  ellipsisRef?: MutableRefObject<unknown>;
}

const TransactionContent: React.VFC<TransactionContentProps> = ({
  transaction,
  isHidden,
  ellipsisRef,
  onEllipsisClick,
}) => {
  // Variables
  const avatarProps = stringAvatar(transaction.department || '');

  return (
    <Grid container spacing={2}>
      <Grid item>
        <Tooltip title={transaction.department || ''}>
          <Avatar sx={{ width: 32, height: 32, ...avatarProps.sx }}>
            <Typography variant="h5">{avatarProps.children}</Typography>
          </Avatar>
        </Tooltip>
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
              {isHidden && (
                <>
                  <SvgColorIcon
                    sx={{ width: 'auto', height: 'auto' }}
                    component={EyeHideIcon}
                    pathStyle={{ fill: System.Alert, stroke: System.Alert }}
                    viewBox="-2 -2 19 19"
                  />
                  <Typography variant="body2" color={Gray[3]}>
                    Hidden
                  </Typography>
                </>
              )}
            </Stack>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: '0.875rem' }}>{transaction.vendor}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h5" color={Gray[2]}>
            {`$${formatCurrency(transaction?.amount)}`}
          </Typography>
        </Grid>
        <Grid item>
          <Box ref={ellipsisRef} sx={{ ml: 2, mt: '-2px' }} onClick={onEllipsisClick}>
            <MoreVerticalIcon />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TransactionContent;
