import * as React from 'react';
import { styled } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
// import Modal from '@mui/material/Modal';

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

export type UploadCSVModalProps = {
  style?: React.CSSProperties;
  open?: boolean;
};

const UploadCSVModal: React.FC<UploadCSVModalProps> = ({ style, open = false }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  // const handleOpen = () => setIsOpen(true);
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
      <div
        style={{
          display: 'flex',
          width: 500,
          height: 423,
          borderRadius: '24px',
          backgroundColor: 'white',
          borderWidth: 0,
          outline: 'none',
          padding: 24,
        }}
      />
    </StyledModal>
  );
};

export default UploadCSVModal;
