import React, { useCallback, useRef, useState } from 'react';
import { CommentFormModel } from '@main/types';
import { Transaction } from '@main/entity';
import CommentBox from '@main/molecules/CommentBox';
import CommentItem from '@main/molecules/CommentItem';
import CommentRemaining from '@main/atoms/CommentRemaining';
import { useComment, useMention } from '@main/hooks';
import { GetUploadTokenBody, Pagination, UploadTypes } from '@api/types';
import ConfirmModal from '@main/atoms/ConfirmModal';
import { ReactComponent as ExclamationCircle } from '@assets/icons/solid/exclamation-circle.svg';
import { Gray, LightBG } from '@theme/colors';
import TransactionNotifyBanner from '@main/atoms/TransactionNotifyBanner';
import PopoverMenu from '@main/atoms/PopoverMenu';
import PopoverMenuItem from '@main/atoms/PopoverMenuItem';
import FeedBackModal from '@main/molecules/FeelBackModal';
import AttachmentModal from '@main/molecules/CommentAttachmentModal';
import { SubmitHandler } from 'react-hook-form';
import { EditorState } from 'draft-js';
import { commentEditorRawParser } from '@main/utils';
// Tailwind components
import { Menu } from '@headlessui/react';
import { ReactComponent as MoreVerticalIcon } from '@assets/icons/outline/more-vertical.svg';
import { formatCurrency, formatDate } from '@common/utils';
import DepartmentColorSection from '@main/atoms/DepartmentColorSection';

const INITIAL_COMMENT_NUMBER = 2;
const LOAD_MORE_LIMIT = 5;

export interface TransactionItemProps {
  transaction: Transaction;
  onClickDepartment?: (department?: number) => void;
  onClickVendor?: (vendor?: number) => void;
  onClickCategory?: (category?: number) => void;
}

interface ConfirmModalProps {
  title: string;
  description: string;
  confirmAction: () => void;
  confirmLabel: string;
}

