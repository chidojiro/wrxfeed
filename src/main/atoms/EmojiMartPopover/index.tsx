import React, { MouseEvent } from 'react';
import { Stack } from '@mui/material';
import Popover from '@mui/material/Popover';
import { ReactComponent as SmileIcon } from '@assets/icons/outline/mood-smile.svg';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
// import { Picker } from './emoji-mart';

export interface EmojiPopoverProps {
  isOpen?: boolean;
}

const EmojiPopover: React.VFC<EmojiPopoverProps> = () => {
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const [chosenEmoji, setChosenEmoji] = React.useState<any>(null);

  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onEmojiSelect = (emoji: any) => {
    setChosenEmoji(emoji);
    console.log('Check emoji = ', emoji);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <SmileIcon onClick={handleClick} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        // style={{ marginBottom: '10px', backgroundColor: 'blue' }}
        anchorPosition={{
          top: 10,
          left: 10,
        }}
        elevation={0}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Stack paddingBottom="10px" bgcolor="transparent">
          <Picker
            onSelect={onEmojiSelect}
            title="Pick your emoji…"
            style={{ borderRadius: '20px' }}
          />
        </Stack>
      </Popover>
    </div>
  );
};

export default EmojiPopover;
