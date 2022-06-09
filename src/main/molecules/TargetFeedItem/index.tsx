import React, { useRef, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { EditorState } from 'draft-js';
import dayjs from 'dayjs';
import cloneDeep from 'lodash.clonedeep';
// hooks
import { useIdentity } from '@identity/hooks';
import { useFeedComment } from '@main/hooks/feedComment.hook';
// constants
import { FeedItem, Visibility, Target, User } from '@main/entity';
import { CommentFormModel } from '@main/types';
import { useMention, useTarget } from '@main/hooks';
import { GetUploadTokenBody, Pagination, PutTargetParams, UploadTypes } from '@api/types';
import { classNames } from '@common/utils';
import { commentEditorRawParser, getMultiMonthRange, getTargetName } from '@main/utils';
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
import AddTargetModal from '@main/molecules/AddTargetModal';
import UserAvatar from '@main/atoms/UserAvatar';

export interface TargetFeedItemProps {
  feedItem: FeedItem;
  onRefresh?: () => void;
  onBack?: () => void;
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

const TargetFeedItem: React.VFC<TargetFeedItemProps> = ({ feedItem, onRefresh, onBack }) => {
  const identity = useIdentity();
  const [filterComment, setFilterComment] = useState<Pagination>({
    offset: 0,
    limit: INITIAL_COMMENT_NUMBER,
  });

  // Refs
  const containerRef = useRef<HTMLLIElement>(null);
  // Local states
  const [curFeed, setCurFeed] = useState<FeedItem>(feedItem);
  const [confirmModal, setConfirmModal] = useState<ConfirmModalProps>();
  const [isOpenFeedbackModal, openFeedbackModal] = useState(false);
  const [attachFileComment, setAttachFileComment] = useState<File | null>(null);
  const [uploadFileOptions, setUploadFileOptions] = useState<GetUploadTokenBody>();
  const [showAddTarget, setShowAddTarget] = useState<boolean>(false);
  const [itemEditing, setItemEditing] = useState<Target | null>(null);
  // Data hooks
  const { mentions } = useMention();
  // Variables
  const isHidden =
    curFeed?.category !== null && curFeed?.category?.visibility === Visibility.HIDDEN;

  const {
    comments,
    isLoading: isLoadingComments,
    deleteComment,
    editComment,
    addComment,
    hasMore: hasMoreComment,
  } = useFeedComment(curFeed, filterComment);

  const hasComment = comments?.length > 0;

  const onSuccessPutTarget = (target?: Target) => {
    setShowAddTarget(false);
    const updater: User = {
      id: identity?.id,
      avatar: identity?.avatar,
      fullName: identity?.fullName,
    };
    // auto update this target feed item after put success
    const curFeedClone = cloneDeep(curFeed);
    curFeedClone.target = {
      ...curFeedClone.target,
      ...(target?.name ? { name: target?.name } : {}),
      ...(target?.props ? { props: target?.props } : {}),
      ...(target?.periods ? { periods: target?.periods } : {}),
      updater,
    };
    setCurFeed(curFeedClone);
    if (typeof onRefresh === 'function') {
      onRefresh();
    }
  };

  const onSuccessDeleteTarget = () => {
    setShowAddTarget(false);
    if (typeof onBack === 'function') {
      onBack();
    }
  };

  const { postTarget, putTarget, deleteTarget, isPostTarget, isPutTarget, isDeleteTarget } =
    useTarget({
      filter: initFilter,
      cbPost: { onSuccess: () => setShowAddTarget(false), onError: () => undefined },
      cbPut: {
        onSuccess: (id, target) => onSuccessPutTarget(target),
        onError: () => onRefresh && onRefresh(),
      },
      cbDelete: { onSuccess: onSuccessDeleteTarget, onError: () => onRefresh && onRefresh() },
    });

  const handlePutTarget = (id: number, data: PutTargetParams) => {
    putTarget(id, data);
  };

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
      filename: `${curFeed?.id}-${Date.now()}-${file.name}`,
      contentType: file.type,
      uploadType: UploadTypes.Attachments,
    });
    setAttachFileComment(file);
  };

  const gradientBg = 'linear-gradient(125.45deg, #CA77B3 18.62%, #514EE7 74.47%)';

  const hideAddTargetModal = () => {
    setItemEditing(null);
    setShowAddTarget(false);
  };

  const onClickEditTarget = () => {
    setItemEditing(curFeed.target);
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
        key={curFeed.id}
        className="bg-white flex flex-col filter shadow-md rounded-card"
        aria-labelledby={`rollup-title-${curFeed?.id}`}
      >
        <div className="flex flex-col">
          <div
            className="h-4 w-full rounded-t-card"
            style={{
              background: gradientBg,
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
                {renderTargetName(curFeed?.target)}
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
              <div className="flex-row space-x-2 self-center flex items-center">
                <h2 id={`question-title-${curFeed?.id}`} className="text-xs text-Gray-6">
                  {`${getMultiMonthRange(curFeed.target.periods)} ${dayjs().format('YYYY')}`}
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
              {renderEditorAvatar(curFeed?.target)}
              <h2
                id={`question-title-${curFeed?.id}`}
                className="mt-1 text-xs font-normal text-Gray-6"
              >
                {`${curFeed?.target.updater?.fullName ?? 'Unknown'} edited at ${dayjs(
                  curFeed.lastInteraction,
                ).format('MM/DD/YYYY')}`}
              </h2>
            </div>
          </div>
        </div>
        <TargetChartView target={curFeed.target} onEdit={onClickEditTarget} />
        <RollupTransactions feedId={curFeed?.id} trans={curFeed?.transactions} showTopDivider />
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
            id={curFeed.id.toString()}
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
        itemId={curFeed?.id}
      />
      {curFeed.transactions.length > 0 && (
        <AttachmentModal
          depName={curFeed?.department?.name}
          catName={curFeed?.category?.name}
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
        putTarget={handlePutTarget}
        itemEditing={itemEditing}
        isCreatingOrSaving={isPostTarget || isPutTarget}
        isDeleting={isDeleteTarget}
        department={curFeed.department}
      />
    </>
  );
};

export default React.memo(TargetFeedItem);
