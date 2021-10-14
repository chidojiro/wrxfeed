import React, { useRef } from 'react';
import { styled } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import { Button, LinearProgress, Stack, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { Gray } from '@theme/colors';
import CommentBox from '@main/molecules/CommentBox';
import { useFileUploader } from '@common/hooks/useFileUploader';
import { GetUploadTokenBody } from '@api/types';
import { Transaction } from '@main/entity';
import CircleAvatar from '@main/atoms/CircleAvatar';
import ImageFilePreview from '@main/atoms/ImageFilePreview';
import { CommentFormModel } from '@main/types';
import { EditorState } from 'draft-js';
import { MentionData } from '@draft-js-plugins/mention';

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
  transaction?: Transaction;
  open: boolean;
  file: File | null;
  mentionData: MentionData[];
  uploadOptions?: GetUploadTokenBody;
  onFileUploaded: (data: CommentFormModel) => void;
  onClose: () => void;
};

const CommentAttachmentModal: React.VFC<AttachmentModalProps> = ({
  style,
  transaction,
  open,
  file,
  mentionData,
  uploadOptions,
  onFileUploaded,
  onClose,
}) => {
  const commentContent = useRef<EditorState>();
  const onUploadSuccess = (url: string) => {
    onFileUploaded({
      attachment: url,
      content: commentContent.current || EditorState.createEmpty(),
    });
    onClose();
  };
  const { isUploading, uploadFile } = useFileUploader({
    onSuccess: onUploadSuccess,
  });

  const handleFileUpload = () => {
    if (file) {
      uploadFile(file, uploadOptions);
    }
  };

  const onChangeComment = (content?: EditorState) => {
    commentContent.current = content;
  };
  return (
    <StyledModal
      open={open}
      onClose={onClose}
      keepMounted={false}
      BackdropComponent={Backdrop}
      disableEscapeKeyDown
      style={style}
    >
      <Stack
        sx={{
          display: 'flex',
          width: '500px',
          height: 'auto',
          borderRadius: '24px',
          backgroundColor: 'white',
          borderWidth: '0px',
          outline: 'none',
        }}
      >
        <ImageFilePreview file={file} width={144} height={90} />
        <Stack paddingX="24px" marginTop="14px">
          <Typography color={Gray[1]} fontWeight="bold" fontSize="18px">
            {file?.name || '<unknown filename>'}
          </Typography>
          <Typography color={Gray[2]} marginTop="2px" fontSize="14px">
            <Stack direction="row">
              Upload to
              <CircleAvatar
                size={20}
                sx={{ ml: 0.5, mr: 0.5 }}
                typographyProps={{ variant: 'h6', lineHeight: '0.875rem' }}
                name={transaction.department.name}
                initialLength={1}
              />
              <span style={{ fontWeight: 600 }}>{transaction.category.name ?? ''}</span>
            </Stack>
          </Typography>
        </Stack>
        <Stack flex={1} padding="24px">
          <Typography color={Gray[1]} fontWeight="bold" fontSize="14px" marginBottom="8px">
            Add a comment
          </Typography>
          <CommentBox
            id={transaction?.id.toString()}
            showAttach={false}
            showSend={false}
            mentionData={mentionData}
            onChange={onChangeComment}
          />
        </Stack>
        {isUploading && <LinearProgress />}
        <Divider />
        <Stack
          paddingX="24px"
          paddingY="16px"
          height="66px"
          justifyContent="flex-end"
          direction="row"
        >
          <Button
            disabled={isUploading}
            variant="text"
            sx={{ borderRadius: '4px' }}
            onClick={onClose}
          >
            <Typography fontSize="14px" fontWeight={600} color={Gray[2]}>
              Cancel
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="accent"
            sx={{ borderRadius: '4px', marginLeft: '4px' }}
            disabled={isUploading}
            onClick={handleFileUpload}
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

export default React.memo(CommentAttachmentModal);
