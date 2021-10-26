import Modal from '@common/atoms/Modal';
import React from 'react';
import CommentBox from '@main/molecules/CommentBox';
import { useFeedBack } from '@main/hooks';
import { toast } from 'react-toastify';
import { EditorState } from 'draft-js';
import { classNames, commentEditorRawParser } from '@main/utils';
import LinearProgress from '@common/atoms/LinearProgress';

interface FeelBackModalProps {
  open: boolean;
  onClose: () => void;
  transactionId: number;
  enableMaxChar?: boolean;
  maxChar?: number;
}

const FeelBackModal: React.VFC<FeelBackModalProps> = ({
  open,
  onClose,
  transactionId,
  enableMaxChar = false,
  maxChar = 20000,
}) => {
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [feedback, setFeedback] = React.useState<string>('');
  const onUploadSuccess = () => {
    onClose();
  };

  const { isLoading, postFeedback } = useFeedBack({ onSuccess: onUploadSuccess });
  const isSendable = feedback.length > 0 && feedback.length <= maxChar;

  React.useEffect(() => {
    setOpen(open);
  }, [open]);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit = () => {
    if (feedback.length === 0) return;
    if (!isSendable) {
      toast.error('Invalid feedback content!');
      return;
    }
    postFeedback(transactionId, { content: feedback });
  };

  const onChangeTextContent = (content?: EditorState): void => {
    if (!content) return;
    const rawText = commentEditorRawParser(content.getCurrentContent());
    setFeedback(rawText);
  };

  const renderMaxCharacters = () => {
    if (!enableMaxChar) return null;
    const isMax = feedback.length > maxChar;
    const maxLengthText =
      feedback.length === 0 ? `max ${maxChar} characters` : `/${maxChar} characters`;
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
        <hr className="divider divider-horizontal" />
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
