import LinearProgress from '@/common/atoms/LinearProgress';
import Modal from '@/common/atoms/Modal';
import { Button } from '@/common/components';
import { useFeedBack } from '@/main/hooks';
import { FeedBackType } from '@/main/types';
import { commentEditorRawParser } from '@/main/utils';
import clsx from 'clsx';
import { EditorState } from 'draft-js';
import React from 'react';
import { toast } from 'react-toastify';
import { CommentBox } from '../CommentBox';

type FeedBackModalProps = {
  open: boolean;
  onClose: () => void;
  itemId: number;
  enableMaxChar?: boolean;
  maxChar?: number;
  type?: FeedBackType;
};

export const FeedBackModal = ({
  open,
  onClose,
  itemId,
  enableMaxChar = false,
  maxChar = 20000,
  type = FeedBackType.Rollup,
}: FeedBackModalProps) => {
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
    postFeedback(type, itemId, { content: feedback });
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
            Please describe the specific issue with this item.
          </p>
          <p className="mt-3 text-Gray-1 text-sm">
            Ex: Data is mapped to wrong category, transaction is not for this team
          </p>
          <CommentBox
            placeholder="Your feedback here…"
            style={{ backgroundColor: 'white', marginTop: '32px' }}
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
          <Button
            disabled={isLoading}
            className="rounded text-sm font-bold text-Gray-2 px-5"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className={clsx(
              'rounded text-sm font-bold text-white ml-2 px-5',
              isSendable ? 'bg-purple-5' : 'bg-Gray-4',
            )}
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};
