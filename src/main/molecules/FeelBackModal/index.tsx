import { Modal } from '@main/atoms';
import { Stack, Typography, Divider, Button, LinearProgress } from '@mui/material';
import { Gray, Accent } from '@theme/colors';
import React from 'react';
import CommentBox from '@main/molecules/CommentBox';
import { useFeedBack } from '@main/hooks';
import { toast } from 'react-toastify';
import { EditorState } from 'draft-js';
import { commentEditorRawParser } from '@main/utils';

interface FeelBackModalProps {
  style?: React.CSSProperties;
  open: boolean;
  onClose: () => void;
  transactionId: number;
}

const RED_COLOR = '#ff5f68';
const MAX_LENGTH_FEEDBACK = 200;

const FeelBackModal: React.VFC<FeelBackModalProps> = ({ style, open, onClose, transactionId }) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [feedback, setFeedback] = React.useState<string>('');
  const onUploadSuccess = () => {
    onClose();
  };

  const { isLoading, postFeedback } = useFeedBack({ onSuccess: onUploadSuccess });
  const isSendable = feedback.length > 0 && feedback.length <= MAX_LENGTH_FEEDBACK;

  React.useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit = () => {
    if (!isSendable) {
      toast.error('Exceeded the maximum word count for a feedback!');
      return;
    }
    postFeedback(transactionId, { content: feedback });
  };

  const isMax = feedback.length > MAX_LENGTH_FEEDBACK;
  const maxLengthText =
    feedback.length === 0
      ? `max ${MAX_LENGTH_FEEDBACK} characters`
      : `/${MAX_LENGTH_FEEDBACK} characters`;

  const onChangeTextContent = (content?: EditorState): void => {
    if (!content) return;
    const rawText = commentEditorRawParser(content.getCurrentContent());
    setFeedback(rawText);
  };

  const renderMaxCharacters = () => {
    return (
      <Stack flexDirection="row" marginLeft="auto">
        {feedback.length !== 0 && (
          <Typography
            marginTop="8px"
            marginLeft="auto"
            color={isMax ? RED_COLOR : Gray[3]}
            fontSize="14px"
            marginX="0px"
          >
            {feedback.length}
          </Typography>
        )}
        <Typography marginTop="8px" color={Gray[3]} fontSize="14px" marginX="0px">
          {maxLengthText}
        </Typography>
      </Stack>
    );
  };

  return (
    <Modal open={isOpen} customStyle={style} onClose={handleClose}>
      <Stack width="442px" height="488px" borderRadius="24px" bgcolor="white">
        <Stack paddingX="40px" flex={1}>
          <Typography fontSize="24px" color={Gray[1]} marginTop="44px" fontWeight="bold">
            {'We’re working on\n improvements!'}
          </Typography>
          <Typography marginTop="12px" color={Gray[1]} fontSize="14px" fontWeight="normal">
            The Wrxfeed team is always trying our best to improve our product and your feedback can
            help us do that.
          </Typography>
          <CommentBox
            placeholder="Your feedback here…"
            style={{ backgroundColor: 'white', marginTop: '32px' }}
            onSubmit={({ content }) => console.log({ content })}
            showAttach={false}
            showEmoji={false}
            showSend={false}
            alwaysFocus
            onChange={onChangeTextContent}
          />
          {renderMaxCharacters()}
        </Stack>
        {isLoading && <LinearProgress />}
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
            style={{
              backgroundColor: isSendable ? Accent[2] : Gray[3],
              borderRadius: '4px',
              marginLeft: '4px',
              padding: '8px 16px 8px 16px',
            }}
            onClick={handleSubmit}
          >
            <Typography fontSize="14px" fontWeight={600}>
              Submit
            </Typography>
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default FeelBackModal;
