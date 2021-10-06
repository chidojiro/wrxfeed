import React from 'react';
import { Transaction } from '@main/entity';
import { Avatar, Grid, Stack, Tooltip, Typography, Box } from '@mui/material';
import { formatDate, formatCurrency, stringAvatar } from '@common/utils';
import { Gray } from '@theme/colors';
import StatusTag from '@common/atoms/StatusTag';
import { MoreVerticalIcon } from '@assets/index';
import { MoreOptionTypes } from '@main/molecules/MoreOptions';
import { MoreOptions, FeelBackModal } from '../../molecules';

export interface TransactionContentProps {
  transaction: Transaction;
}

const TransactionContent: React.VFC<TransactionContentProps> = ({ transaction }) => {
  const avatarProps = stringAvatar(transaction.department || '');
  const [showMoreOptions, setShowMoreOptions] = React.useState<boolean>(false);
  const [showFeelBack, setShowFeelBack] = React.useState<boolean>(false);
  const moreOptionsRef = React.useRef<HTMLDivElement>();
  const onSelectOption = (option: string) => {
    setShowMoreOptions(false);
    if (option === MoreOptionTypes.ShareFeedback) {
      setShowFeelBack(true);
    }
  };
  return (
    <>
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
              </Stack>
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: '0.875rem' }}>{transaction.vendor}</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h5" color={Gray[2]}>
              -$
              {formatCurrency(transaction.amount)}
            </Typography>
          </Grid>
          <Box
            ref={moreOptionsRef}
            marginLeft="8px"
            // className={classes.inputOption}
            onClick={() => setShowMoreOptions(true)}
          >
            <MoreVerticalIcon />
          </Box>
          <MoreOptions
            open={showMoreOptions}
            anchorEl={moreOptionsRef.current}
            onSelectOption={onSelectOption}
            onClose={() => setShowMoreOptions(false)}
          />
          <FeelBackModal open={showFeelBack} />
        </Grid>
      </Grid>
    </>
  );
};

export default TransactionContent;
