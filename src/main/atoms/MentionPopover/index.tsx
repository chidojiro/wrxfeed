import React from 'react';
import { Stack, Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
// import Button from '@mui/material/Button';
import { LighBG, Gray } from '@theme/colors';
// import { ReactComponent as SmileIcon } from '@assets/icons/outline/mood-smile.svg';
import { ReactComponent as AvatarIcon } from '@assets/icons/outline/avatar.svg';
import { User } from '@main/types';

import { useRecoilState } from 'recoil';
import { mentionUsers } from './dummy';
import { showMentionPopover } from './states';

export interface MentionPopoverProps {
  isOpen?: boolean;
}

const MentionPopover: React.VFC<MentionPopoverProps> = () => {
  const [anchorEl, setAnchorEl] = useRecoilState(showMentionPopover);
  // const [anchorEl, setAnchorEl] = React.useState<any>(null);

  // const handleClick = (event: MouseEvent) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        // style={{ marginBottom: '10px', backgroundColor: 'blue' }}
        // sx={{ backgroundColor: 'blue' }}
        anchorPosition={{
          top: 10,
          left: 10,
        }}
        elevation={2}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Stack width="400px" height="300px" borderRadius="24px" bgcolor={LighBG}>
          <Typography margin="16px" color={Gray[3]} fontSize="14px" lineHeight="20px">
            Suggested users
          </Typography>
          {mentionUsers.map((item: User) => {
            return (
              <Stack
                key={item.name}
                direction="row"
                alignItems="center"
                paddingX="16px"
                paddingY="8px"
              >
                <AvatarIcon width="24px" height="24px" />
                <Typography fontSize="14px" height="17px" color={Gray[1]}>
                  {item?.name}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Popover>
    </div>
  );
};

export default MentionPopover;
