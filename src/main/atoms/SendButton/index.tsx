import React from 'react';
import { styled } from '@mui/system';
import { EssentialsSendIcon, EssentialsSendEnableIcon } from '@assets/index';

interface SendButtonAirplaneProps {
  disabled?: boolean;
}

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

const SendButtonAirplane: React.VFC<SendButtonAirplaneProps> = ({ disabled, ...rest }) => {
  const SendIcon = disabled ? <EssentialsSendIcon /> : <EssentialsSendEnableIcon />;

  return (
    <StyledButton disabled={disabled} type="submit" {...rest}>
      {SendIcon}
    </StyledButton>
  );
};

export default React.memo(SendButtonAirplane);
