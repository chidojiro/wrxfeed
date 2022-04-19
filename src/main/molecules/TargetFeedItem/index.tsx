import React, { useMemo, useRef, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { EditorState } from 'draft-js';
import dayjs from 'dayjs';
// hooks
import { useIdentity } from '@identity/hooks';
import { useFeedComment } from '@main/hooks/feedComment.hook';
// constants
import { Category, Department, FeedItem, Vendor, Visibility, Target } from '@main/entity';
import { CommentFormModel } from '@main/types';
import { useMention, useTarget } from '@main/hooks';
import { GetUploadTokenBody, Pagination, UploadTypes } from '@api/types';
import { classNames } from '@common/utils';
import { commentEditorRawParser, getDepartmentBgColor, getTargetName } from '@main/utils';
import { SHOW_TARGET_FEED_CHART } from '@src/config';
// components
import CommentBox from '@main/molecules/CommentBox';
import FeedBackModal from '@main/organisms/FeedBackModal';
import AttachmentModal from '@main/organisms/CommentAttachmentModal';
import ConfirmModal from '@main/atoms/ConfirmModal';
import CommentItem from '@main/molecules/CommentItem';
import CommentViewAll from '@main/atoms/CommentViewAll';
import TargetChartView from '@main/molecules/TargetChartView';
import RollupTransactions from '@main/molecules/RollupTransactions';
// assets
import { ReactComponent as ExclamationCircle } from '@assets/icons/solid/exclamation-circle.svg';
import { ReactComponent as EyeHideIcon } from '@assets/icons/outline/eye-hide.svg';
import { CalendarMinus } from '@assets';
import AddTargetModal from '@main/organisms/AddTargetModal';
import UserAvatar from '@main/atoms/UserAvatar';

export interface TargetFeedItemProps {
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

const initFilter = {
  offset: 0,
  limit: 0,
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  timestamp: Date.now(),
};

const TargetFeedItem: React.VFC<TargetFeedItemProps> = ({ feedItem, onClickDepartment }) => {
  const identity = useIdentity();
  const [filterComment, setFilterComment] = useState<Pagination>({
    offset: 0,
    limit: INITIAL_COMMENT_NUMBER,
  });

  // Refs
  const containerRef = useRef<HTMLLIElement>(null);
  // Local states
  const [confirmModal, setConfirmModal] = useState<ConfirmModalProps>();
  const [isOpenFeedbackModal, openFeedbackModal] = useState(false);
  const [attachFileComment, setAttachFileComment] = useState<File | null>(null);
  const [uploadFileOptions, setUploadFileOptions] = useState<GetUploadTokenBody>();
  const [showAddTarget, setShowAddTarget] = useState<boolean>(false);
  const [itemEditing, setItemEditing] = useState<Target | null>(null);
  // Data hooks
  const { mentions } = useMention();
  // Variables
  const isHidden = feedItem?.category.visibility === Visibility.HIDDEN;

  const {
    comments,
    isLoading: isLoadingComments,
    deleteComment,
    editComment,
    addComment,
    hasMore: hasMoreComment,
  } = useFeedComment(feedItem, filterComment);

  const hasComment = comments?.length > 0;

  const { postTarget, putTarget, deleteTarget, isPostTarget, isPutTarget, isDeleteTarget } =
    useTarget(
      initFilter,
      { onSuccess: () => setShowAddTarget(false), onError: () => undefined },
      { onSuccess: () => setShowAddTarget(false), onError: () => undefined },
      { onSuccess: () => setShowAddTarget(false), onError: () => undefined },
      false,
    );

  const onSubmitComment: SubmitHandler<CommentFormModel> = (values) => {
    const contentState = values?.content as EditorState;
    const isDirty = contentState.getCurrentContent().hasText() || !!values?.attachment;
    if (!isDirty) return;
    const parsedContent = commentEditorRawParser(contentState.getCurrentContent());
    addComment({ content: parsedContent, attachment: values.attachment }).then();
  };

  const loadAllComments = () => {
    if (isLoadingComments || !hasMoreComment) return;
    setFilterComment({
      limit: LIMIT_GET_COMMENT,
      offset: comments?.length ?? 0,
    });
  };

  const handleAttachFile = (file: File) => {
    setUploadFileOptions({
      filename: `${feedItem?.id}-${Date.now()}-${file.name}`,
      contentType: file.type,
      uploadType: UploadTypes.Attachments,
    });
    setAttachFileComment(file);
  };

  const departmentName =
    feedItem?.department?.parent?.name ?? feedItem?.department?.name ?? 'unknown';
  const deptGradientBg = useMemo(
    () => getDepartmentBgColor(departmentName ?? '', undefined, true),
    [departmentName],
  );

  const hideAddTargetModal = () => {
    setItemEditing(null);
    setShowAddTarget(false);
  };

  const onClickEditTarget = () => {
    setItemEditing(feedItem.target);
    setShowAddTarget(true);
  };

  const renderEditorAvatar = (target: Target) => {
    const updaterName = target?.updater?.fullName ?? '';
    return (
      <div className="flex w-6 h-6 group relative">
        <UserAvatar user={target?.updater} />
        {typeof updaterName === 'string' && updaterName?.length > 0 && (
          <div className="invisible group-hover:visible absolute -top-10 left-0">
            <div className="bg-primary p-2 rounded-sm">
              <p className="text text-white text-xs truncate font-semibold">{updaterName}</p>
            </div>
            <svg
              className="absolute text-primary h-2 left-3 top-full"
              x="0px"
              y="0px"
              viewBox="0 0 255 255"
              xmlSpace="preserve"
            >
              <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
            </svg>
          </div>
        )}
      </div>
    );
  };

  const renderTargetName = (target: Target) => {
    return (
      <div className="group relative">
        <p className="text-base text-primary text-left font-bold line-clamp-2 overflow-ellipsis">
          {getTargetName(target)}
        </p>
        <div className="invisible group-hover:visible absolute bottom-8 left-0">
          <div className="bg-primary p-2 rounded-sm">
            <p className="text text-white text-2xs font-semibold">{getTargetName(target)}</p>
          </div>
          <svg
            className="absolute text-primary h-2 right-8 top-full"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            xmlSpace="preserve"
          >
            <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <>
      <article
        ref={containerRef}
        key={feedItem.id}
        className="bg-white flex flex-col filter shadow-md rounded-card"
        aria-labelledby={`rollup-title-${feedItem?.id}`}
      >
        <div className="flex flex-col">
          <div
            className="h-4 w-full rounded-t-card"
            style={{
              background: deptGradientBg,
            }}
          />
          <div
            className={classNames(
              isHidden ? 'bg-purple-8' : 'bg-white',
              'flex-col space-y-2 px-8 py-6',
            )}
          >
            <div className="flex flex-row items-center space-x-2">
              <div className="flex items-center min-w-0 flex-1">
                {renderTargetName(feedItem?.target)}
                {isHidden && (
                  <div className="flex flex-row items-center bg-Gray-12 py-0.5 px-2 ml-2 rounded-full">
                    <EyeHideIcon
                      viewBox="-2 -2 19 19"
                      className="fill-current path-no-filled stroke-current path-no-stroke text-system-alert mr-1"
                    />
                    <span className="text-xs text-Gray-6">Hidden</span>
                  </div>
                )}
              </div>
              <div className="flex-row space-x-2 self-center flex items-center">
                <h2 id={`question-title-${feedItem?.id}`} className="text-xs text-Gray-6">
                  {feedItem?.month && dayjs().format('MMMM YYYY')}
                </h2>
                <button
                  type="button"
                  className="w-6 h-6 rounded-full bg-Gray-12 flex justify-center items-center"
                >
                  <CalendarMinus className="w-3 h-3" width={12} height={12} />
                </button>
              </div>
            </div>
            <div className="flex flex-row space-x-2 items-center h-6">
              {renderEditorAvatar(feedItem?.target)}
              <h2
                aria-hidden="true"
                id={`question-title-${feedItem?.id}`}
                className="mt-1 text-xs font-normal text-Gray-6 cursor-pointer hover:underline"
                onClick={() => {
                  if (onClickDepartment) {
                    onClickDepartment(feedItem?.department);
                  }
                }}
              >
                Last edited Yesterday at 9:15AM
              </h2>
            </div>
          </div>
        </div>
        {SHOW_TARGET_FEED_CHART && (
          <TargetChartView feedItem={feedItem} onEdit={onClickEditTarget} />
        )}
        <RollupTransactions trans={feedItem?.transactions} />
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
            id={feedItem.id.toString()}
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
      {feedItem.transactions.length > 0 && (
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
      )}
      <AddTargetModal
        open={showAddTarget}
        onClose={() => hideAddTargetModal()}
        onCancel={() => hideAddTargetModal()}
        deleteTarget={deleteTarget}
        postTarget={postTarget}
        putTarget={putTarget}
        itemEditing={itemEditing}
        isCreatingOrSaving={isPostTarget || isPutTarget}
        isDeleting={isDeleteTarget}
        department={feedItem.department}
      />
    </>
  );
};

export default React.memo(TargetFeedItem);
