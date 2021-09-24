import * as React from 'react';
import { styled } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import { useRecoilState } from 'recoil';
import { Button, Stack, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Gray } from '@theme/colors';
import { ReactComponent as CsvIcon } from '@assets/icons/outline/csvIcon.svg';
import { showUploadCSVModalState } from './states';

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
  const [isOpen, setIsOpen] = useRecoilState(showUploadCSVModalState);
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
          width: '500px',
          height: '423px',
          borderRadius: '24px',
          backgroundColor: 'white',
          borderWidth: '0px',
          outline: 'none',
        }}
      >
        <Stack padding="24px">
          <Typography color={Gray[1]} fontWeight="bold" fontSize="18px">
            Import from CSV file
          </Typography>
          <Typography color={Gray[3]} marginTop="2px" fontSize="14px">
            Maximum size: 50MB
          </Typography>
        </Stack>
        <Stack paddingX="24px" flex={1}>
          <Stack
            height="26px"
            minWidth="146px"
            bgcolor={Gray[1]}
            direction="row"
            paddingX="8px"
            alignItems="center"
            marginRight="auto"
            borderRadius="4px"
          >
            <CsvIcon style={{ width: '20px', height: '17px' }} />
            <Typography color="white" fontSize="14px" fontWeight={600} marginLeft="4px">
              Select a file .csv
            </Typography>
          </Stack>
          <Typography color={Gray[3]} marginTop="5px">
            No file chosen
          </Typography>
        </Stack>
        <Divider />
        <Stack
          paddingX="24px"
          paddingY="16px"
          height="66px"
          justifyContent="flex-end"
          direction="row"
        >
          <Button variant="text" style={{ borderRadius: '4px' }} onClick={handleClose}>
            <Typography fontSize="14px" fontWeight={600} color={Gray[2]}>
              Cancel
            </Typography>
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: Gray[3], borderRadius: '4px', marginLeft: '4px' }}
            onClick={handleClose}
          >
            <Typography fontSize="14px" fontWeight={600}>
              Upload file
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </StyledModal>
  );
};

export default UploadCSVModal;
