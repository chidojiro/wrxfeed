import React, { useRef, useState } from 'react';
import { CommentFormModel } from '@main/types';
import { Category, Department, Transaction, Vendor, Visibility } from '@main/entity';
import { useComment, useMention } from '@main/hooks';
import { GetUploadTokenBody, Pagination, UploadTypes } from '@api/types';
import { SubmitHandler } from 'react-hook-form';
import { EditorState } from 'draft-js';
import { commentEditorRawParser } from '@main/utils';
import { classNames, formatCurrency, formatDate } from '@common/utils';
// Tailwind components
import { Menu } from '@headlessui/react';
import DepartmentColorSection from '@main/atoms/DepartmentColorSection';
import NotifyBanner from '@common/molecules/NotifyBanner';
import CommentBox from '@main/molecules/CommentBox';
import CommentItem from '@main/molecules/CommentItem';
import CommentRemaining from '@main/atoms/CommentRemaining';
import PopoverMenu from '@main/atoms/PopoverMenu';
import PopoverMenuItem from '@main/atoms/PopoverMenuItem';
import FeedBackModal from '@main/organisms/FeelBackModal';
import AttachmentModal from '@main/organisms/CommentAttachmentModal';
import ConfirmModal from '@main/atoms/ConfirmModal';
// Icons
import { ReactComponent as ExclamationCircle } from '@assets/icons/solid/exclamation-circle.svg';
import { ReactComponent as MoreVerticalIcon } from '@assets/icons/outline/more-vertical.svg';
import { ReactComponent as EyeHideIcon } from '@assets/icons/outline/eye-hide.svg';
import { usePermission } from '@identity/hooks';
import { ProtectedFeatures } from '@identity/constants';

const INITIAL_COMMENT_NUMBER = 2;
const LOAD_MORE_LIMIT = 5;

export interface TransactionCardProps {
  transaction: Transaction;
  onClickDepartment?: (department?: Department) => void;
  onClickVendor?: (vendor?: Vendor) => void;
  onClickCategory?: (category?: Category) => void;
  onClickRootDept?: (rootDept?: Department) => void;
  updateCategory?: (category: Partial<Category>) => Promise<void>;
}

interface ConfirmModalProps {
  title: string;
  description: string;
  confirmAction: () => void;
  confirmLabel: string;
}

