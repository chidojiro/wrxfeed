import React, { MouseEvent } from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import { LightBG, Gray } from '@theme/colors';
import { ReactComponent as SmileIcon } from '@assets/icons/outline/mood-smile.svg';
import { ReactComponent as SearchEmoji } from '@assets/icons/outline/searchEmoji.svg';
import { Emoji, GroupEmoji } from '@main/types';

import { NextEmoji } from '@assets/index';
import { dummyEmoji, dummyGroupEmoji, getEmojiList } from './dummy';

export interface EmojiPopoverProps {
  isOpen?: boolean;
  onSelectEmoji: (emoji: Emoji) => void;
}

const EmojiPopover: React.VFC<EmojiPopoverProps> = ({ onSelectEmoji }) => {
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const [emojiList, setEmojiList] = React.useState<Emoji[] | []>(dummyEmoji);

  React.useEffect(() => {
    // console.log('Check getEmojiList = ', getEmojiList());
    setEmojiList(getEmojiList());
  }, []);

  const handleClick = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <SmileIcon onClick={handleClick} />
      <Popover
        PaperProps={{
          sx: { backgroundColor: 'transparent' },
        }}
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
          <Stack
            width="302px"
            height="326px"
            borderRadius="24px"
            bgcolor={LightBG}
            style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <Stack margin="8px" direction="row" alignItems="center" paddingX="12px" paddingY="8px">
              <SearchEmoji width="16px" height="16px" style={{ marginRight: '8px' }} />
              <Stack marginLeft="8px">
                <input
                  style={{
                    display: 'flex',
                    fontSize: '14px',
                    lineHeight: '17px',
                    color: Gray[1],
                    outline: 'none',
                    borderWidth: 0,
                    backgroundColor: 'transparent',
                    margin: '0px',
                  }}
                  placeholder="Search Emoji"
                />
              </Stack>
            </Stack>
            <Stack
              direction="row"
              flex={1}
              flexWrap="wrap"
              justifyContent="center"
              paddingX="8px"
              style={{ overflowY: 'scroll' }}
            >
              {emojiList.map((item: Emoji) => {
                return (
                  <button
                    onClick={() => onSelectEmoji(item)}
                    type="button"
                    key={item.id}
                    style={{
                      display: 'flex',
                      width: '21px',
                      height: '21px',
                      margin: '0px 5px 4px 5px',
                      justifyContent: 'center',
                      alignItems: 'center',
                      outline: 'none',
                      borderWidth: '0px',
                      backgroundColor: 'transparent',
                    }}
                    // alignItems="center"
                    // justifyContent="center"
                    // width="21px"
                    // height="21px"
                    // marginX="5px"
                    // marginBottom="4px"
                  >
                    <Typography fontSize="14px">{item.emoji}</Typography>
                  </button>
                );
              })}
            </Stack>
            <Divider />
            <Stack
              direction="row"
              alignItems="center"
              height="50px"
              paddingX="20px"
              overflow="hidden"
            >
              <Stack direction="row" alignItems="center" overflow="auto">
                {dummyGroupEmoji.map((item: GroupEmoji) => {
                  return (
                    <Stack key={item.id} marginRight="26px">
                      <item.emojiRepresent />
                    </Stack>
                  );
                })}
              </Stack>
              <NextEmoji width="16px" height="16px" />
            </Stack>
          </Stack>
        </Stack>
      </Popover>
    </div>
  );
};

export default EmojiPopover;
