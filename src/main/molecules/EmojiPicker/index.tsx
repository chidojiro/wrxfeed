import React from 'react';
import { Popover, PopoverProps } from '@mui/material';
import { EmojiData, Picker } from 'emoji-mart';
import { Gray } from '@theme/colors';

export interface EmojiPickerProps extends PopoverProps {
  onSelectEmoji: (emoji: EmojiData) => void;
}

const EmojiPicker: React.VFC<EmojiPickerProps> = ({ onSelectEmoji, ...rest }) => {
  return (
    <Popover
      PaperProps={{
        sx: { backgroundColor: 'transparent', borderRadius: '24px', overflow: 'hidden' },
      }}
      sx={{
        top: -10,
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
      keepMounted={false}
      {...rest}
    >
      <Picker
        showPreview={false}
        showSkinTones={false}
        emoji=""
        color={Gray[1]}
        style={{ width: 358 }}
        onSelect={onSelectEmoji}
        title="Pick your emoji…"
      />
    </Popover>
  );
};

export default EmojiPicker;
