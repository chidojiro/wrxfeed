import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/styles';

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: 131,
  height: 30,
  paddingLeft: 20,
  paddingRight: 16,
  margin: 'auto',
  borderRadius: 15,
  border: '1px solid rgba(164, 168, 150, 0.5)',
}));

const TransactionLoading: React.VFC = () => {
  return (
    <Container>
      <CircularProgress size={16} />
      <Typography marginBottom="2px" fontSize="0.875rem" fontWeight={400}>
        Loading...
      </Typography>
    </Container>
  );
};

export default TransactionLoading;
