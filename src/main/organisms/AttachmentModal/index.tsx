import * as React from 'react';
import { styled } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import { useRecoilState } from 'recoil';
import { Button, Stack, Typography, Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Gray, Accent } from '@theme/colors';
// import { ReactComponent as CsvIcon } from '@assets/icons/outline/csvIcon.svg';
import CommentBox from '@main/molecules/CommentBox';
import { AttachState, showAttachmentModalState } from './states';

export type FileAttachPreviewProps = {
  style?: React.CSSProperties;
  file: File | null;
};

const FileAttachPreview: React.FC<FileAttachPreviewProps> = ({ file }) => {
  const [previewSrc, setPreviewSrc] = React.useState<string>(
    'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png',
  );

  React.useEffect(() => {
    console.log('Check new file = ', file);
    if (!file) {
      console.log('Detect null file');
      return;
    }
    setPreviewSrc(URL.createObjectURL(file));
  }, [file?.name]);

  return (
    <Box style={{ marginTop: '24px', marginLeft: '24px', outline: 'none', borderWidth: '0px' }}>
      <img
        id="image_preview_upload"
        alt="alt_image_upload"
        src={previewSrc}
        style={{ width: '144px', height: '80px', borderRadius: '4px', objectFit: 'cover' }}
      />
    </Box>
  );
};

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

export type AttachmentModalProps = {
  style?: React.CSSProperties;
  open?: AttachState;
};

const AttachmentModal: React.FC<AttachmentModalProps> = ({ style }) => {
  const [attachState, setAttachState] = useRecoilState(showAttachmentModalState);
  const handleClose = () => setAttachState({ isShow: false, file: null });

  return (
    <StyledModal
      open={attachState.isShow}
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
        <FileAttachPreview file={attachState.file} />
        <Stack paddingX="24px" marginTop="14px">
          <Typography color={Gray[1]} fontWeight="bold" fontSize="18px">
            {attachState.file?.name || 'file-name.png'}
          </Typography>
          <Typography color={Gray[2]} marginTop="2px" fontSize="14px">
            Upload to Gusto Pay* Arrow
          </Typography>
        </Stack>
        <Stack flex={1} padding="24px">
          <Typography color={Gray[1]} fontWeight="bold" fontSize="14px" marginBottom="8px">
            Add a comment
          </Typography>
          <CommentBox onSubmit={() => undefined} showAttach={false} showSend={false} />
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
            style={{ backgroundColor: Accent[2], borderRadius: '4px', marginLeft: '4px' }}
            onClick={handleClose}
          >
            <Typography fontSize="14px" fontWeight={600}>
              Upload
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </StyledModal>
  );
};

export default AttachmentModal;
