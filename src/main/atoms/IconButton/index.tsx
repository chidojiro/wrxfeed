import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/styles';
import { Gray } from '@theme/colors';

const StyledButton = styled(Button)<ButtonProps>(() => ({
  height: 36,
  backgroundColor: Gray[1],
  padding: '8px 16px',
  borderRadius: 4,
  color: '#fff',
  fontSize: '0.875rem',
  fontWeight: 600,
  textTransform: 'none',
  '&:disabled': {
    backgroundColor: Gray[3],
    color: '#fff',
  },
  '&:hover': {
    backgroundColor: Gray[2],
  },
}));

const IconButton: React.VFC<ButtonProps> = (props) => {
  return <StyledButton {...props} />;
};

export default IconButton;