const TransactionCard: React.VFC<TransactionItemProps> = ({
  transaction,
  onClickDepartment,
  onClickVendor,
  onClickCategory,
}) => {
  // Recoil states
  // Refs
  const containerRef = useRef<HTMLLIElement>(null);
  // Local states
  const [filter, setFilter] = useState<Pagination>({ offset: 0, limit: INITIAL_COMMENT_NUMBER });
  const { comments, total, isLoading, addComment } = useComment(transaction, filter);
  const { mentions } = useMention();
  const [confirmModal, setConfirmModal] = useState<ConfirmModalProps>();
  const [isHidden, setHidden] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState('');
  const [isOpenFeedbackModal, openFeedbackModal] = useState(false);
  const [attachFileComment, setAttachFileComment] = useState<File | null>(null);
  const [uploadFileOptions, setUploadFileOptions] = useState<GetUploadTokenBody>();
  // Variables
  const hasComment = !!total;
  const hiddenCommentCount = total - comments.length;

  const onSubmitComment: SubmitHandler<CommentFormModel> = (values) => {
    const contentState = values?.content as EditorState;
    const isDirty = contentState.getCurrentContent().hasText() || !!values?.attachment;
    if (!isDirty) return;
    const parsedContent = commentEditorRawParser(contentState.getCurrentContent());
    addComment({ content: parsedContent, attachment: values.attachment }).then();
  };

  const loadMoreComments = useCallback(() => {
    if (isLoading) return;
    setFilter((prevFilter) => ({
      limit: LOAD_MORE_LIMIT,
      offset: prevFilter.offset + prevFilter.limit,
    }));
  }, [isLoading]);

  const handleHideCategory = () => {
    setConfirmModal(undefined);
    setHidden(true);
    setNotifyMessage('You have hidden this transaction');
  };

  const openHideCategoryConfirmation = () => {
    setConfirmModal({
      title: 'Hide this from the entire company?',
      description:
        'Only you will be able to see this category. Other teammates will not be able to see this.',
      confirmAction: handleHideCategory,
      confirmLabel: 'Hide',
    });
  };

  const handleUnhideCategory = () => {
    setConfirmModal(undefined);
    setHidden(false);
    setNotifyMessage('You have unhidden this transaction');
  };

  const openUnhideCategoryConfirmation = () => {
    setConfirmModal({
      title: 'Unhide this transaction??',
      description: 'This will unhide the item and it will be visible to the entire company.',
      confirmAction: handleUnhideCategory,
      confirmLabel: 'Unhide',
    });
  };

  const handleShareFeedback = () => {
    openFeedbackModal(true);
  };

  const handleAttachFile = (file: File) => {
    setUploadFileOptions({
      filename: `${transaction.id}-${Date.now()}-${file.name}`,
      contentType: file.type,
      uploadType: UploadTypes.Attachments,
    });
    setAttachFileComment(file);
  };

  return (
    <>
      <TransactionNotifyBanner message={notifyMessage} container={containerRef.current} />
      <li ref={containerRef} key={transaction.id} className="bg-white filter drop-shadow-md">
        <article className="flex" aria-labelledby={`question-title-${transaction.id}`}>
          <DepartmentColorSection department={transaction.department.parent} />
          <div className="flex-grow w-4/5 p-5 border">
            <div className="flex items-center space-x-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-Gray-6">
                  <button
                    type="button"
                    className="hover:underline"
                    onClick={() => {
                      return onClickDepartment && onClickDepartment(transaction.department.id);
                    }}
                  >
                    {transaction.department.name}
                  </button>
                </p>
              </div>
              <div className="flex-shrink-0 self-center flex items-center">
                <h2
                  id={`question-title-${transaction.id}`}
                  className="text-base font-semibold text-Gray-2 mr-3"
                >
                  {`$ ${formatCurrency(transaction.amount)}`}
                </h2>
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                      <span className="sr-only">Open options</span>
                      <MoreVerticalIcon aria-hidden="true" viewBox="0 0 15 15" />
                    </Menu.Button>
                  </div>
                  <PopoverMenu>
                    {isHidden ? (
                      <PopoverMenuItem
                        value="unhide-category"
                        label="Unhide Category"
                        onClick={openUnhideCategoryConfirmation}
                      />
                    ) : (
                      <PopoverMenuItem
                        value="hide-category"
                        label="Hide Category"
                        onClick={openHideCategoryConfirmation}
                      />
                    )}
                    <PopoverMenuItem
                      value="share-feedback"
                      label="Share Feedback"
                      onClick={handleShareFeedback}
                    />
                  </PopoverMenu>
                </Menu>
              </div>
            </div>
            <h2
              id={`question-title-${transaction.id}`}
              className="mt-3 text-base font-semibold text-Gray-2"
            >
              <button
                type="button"
                className="hover:underline"
                onClick={() => onClickCategory && onClickCategory(transaction.category.id)}
              >
                {transaction.category.name}
              </button>
            </h2>
            <p className="text-xs text-Gray-6">
              <button
                type="button"
                className="hover:underline"
                onClick={() => onClickVendor && onClickVendor(transaction.vendor.id)}
              >
                {transaction.vendor.name}
              </button>
              {' • '}
              <time dateTime={transaction.transDate}>{formatDate(transaction.transDate)}</time>
            </p>
            <div className="mt-9 space-y-4">
              {hiddenCommentCount > 0 && (
                <CommentRemaining
                  hiddenCount={hiddenCommentCount}
                  onClick={loadMoreComments}
                  loading={isLoading}
                />
              )}
              {hasComment && (
                <ul>
                  {comments?.map((comment) => (
                    <li key={comment.id}>
                      <CommentItem
                        style={{ backgroundColor: isHidden ? Gray[12] : LightBG }}
                        comment={comment}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {!isHidden && (
              <CommentBox
                id={transaction.id.toString()}
                className="mt-6 mb-5"
                onSubmit={onSubmitComment}
                onAttachFile={handleAttachFile}
                mentionData={mentions}
              />
            )}
          </div>
        </article>
      </li>

      <ConfirmModal
        open={!!confirmModal}
        icon={ExclamationCircle}
        title={confirmModal?.title || ''}
        okLabel={confirmModal?.confirmLabel}
        onCancel={() => setConfirmModal(undefined)}
        onOk={confirmModal?.confirmAction}
      >
        <p id="modal-modal-description" className="text-Gray-6 text-sm">
          {confirmModal?.description}
        </p>
      </ConfirmModal>
      <FeedBackModal
        open={isOpenFeedbackModal}
        onClose={() => openFeedbackModal(false)}
        transactionId={transaction.id}
      />
      <AttachmentModal
        transaction={transaction}
        open={!!attachFileComment}
        file={attachFileComment}
        mentionData={mentions}
        uploadOptions={uploadFileOptions}
        onClose={() => setAttachFileComment(null)}
        onFileUploaded={onSubmitComment}
      />
    </>
  );
};

export default React.memo(TransactionCard);
