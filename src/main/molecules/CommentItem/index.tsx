import React, { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import { MentionData } from '@draft-js-plugins/mention';
import { EditorState } from 'draft-js';
import { SubmitHandler } from 'react-hook-form';
import { Comment } from '@main/entity';
import { classNames } from '@common/utils';
import CommentOwner from '@main/atoms/CommentOwner';
import CommentText from '@main/atoms/CommentText';
import CommentImage from '@main/atoms/CommentImage';
import { DocumentDownloadIcon } from '@heroicons/react/outline';
import Microlink from '@microlink/react';
import { extractHyperlinks, commentTextToContentState, commentEditorRawParser } from '@main/utils';
import { MICRO_LINK_API_KEY } from '@src/config';
import { Menu } from '@headlessui/react';
import PopoverMenu from '@main/atoms/PopoverMenu';
import PopoverMenuItem from '@main/atoms/PopoverMenuItem';
import CommentBox from '@main/molecules/CommentBox';
import ConfirmModal from '@main/atoms/ConfirmModal';
// Icons
import { ReactComponent as MoreVerticalIcon } from '@assets/icons/outline/more-vertical.svg';
import { ReactComponent as XCircleIcon } from '@assets/icons/outline/x-circle.svg';
import { ReactComponent as ExclamationCircle } from '@assets/icons/solid/exclamation-circle.svg';
import { CommentFormModel } from '@main/types';

const IMAGE_EXT = 'jpg,png,jpeg,gif';

export interface CommentItemProps {
  comment: Comment;
  mentionData?: MentionData[];
  editable?: boolean;
  className?: string;
  style?: CSSProperties;
  onEdit?: (comment: Comment) => void;
  onDelete?: (comment: Comment) => void;
  isShowUserAva?: boolean;
}

interface ConfirmModalProps {
  title: string;
  description: string;
  confirmAction: () => void;
  confirmLabel: string;
}

const CommentItem: React.VFC<CommentItemProps> = ({
  className,
  comment,
  mentionData,
  editable,
  onEdit,
  onDelete,
  isShowUserAva = false,
  ...rest
}) => {
  // Local states
  const [isHover, setHover] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [confirmModal, setConfirmModal] = useState<ConfirmModalProps>();
  // Variables
  const attachmentType = comment.attachment?.split('.').slice(-1)[0] ?? '';
  const attachmentName = comment.attachment?.split('/').slice(-1)[0] ?? '';
  // Remove prefix to get original name (format: <time>-<id>-<time>-<originalName>.ext)
  const originalName = attachmentName
    .split('-')
    .slice(3, attachmentName.split('-').length)
    .join('-');
  const hyperlinks = extractHyperlinks(comment.content);
  const contentState = useMemo(() => {
    return commentTextToContentState(comment.content);
  }, [comment.content]);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      // Do whatever when esc is pressed
      setEditing(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

  const onDeleteComment = () => {
    setConfirmModal({
      title: 'Delete this comment?',
      description: 'Are you sure you want to delete this comment?',
      confirmAction: () => onDelete && onDelete(comment),
      confirmLabel: 'Delete',
    });
  };

  const onSubmitEdit: SubmitHandler<CommentFormModel> = (values) => {
    if (!onEdit) {
      setEditing(false);
      return;
    }
    const newContentState = values?.content as EditorState;
    const isDirty = newContentState.getCurrentContent().hasText() || !!values?.attachment;
    if (!isDirty) {
      // Trigger delete comment
      onDeleteComment();
      setEditing(false);
      return;
    }
    const parsedContent = commentEditorRawParser(newContentState.getCurrentContent());
    onEdit({ ...comment, content: parsedContent });
    setEditing(false);
  };

  const renderAttachment = () =>
    IMAGE_EXT.includes(attachmentType.toLowerCase()) ? (
      <CommentImage src={comment.attachment ?? ''} />
    ) : (
      <div className="flex flex-row items-center space-x-1">
        <DocumentDownloadIcon width={14} height={14} className="stroke-current text-Gray-3" />
        <a className="text-sm text-Gray-3 hover:underline" href={comment.attachment} download>
          {originalName}
        </a>
      </div>
    );
  const renderLinkPreview = () =>
    hyperlinks && (
      <Microlink
        apiKey={MICRO_LINK_API_KEY}
        style={{ margin: '8px 0 6px' }}
        url={hyperlinks[0].url}
      />
    );
  return !isEditing ? (
    <>
      <div
        className={classNames(
          'group bg-purple-10 py-2 px-3.5 space-y-1 hover:bg-purple-11',
          className ?? '',
        )}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        {...rest}
      >
        <div className="flex flex-row justify-between items-center">
          <CommentOwner
            owner={comment.user}
            commentDate={comment.createdAt}
            showAva={isShowUserAva}
          />
          {editable && isHover && (
            <Menu
              as="div"
              className="relative inline-block z-50 text-left invisible group-hover:visible"
            >
              <div>
                <Menu.Button className="-mr-3 px-2 py-[2.5px] rounded-full flex items-center text-gray-400 hover:text-gray-600">
                  <span className="sr-only">comment options</span>
                  <MoreVerticalIcon aria-hidden="true" viewBox="0 0 15 15" />
                </Menu.Button>
              </div>
              <PopoverMenu>
                <PopoverMenuItem
                  key="edit-comment"
                  value="edit-comment"
                  label="Edit"
                  onClick={() => setEditing(true)}
                />
                <PopoverMenuItem
                  key="delete-comment"
                  labelClassName="text-system-alert"
                  value="delete-comment"
                  label="Delete"
                  onClick={onDeleteComment}
                />
              </PopoverMenu>
            </Menu>
          )}
        </div>
        <CommentText className={isShowUserAva ? 'ml-8' : ''} content={comment.content} />
        {!!comment.attachment && renderAttachment()}
        {!!hyperlinks?.length && renderLinkPreview()}
      </div>
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
    </>
  ) : (
    <div className="py-2 space-y-2">
      <CommentBox
        alwaysFocus
        mentionData={mentionData}
        defaultContent={EditorState.createWithContent(contentState)}
        onSubmit={onSubmitEdit}
      />
      <div className="flex justify-end items-center w-full space-x-1">
        <XCircleIcon
          width={13}
          height={13}
          viewBox="0 0 17 17"
          className="stroke-current path-no-stroke text-Gray-6"
        />
        <span className="text-xs text-Gray-6 align-middle">Esc to Cancel</span>
      </div>
    </div>
  );
};

export default CommentItem;
