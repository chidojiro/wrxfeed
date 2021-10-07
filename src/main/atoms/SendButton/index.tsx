import React from 'react';
import { styled } from '@mui/system';
import { useFormControl } from '@mui/material/FormControl';
import { EssentialsSendIcon, EssentialsSendEnableIcon } from '@assets/index';

const StyledButton = styled('button')(() => ({
  display: 'flex',
  backgroundColor: 'transparent',
  borderRadius: '0px',
  borderWidth: '0px',
  flexDirection: 'row',
  alignItems: 'center',
  outline: 'none',
  padding: '0px 5px 0px 2px',
}));

const SendButtonAirplane: React.VFC = (props) => {
  const { filled } = useFormControl() || {};

  const SendIcon = filled ? <EssentialsSendEnableIcon /> : <EssentialsSendIcon />;

  return (
    <StyledButton type="submit" {...props}>
      {SendIcon}
    </StyledButton>
  );
};

export default React.memo(SendButtonAirplane);
