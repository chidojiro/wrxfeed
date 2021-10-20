import Modal from '@common/atoms/Modal';
import { Divider, LinearProgress } from '@mui/material';
import React from 'react';
import CommentBox from '@main/molecules/CommentBox';
import { useFeedBack } from '@main/hooks';
import { toast } from 'react-toastify';
import { EditorState } from 'draft-js';
import { classNames, commentEditorRawParser } from '@main/utils';

interface FeelBackModalProps {
  open: boolean;
  onClose: () => void;
  transactionId: number;
}

const MAX_LENGTH_FEEDBACK = 200;

const FeelBackModal: React.VFC<FeelBackModalProps> = ({ open, onClose, transactionId }) => {
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
      <p className="mt-2 text-sm text-right text-Gray-4">
        {feedback.length !== 0 && (
          <span className={isMax ? 'text-system-alert' : 'text-Gray-4'}>{feedback.length}</span>
        )}
        {maxLengthText}
      </p>
    );
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <div className="sm:max-w-[442px]">
        <div className="px-10 pb-10">
          <p className="text-2xl text-Gray-1 font-bold mt-8">
            {'We’re working on\n improvements!'}
          </p>
          <p className="mt-3 text-Gray-1 text-sm">
            The Gravity team is always trying our best to improve our product and your feedback can
            help us do that.
          </p>
          <CommentBox
            placeholder="Your feedback here…"
            style={{ backgroundColor: 'white', marginTop: '32px' }}
            // onSubmit={({ content }) => console.log({ content })}
            showAttach={false}
            showEmoji={false}
            showSend={false}
            alwaysFocus
            onChange={onChangeTextContent}
          />
          {renderMaxCharacters()}
        </div>
        {isLoading && <LinearProgress />}
        <Divider />
        <div className="flex justify-end h-[66px] px-6 py-4">
          <button
            type="button"
            disabled={isLoading}
            className="rounded text-sm font-bold text-Gray-2 px-5"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className={classNames(
              'rounded text-sm font-bold text-white ml-2 px-5',
              isSendable ? 'bg-purple-5' : 'bg-Gray-4',
            )}
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FeelBackModal;
