import React from 'react';
import { Stack, Typography, Button, Divider } from '@mui/material';
import Popover from '@mui/material/Popover';
import { Gray, Highlight, LightBG } from '@theme/colors';
import { ReactComponent as AvatarIcon } from '@assets/icons/outline/avatar.svg';
// import { ReactComponent as SmileIcon } from '@assets/icons/outline/mood-smile.svg';
import { User } from '@main/entity/user.entity';
import { showInviteModalState } from '@main/organisms/InviteModal/states';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { InviteIcon } from '@assets/index';
// import { useMention } from '@main/hooks';
import { mentionUsers } from './dummy';
import { showMentionPopover } from './states';

export interface MentionPopoverProps {
  isOpen?: boolean;
  onSelectUser: (user: User) => void;
}

export enum KeyboardCode {
  up = 38,
  down = 40,
}

export type MentionSelect = {
  user: User;
  index: number;
};

const MentionPopover: React.VFC<MentionPopoverProps> = ({ onSelectUser }) => {
  const [anchorEl, setAnchorEl] = useRecoilState(showMentionPopover);
  const setInviteModal = useSetRecoilState(showInviteModalState);
  const [mentionSelect, setMentionSelect] = React.useState<MentionSelect>();
  const [mentionData, setMentionData] = React.useState<User[]>([]);
  // const mentions = useMention();

  React.useEffect(() => {
    setMentionData(mentionUsers);
  }, []);

  React.useEffect(() => {
    console.log('Check new mentionData = ', mentionData);
  }, [mentionData]);

  // const handleClick = (event: MouseEvent) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const escFunction = React.useCallback((event: KeyboardEvent, mention?: MentionSelect) => {
    console.log('escFunction', event);
    console.log('keyCode', event.key);
    console.log('mentionSelect', mention);
    // return
    if (!mention) {
      console.log('mentionData.length', mentionData.length);
      if (mentionData.length > 0) {
        setMentionSelect({
          user: mentionData[0],
          index: 0,
        });
      }
      return;
    }
    if (event.key === 'ArrowUp') {
      console.log('Detect up is pressed');
      if (mentionData.length > mention?.index + 1) {
        setMentionSelect({
          user: mentionData[mention?.index + 1],
          index: mention?.index + 1,
        });
      }
    }
    if (event.key === 'ArrowDown') {
      console.log('Detect down is pressed');
      if (mentionData.length > mention?.index + 1) {
        setMentionSelect({
          user: mentionData[mention?.index + 1],
          index: mention?.index + 1,
        });
      }
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener(
      'keydown',
      (event: KeyboardEvent) => escFunction(event, mentionSelect),
      false,
    );
    return () => {
      window.removeEventListener(
        'keydown',
        (event: KeyboardEvent) => escFunction(event, mentionSelect),
        false,
      );
    };
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMouseOver = (user: User, index: number) => {
    setMentionSelect({
      user,
      index,
    });
  };

  const onClickInvite = () => {
    handleClose();
    setInviteModal(true);
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
          bgcolor={LightBG}
          margin="5px"
          style={{
            filter:
              'drop-shadow(0px 3px 5px rgba(39, 50, 64, 0.2)) drop-shadow(0px 0px 1px rgba(39, 50, 64, 0.3))',
            border: '1px solid #273240',
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
          {mentionData.map((item: User, index: number) => {
            const isSelect = item.id === mentionSelect?.user?.id;
            const bgColor = isSelect ? Highlight : 'transparent';
            const contentColor = isSelect ? Gray[1] : Gray[3];
            return (
              <Button
                type="button"
                key={item.id}
                onMouseOver={() => onMouseOver(item, index)}
                onClick={() => onSelectUser(item)}
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
            onClick={onClickInvite}
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
