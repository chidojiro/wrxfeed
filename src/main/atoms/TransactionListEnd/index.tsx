import React from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { Neutral } from '@theme/colors';

const Container = styled('div')(() => ({
  display: 'flex',
  flexShrink: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: 30,
  padding: '0px 16px 2px 16px',
  margin: 'auto',
  borderRadius: 15,
  border: '1px solid rgba(164, 168, 150, 0.5)',
}));

const TransactionListEnd: React.VFC = () => {
  return (
    <>
      <Stack mt={4} mb={5} direction="row" alignItems="center">
        <Divider sx={{ flex: 1 }} />
        <Container>
          <Typography fontSize="0.875rem" fontWeight={400}>
            Your’e all caught up
          </Typography>
        </Container>
        <Divider sx={{ flex: 1 }} />
      </Stack>
      <Typography fontSize="1.25rem" fontWeight={400} color={Neutral[4]} textAlign="center">
        That’s all for now
        <span role="img" aria-label="rocket">
          {' '}
          🚀
        </span>
      </Typography>
    </>
  );
};

export default TransactionListEnd;
