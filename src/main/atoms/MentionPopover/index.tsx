import React from 'react';
import { Stack, Typography, Button, Divider } from '@mui/material';
import Popover from '@mui/material/Popover';
import { LighBG, Gray, Highlight } from '@theme/colors';
import { ReactComponent as AvatarIcon } from '@assets/icons/outline/avatar.svg';
// import { ReactComponent as SmileIcon } from '@assets/icons/outline/mood-smile.svg';
import { User } from '@main/entity/user.entity';

import { useRecoilState } from 'recoil';
import { InviteIcon } from '@assets/index';
import { mentionUsers } from './dummy';
import { showMentionPopover } from './states';

export interface MentionPopoverProps {
  isOpen?: boolean;
}

const MentionPopover: React.VFC<MentionPopoverProps> = () => {
  const [anchorEl, setAnchorEl] = useRecoilState(showMentionPopover);
  // const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const [mention, setMention] = React.useState<User | null>(null);

  // const handleClick = (event: MouseEvent) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMouseOver = (user: User) => {
    setMention(user);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div>
      {/* <SmileIcon onClick={handleClick} /> */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        style={
          {
            // filter:
            //   'drop-shadow(0px 3px 5px rgba(39, 50, 64, 0.2)) drop-shadow(0px 0px 1px rgba(39, 50, 64, 0.3))',
          }
        }
        // sx={{ backgroundColor: 'blue' }}
        anchorPosition={{
          top: 10,
          left: 10,
        }}
        elevation={0}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Stack
          width="492px"
          height="300px"
          borderRadius="24px"
          bgcolor={LighBG}
          margin="5px"
          style={{
            filter:
              'drop-shadow(0px 3px 5px rgba(39, 50, 64, 0.2)) drop-shadow(0px 0px 1px rgba(39, 50, 64, 0.3))',
          }}
        >
          <Stack height="36px" paddingX="16px" paddingY="8px" marginTop="8px">
            <input
              placeholder="Suggested users"
              style={{
                display: 'flex',
                color: Gray[3],
                fontSize: '14px',
                borderWidth: '0px',
                backgroundColor: 'transparent',
                outline: 'none',
              }}
            />
          </Stack>
          {mentionUsers.map((item: User) => {
            const isSelect = item.id === mention?.id;
            const bgColor = isSelect ? Highlight : 'transparent';
            const contentColor = isSelect ? Gray[1] : Gray[3];
            return (
              <Button
                type="button"
                key={item.id}
                onMouseOver={() => onMouseOver(item)}
                style={{
                  padding: '0px',
                  justifyContent: 'left',
                  backgroundColor: bgColor,
                  borderRadius: '0px',
                }}
              >
                <Stack direction="row" alignItems="center" paddingX="16px" paddingY="8px">
                  <AvatarIcon fill={contentColor} />
                  <Typography
                    fontSize="14px"
                    marginLeft="8px"
                    color={Gray[1]}
                    fontWeight="600"
                    style={{ textTransform: 'lowercase' }}
                  >
                    {item?.email}
                  </Typography>
                </Stack>
              </Button>
            );
          })}
          <Divider style={{ marginTop: '8px' }} />
          <Stack paddingX="16px" paddingY="8px" marginTop="24px">
            <Typography
              fontSize="14px"
              lineHeight="17px"
              fontWeight="600"
              textAlign="center"
              style={{}}
            >
              Invite collaborators via email
            </Typography>
          </Stack>
          <Button
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '8px 16px 8px 16px',
              width: '240px',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              backgroundColor: Gray[2],
              borderRadius: '4px',
            }}
          >
            <InviteIcon style={{ marginRight: '4px' }} />
            <Typography fontSize="14px" lineHeight="17px" fontWeight="600" color="white">
              Invite
            </Typography>
          </Button>
        </Stack>
      </Popover>
    </div>
  );
};

export default MentionPopover;