const TransactionCard: React.VFC<TransactionCardProps> = ({
  transaction,
  onClickDepartment,
  onClickVendor,
  onClickCategory,
  onClickRootDept,
  updateCategory,
}) => {
  // Recoil states
  // Refs
  const containerRef = useRef<HTMLLIElement>(null);
  // Local states
  const [filter, setFilter] = useState<Pagination>({ offset: 0, limit: INITIAL_COMMENT_NUMBER });
  const [confirmModal, setConfirmModal] = useState<ConfirmModalProps>();
  const [isOpenFeedbackModal, openFeedbackModal] = useState(false);
  const [attachFileComment, setAttachFileComment] = useState<File | null>(null);
  const [uploadFileOptions, setUploadFileOptions] = useState<GetUploadTokenBody>();
  // Data hooks
  const { comments, total, isLoading, addComment, showLessComments } = useComment(
    transaction,
    filter,
  );
  const { mentions } = useMention();
  const { checkPermission } = usePermission();
  // Variables
  const hasComment = !!total;
  const hiddenCommentCount = total - comments.length;
  const canCollapseComments = total > INITIAL_COMMENT_NUMBER;
  const isHidden = transaction.category.visibility === Visibility.HIDDEN;
  const hideCategoryPermission = checkPermission(ProtectedFeatures.HideCategory);

  const onSubmitComment: SubmitHandler<CommentFormModel> = (values) => {
    const contentState = values?.content as EditorState;
    const isDirty = contentState.getCurrentContent().hasText() || !!values?.attachment;
    if (!isDirty) return;
    const parsedContent = commentEditorRawParser(contentState.getCurrentContent());
    addComment({ content: parsedContent, attachment: values.attachment }).then();
  };

  const loadMoreComments = () => {
    if (isLoading) return;
    if (hiddenCommentCount > 0) {
      // Load more
      setFilter((prevFilter) => ({
        limit: LOAD_MORE_LIMIT,
        offset: prevFilter.offset + prevFilter.limit,
      }));
    } else {
      // Show less
      showLessComments(INITIAL_COMMENT_NUMBER);
      setFilter({
        limit: INITIAL_COMMENT_NUMBER,
        offset: 0,
      });
    }
  };

  const handleHideCategory = async () => {
    setConfirmModal(undefined);
    if (updateCategory) {
      await updateCategory({ id: transaction.category.id, visibility: Visibility.HIDDEN });
    }
    NotifyBanner.info('You have hidden this transaction');
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

  const handleShowCategory = async () => {
    setConfirmModal(undefined);
    if (updateCategory) {
      await updateCategory({ id: transaction.category.id, visibility: Visibility.VISIBLE });
    }
    NotifyBanner.info('You have unhidden this transaction');
  };

  const openShowCategoryConfirmation = () => {
    setConfirmModal({
      title: 'Unhide this category?',
      description: 'This will unhide the category and it will be visible to the entire company.',
      confirmAction: handleShowCategory,
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

  const renderMenuItems = () => {
    const items = [];
    if (hideCategoryPermission) {
      items.push(
        isHidden ? (
          <PopoverMenuItem
            key="show-category"
            value="show-category"
            label="Show Category"
            onClick={openShowCategoryConfirmation}
          />
        ) : (
          <PopoverMenuItem
            key="hide-category"
            value="hide-category"
            label="Hide Category"
            onClick={openHideCategoryConfirmation}
          />
        ),
      );
    }
    items.push(
      <PopoverMenuItem
        key="share-feedback"
        value="share-feedback"
        label="Share Feedback"
        onClick={handleShareFeedback}
      />,
    );
    return items;
  };

  return (
    <>
      <li ref={containerRef} key={transaction.id} className="bg-white filter shadow-md">
        <article className="flex" aria-labelledby={`question-title-${transaction.id}`}>
          <DepartmentColorSection
            department={transaction.department.parent}
            onClick={onClickRootDept}
          />
          <div className={classNames(isHidden ? 'bg-purple-8' : 'bg-white', 'flex-grow w-4/5 p-5')}>
            <div className="flex items-center space-x-3">
              <div className="flex items-center min-w-0 flex-1">
                <p className="text-xs text-Gray-6">
                  <button
                    type="button"
                    className="hover:underline"
                    onClick={() => {
                      return onClickDepartment && onClickDepartment(transaction.department);
                    }}
                  >
                    {transaction.department.name}
                  </button>
                </p>
                {isHidden && (
                  <>
                    <EyeHideIcon
                      viewBox="-2 -2 19 19"
                      className="fill-current path-no-filled stroke-current path-no-stroke text-system-alert ml-3 mr-1"
                    />
                    <span className="text-xs text-Gray-6">Hidden</span>
                  </>
                )}
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
                  <PopoverMenu>{renderMenuItems()}</PopoverMenu>
                </Menu>
              </div>
            </div>
            <h2
              aria-hidden="true"
              id={`question-title-${transaction.id}`}
              className="mt-3 text-base font-semibold text-Gray-2 hover:underline"
              onClick={() => onClickCategory && onClickCategory(transaction.category)}
            >
              {transaction.category.name}
            </h2>
            <p className="mt-1 text-xs text-Gray-6">
              <button
                type="button"
                className="hover:underline"
                onClick={() => onClickVendor && onClickVendor(transaction.vendor)}
              >
                {transaction.vendor.name}
              </button>
              {' • '}
              <time dateTime={transaction.transDate}>{formatDate(transaction.transDate)}</time>
            </p>
            <div className="mt-9 space-y-4">
              {(hiddenCommentCount > 0 || canCollapseComments) && (
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
                        style={{
                          backgroundColor: isHidden ? '#F3F3F7' : 'rgba(192, 191, 223, 0.1)',
                        }}
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
        icon={<ExclamationCircle />}
        title={confirmModal?.title || ''}
        okLabel={confirmModal?.confirmLabel}
        onClose={() => setConfirmModal(undefined)}
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
