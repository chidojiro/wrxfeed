import * as React from 'react';
import { styled } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import { useRecoilState } from 'recoil';
import { Stack, Typography, Button } from '@mui/material';
import { Gray, Highlight } from '@theme/colors';
import SearchBox from '@main/molecules/SearchBox';
import { User } from '@main/entity/user.entity';
// import CommentBox from '@main/molecules/CommentBox';
import { showInviteModalState } from './states';
import { inviteUsers } from './dummy';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export type InviteModalProps = {
  style?: React.CSSProperties;
  open?: boolean;
};

const InviteModal: React.FC<InviteModalProps> = ({ style, open = false }) => {
  const [isOpen, setIsOpen] = useRecoilState(showInviteModalState);
  const handleClose = () => setIsOpen(false);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <StyledModal
      open={isOpen}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      onBackdropClick={handleClose}
      style={style}
    >
      <Stack
        style={{
          display: 'flex',
          width: '620px',
          height: '630px',
          borderRadius: '24px',
          backgroundColor: 'white',
          borderWidth: '0px',
          outline: 'none',
        }}
      >
        <Stack paddingTop="44px" paddingX="40px" alignItems="center">
          <Typography color={Gray[1]} fontWeight="bold" fontSize="24px">
            Invite collaborators
          </Typography>
          <Typography color={Gray[2]} marginTop="6px" fontSize="14px">
            Collaborators will get an email that gives them access to the workspace.
          </Typography>
        </Stack>
        <Stack flex={1}>
          <Stack width="430px" height="56px" alignSelf="center" paddingY="30px">
            <SearchBox onSubmit={() => undefined} />
          </Stack>
          <Stack marginTop="30px" alignItems="center">
            {inviteUsers.map((item: User) => {
              const userFullName = `${item.firstName} ${item.lastName}`;
              return (
                <Stack
                  key={item.id}
                  direction="row"
                  justifyContent="space-between"
                  marginTop="32px"
                  width="403px"
                >
                  <Stack>
                    <Typography color={Gray[2]} fontSize="14px" lineHeight="17px" fontWeight={600}>
                      {userFullName}
                    </Typography>
                    <Typography color={Gray[3]} fontSize="14px" lineHeight="20px">
                      {item.email}
                    </Typography>
                  </Stack>
                  <Button
                    style={{
                      backgroundColor: Highlight,
                      padding: '8px 20px 8px 20px',
                      borderRadius: '100px',
                      marginTop: '5px',
                    }}
                  >
                    <Typography
                      color={Gray[1]}
                      fontSize="14px"
                      lineHeight="17px"
                      fontWeight={600}
                      style={{ textTransform: 'capitalize' }}
                    >
                      Send Invite
                    </Typography>
                  </Button>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Stack>
    </StyledModal>
  );
};

export default InviteModal;
