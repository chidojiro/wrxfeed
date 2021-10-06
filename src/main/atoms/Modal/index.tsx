import React from 'react';
import { styled } from '@mui/system';
import { ModalUnstyled, Box } from '@mui/material';

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

interface ModalProps {
  open: boolean;
  customStyle?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> = ({ open, customStyle, children }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleClose = () => setIsOpen(false);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <StyledModal
      keepMounted={false}
      open={isOpen}
      BackdropComponent={Backdrop}
      onBackdropClick={handleClose}
      style={customStyle}
    >
      <Box>{children}</Box>
    </StyledModal>
  );
};

Modal.defaultProps = {
  customStyle: {},
};

export default Modal;
