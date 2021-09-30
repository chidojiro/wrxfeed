import * as React from 'react';
import { styled } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import { useRecoilState } from 'recoil';
import { Stack, Typography } from '@mui/material';
import { Gray } from '@theme/colors';
import { showInviteModalState } from './states';

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
        <Stack padding="44px" paddingX="40px" alignItems="center">
          <Typography color={Gray[1]} fontWeight="bold" fontSize="24px">
            Invite collaborators
          </Typography>
          <Typography color={Gray[2]} marginTop="6px" fontSize="14px">
            Collaborators will get an email that gives them access to the workspace.
          </Typography>
        </Stack>
      </Stack>
    </StyledModal>
  );
};

export default InviteModal;
