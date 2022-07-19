import { GetUploadTokenBody, UploadTypes } from '@/api/types';
// assets
import { ExclamationCircle, EyeHideIcon, MoreVerticalIcon } from '@/assets';
// components
import NotifyBanner from '@/common/molecules/NotifyBanner';
import clsx from 'clsx';
import { ProtectedFeatures } from '@/identity/constants';
// hooks
import { useIdentity, usePermission } from '@/identity/hooks';
import CommentViewAll from '@/main/atoms/CommentViewAll';
import ConfirmModal from '@/main/atoms/ConfirmModal';
import PopoverMenu from '@/main/atoms/PopoverMenu';
import PopoverMenuItem from '@/main/atoms/PopoverMenuItem';
// constants
import { Category, Department, FeedItem, Visibility } from '@/main/entity';
import { useMention } from '@/main/hooks';
import { useFeedComment } from '@/main/hooks/feedComment.hook';
import CommentBox from '@/main/molecules/CommentBox';
import CommentItem from '@/main/molecules/CommentItem';
import RollupTransactions from '@/main/molecules/RollupTransactions';
import AttachmentModal from '@/main/organisms/CommentAttachmentModal';
import FeedBackModal from '@/main/organisms/FeedBackModal';
import { CommentFormModel } from '@/main/types';
import {
  commentEditorHtmlParser,
  decimalLogic,
  DecimalType,
  getColorByText,
  getTotalFeedItem,
} from '@/main/utils';
import { PaginationParams } from '@/rest/types';
import { Menu } from '@headlessui/react';
import dayjs from 'dayjs';
import { EditorState } from 'draft-js';
import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Vendor } from '@/vendor/types';

