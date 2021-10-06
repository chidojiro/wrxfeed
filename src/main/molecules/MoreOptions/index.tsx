import React from 'react';
import { Popover, PopoverProps, Stack, Typography, Button } from '@mui/material';

export enum MoreOptionTypes {
  HideCategory = 'Hide Category',
  ShareFeedback = 'Share Feedback',
}

export interface MoreOptionsProps extends PopoverProps {
  onSelectOption: (option: string) => void;
}

const MoreOptions: React.VFC<MoreOptionsProps> = ({ onSelectOption, ...rest }) => {
  return (
    <Popover
      PaperProps={{
        sx: {
          backgroundColor: 'white',
          borderRadius: '4px',
          overflow: 'hidden',
          boxShadow: '0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.31)',
        },
      }}
      sx={{
        top: -10,
      }}
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted={false}
      {...rest}
    >
      <Stack paddingY="4px" borderRadius="4px">
        <Button
          style={{ padding: '6px 16px 6px 16px', borderRadius: '0px' }}
          onClick={() => onSelectOption(MoreOptionTypes.HideCategory)}
        >
          <Typography>Hide Category</Typography>
        </Button>
        <Button
          style={{ padding: '6px 16px 6px 16px', borderRadius: '0px' }}
          onClick={() => onSelectOption(MoreOptionTypes.ShareFeedback)}
        >
          <Typography>Share Feedback</Typography>
        </Button>
      </Stack>
    </Popover>
  );
};

export default MoreOptions;
