import React, { useEffect, useState } from 'react';
import { Stack, Typography, Button, Divider, PopoverProps } from '@mui/material';
import Popover from '@mui/material/Popover';
import { Gray, LightBG } from '@theme/colors';
import { User } from '@main/entity/user.entity';
import { showInviteModalState } from '@main/organisms/InviteModal/states';
import { useSetRecoilState } from 'recoil';
import { InviteIcon } from '@assets/index';

const MENTION_MODAL_MIN_WIDTH = 336;
const MENTION_MODAL_MAX_WIDTH = 300;

export interface MentionPopoverProps extends PopoverProps {
  inputElement: Element | null;
}

export type MentionSelect = {
  user: User;
  index: number;
};

const MentionPopover: React.FC<MentionPopoverProps> = ({ children, inputElement, ...rest }) => {
  const [modalWidth, setModalWidth] = useState<string>(`${MENTION_MODAL_MIN_WIDTH}px`);
  const setInviteModal = useSetRecoilState(showInviteModalState);

  useEffect(() => {
    if (
      !inputElement?.clientWidth ||
      inputElement?.clientWidth > MENTION_MODAL_MAX_WIDTH ||
      inputElement?.clientWidth < MENTION_MODAL_MIN_WIDTH
    ) {
      return;
    }
    const newWidth = `${inputElement.clientWidth}px`;
    setModalWidth(newWidth);
  }, [inputElement]);

  const onClickInvite = () => {
    setInviteModal(true);
  };

  return (
    <div style={{ backgroundColor: 'transparent' }}>
      <Popover
        PaperProps={{
          sx: { backgroundColor: 'transparent' },
        }}
        disableAutoFocus
        disableEnforceFocus
        anchorEl={inputElement}
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
        keepMounted={false}
        {...rest}
      >
        <Stack
          width={modalWidth}
          maxWidth="336p"
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
            <Typography fontSize="14px" color={Gray[3]}>
              Suggested users
            </Typography>
          </Stack>
          <Stack height="108px" overflow="scroll">
            {children}
          </Stack>
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
