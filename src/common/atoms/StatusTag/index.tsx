import React from 'react';
import Chip, { ChipProps } from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

export enum STATUS {
  NEW,
}

export type StatusTagProps = ChipProps & {
  status: STATUS;
};

const StyledTag = styled(Chip)<ChipProps>(() => ({
  height: 16,
  borderRadius: 3,
  '& .MuiChip-label': {
    padding: '2px 4px',
    fontSize: '0.75em',
    fontWeight: 600,
  },
}));

const StatusTag: React.VFC<StatusTagProps> = ({ status, ...rest }) => {
  switch (status) {
    case STATUS.NEW:
      return <StyledTag label="New" color="highlight" {...rest} />;
    default:
      return <StyledTag label="" color="highlight" {...rest} />;
  }
};

export default React.memo(StatusTag);