export interface RollupCardProps {
  feedItem: FeedItem;
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

const INITIAL_COMMENT_NUMBER = 2;
const LIMIT_GET_COMMENT = 20;

const RollupCard: React.FC<RollupCardProps> = ({
  feedItem,
  onClickDepartment,
  onClickCategory,
  updateCategory,
}) => {
  const identity = useIdentity();
  const [filterComment, setFilterComment] = React.useState<PaginationParams>({
    offset: 0,
    limit: INITIAL_COMMENT_NUMBER,
  });

  const { total } = getTotalFeedItem(feedItem);
  // Refs
  const containerRef = React.useRef<HTMLLIElement>(null);
  // Local states
  const [confirmModal, setConfirmModal] = React.useState<ConfirmModalProps>();
  const [isOpenFeedbackModal, openFeedbackModal] = React.useState(false);
  const [attachFileComment, setAttachFileComment] = React.useState<File | null>(null);
  const [uploadFileOptions, setUploadFileOptions] = React.useState<GetUploadTokenBody>();
  // Data hooks
  const { mentions } = useMention();
  const { checkPermission } = usePermission();
  // Variables
  const isHidden =
    feedItem?.category !== null && feedItem?.category?.visibility === Visibility.HIDDEN;
  const hideCategoryPermission = checkPermission(ProtectedFeatures.HideCategory);

  const {
    comments,
    isLoading: isLoadingComments,
    deleteComment,
    editComment,
    addComment,
    hasMore: hasMoreComment,
  } = useFeedComment(feedItem, filterComment);

  const hasComment = comments?.length > 0;

  const onSubmitComment: SubmitHandler<CommentFormModel> = (values) => {
    const contentState = values?.content as EditorState;
    const isDirty = contentState.getCurrentContent().hasText() || !!values?.attachment;
    if (!isDirty) return;
    const parsedContent = commentEditorHtmlParser(contentState.getCurrentContent());
    addComment({
      content: parsedContent,
      attachment: values.attachment,
    }).then();
  };

  const loadAllComments = () => {
    if (isLoadingComments || !hasMoreComment) return;
    setFilterComment({
      limit: LIMIT_GET_COMMENT,
      offset: comments?.length ?? 0,
    });
  };

  const handleHideCategory = async () => {
    setConfirmModal(undefined);
    if (updateCategory) {
      await updateCategory({ id: feedItem?.category?.id, visibility: Visibility.HIDDEN });
    }
    NotifyBanner.info('You have hidden this line item!');
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
      await updateCategory({ id: feedItem?.category?.id, visibility: Visibility.VISIBLE });
    }
    NotifyBanner.info('You have unhidden this line item!');
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
      filename: `${feedItem?.id}-${Date.now()}-${file.name}`,
      contentType: file.type,
      uploadType: UploadTypes.Attachments,
    });
    setAttachFileComment(file);
  };

  const handleCopyFeedLink = () => {
    navigator.clipboard.writeText(`${window.location.host}/feed/${feedItem?.id}`);
    toast.success('Feed link has been copied');
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
        key="issue-with-this-item"
        value="issue-with-this-item"
        label="Issue With This Item"
        onClick={handleShareFeedback}
      />,
      <PopoverMenuItem
        key="copy-feed-link"
        value="copy-feed-link"
        label="Copy Link"
        onClick={handleCopyFeedLink}
      />,
    );
    return items;
  };

  const catName = feedItem?.category?.name ?? 'unknown';
  const itemGradientBg = React.useMemo(
    () => getColorByText(catName ?? '', undefined, true),
    [catName],
  );

  return (
    <>
      <article
        ref={containerRef}
        key={feedItem?.id}
        className="bg-white flex flex-col filter shadow-md rounded-card overflow-hidden"
        aria-labelledby={`rollup-title-${feedItem?.id}`}
      >
        <div className="flex flex-row">
          <div
            className={clsx(
              isHidden ? 'bg-purple-8' : 'bg-white',
              'flex-grow w-4/5 px-6 py-5 border-b border-Gray-11',
            )}
            style={{
              background: itemGradientBg,
            }}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center min-w-0 flex-1 ">
                <p className="text-base text-white">
                  <button
                    type="button"
                    className="hover:underline text-left font-bold"
                    onClick={() => onClickCategory && onClickCategory(feedItem?.category)}
                  >
                    {feedItem?.category?.name}
                  </button>
                </p>
                {isHidden && (
                  <div className="flex flex-row items-center bg-Gray-3-50 py-0.5 px-2 ml-2 rounded-full">
                    <EyeHideIcon
                      viewBox="-2 -2 19 19"
                      className="fill-current path-no-filled stroke-current path-no-stroke text-system-alert mr-1"
                    />
                    <span className="text-xs font-medium text-white px-1">Hidden</span>
                  </div>
                )}
              </div>
              <div className="flex-shrink-0 self-center flex items-center">
                <h2
                  id={`question-title-${feedItem?.id}`}
                  className="text-lg font-semibold text-white mr-3"
                >
                  {`${decimalLogic(total, DecimalType.SummedNumbers, '$')}`}
                </h2>
                <Menu as="div" className="relative inline-block z-20 text-left">
                  <div>
                    <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                      <span className="sr-only">Open options</span>
                      <MoreVerticalIcon
                        className="fill-current text-white path-no-filled"
                        aria-hidden="true"
                        viewBox="0 0 15 15"
                      />
                    </Menu.Button>
                  </div>
                  <PopoverMenu>{renderMenuItems()}</PopoverMenu>
                </Menu>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between mt-1 text-xs font-normal text-white">
              <h2 id={`question-title-${feedItem?.id}`}>
                <span
                  className="cursor-pointer hover:underline"
                  aria-hidden="true"
                  onClick={() => {
                    if (onClickDepartment) {
                      onClickDepartment(feedItem?.department);
                    }
                  }}
                >
                  {`${feedItem?.department?.name}`}
                </span>
                <span>
                  {` · ${
                    feedItem?.month &&
                    dayjs()
                      .month(feedItem?.month - 1)
                      .format('MMMM')
                  }`}
                </span>
              </h2>
              <h2 className="mr-7">
                {`Last Month: ${decimalLogic(
                  feedItem?.prevMonthSpend,
                  DecimalType.SummedNumbers,
                  '$',
                )}`}
              </h2>
            </div>
          </div>
        </div>
        {Array.isArray(feedItem?.transactions) && feedItem?.transactions?.length > 0 && (
          <RollupTransactions feed={feedItem} loadOnMount />
        )}
        <div className="space-y-4 px-4 sm:px-12 mt-1.5">
          {hasMoreComment && (
            <CommentViewAll
              onClick={loadAllComments}
              loading={isLoadingComments}
              className="mt-2.5"
            />
          )}
          {hasComment && (
            <ul className="flex flex-col mt-1.5">
              {comments?.map((comment) => (
                <li key={comment.id}>
                  <CommentItem
                    className={isHidden ? 'bg-purple-11' : 'bg-Gray-24'}
                    comment={comment}
                    mentionData={mentions}
                    editable={identity?.id === comment.user.id}
                    onEdit={editComment}
                    onDelete={deleteComment}
                    isShowUserAva
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="px-4 sm:px-6 lg:px-12 py-1.5 mb-2 sm:mb-4 mt-1 sm:mt-2">
          <CommentBox
            id={feedItem?.id.toString()}
            className="bg-white"
            onAttachFile={handleAttachFile}
            mentionData={mentions}
            onSubmit={onSubmitComment}
          />
        </div>
      </article>
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
        itemId={feedItem?.id}
      />
      <AttachmentModal
        depName={feedItem?.department?.name}
        catName={feedItem?.category?.name}
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

export default React.memo(RollupCard);
