import React, { useCallback, useRef, useState } from 'react';
import { CommentFormModel } from '@main/types';
import { Transaction } from '@main/entity';
import TransactionContent from '@main/atoms/TransactionContent';
import CommentBox from '@main/molecules/CommentBox';
import { Box, Collapse, List, Stack, Typography } from '@mui/material';
import CommentItem from '@main/molecules/CommentItem';
import CommentRemaining from '@main/atoms/CommentRemaining';
import { TransitionGroup } from 'react-transition-group';
import { useComment } from '@main/hooks';
import { GetUploadTokenBody, Pagination, UploadTypes } from '@api/types';
import ConfirmModal from '@main/atoms/ConfirmModal';
import { ReactComponent as ExclamationCircle } from '@assets/icons/solid/exclamation-circle.svg';
import { Gray, LightBG } from '@theme/colors';
import TransactionNotifyBanner from '@main/atoms/TransactionNotifyBanner';
import PopoverMenu from '@main/atoms/PopoverMenu';
import PopoverMenuItem from '@main/atoms/PopoverMenuItem';
import FeedBackModal from '@main/molecules/FeelBackModal';
import AttachmentModal from '@main/molecules/CommentAttachmentModal';

const INITIAL_COMMENT_NUMBER = 2;
const LOAD_MORE_LIMIT = 5;

export interface TransactionItemProps {
  transaction: Transaction;
  onClickDepartment?: (department?: string) => void;
  onClickVendor?: (vendor?: string) => void;
  onClickCategory?: (category?: string) => void;
}

interface ConfirmModalProps {
  title: string;
  description: string;
  confirmAction: () => void;
  confirmLabel: string;
}

const TransactionItem: React.VFC<TransactionItemProps> = ({
  transaction,
  onClickDepartment,
  onClickVendor,
  onClickCategory,
}) => {
  // Recoil states
  // Refs
  const menuAnchorRef = useRef();
  const containerRef = useRef();
  // Local states
  const [isOpenMenu, openMenu] = useState(false);
  const [filter, setFilter] = useState<Pagination>({ offset: 0, limit: INITIAL_COMMENT_NUMBER });
  const { comments, total, isLoading, addComment } = useComment(transaction, filter);
  const [confirmModal, setConfirmModal] = useState<ConfirmModalProps>();
  const [isHidden, setHidden] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState('');
  const [isOpenFeedbackModal, openFeedbackModal] = useState(false);
  const [attachFileComment, setAttachFileComment] = useState<File | null>(null);
  const [uploadFileOptions, setUploadFileOptions] = useState<GetUploadTokenBody>();
  // Variables
  const hasComment = !!total;
  const hiddenCommentCount = total - comments.length;

  // console.log('comments = ', comments);

  const onSubmitComment = (values: CommentFormModel) => {
    const isDirty = !!values?.content || !!values?.attachment;
    if (!isDirty) return;
    const parsedContent = values.content
      ?.split(' ')
      .map((word) => {
        if (word.startsWith('@')) {
          // 6 is Harry user id, Matt is 8, harrymnc is 21
          return `<mention userid="6" tagname="${word.replace('@', '')}"/>`;
        }
        return word;
      })
      .join(' ');
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
    openMenu(false);
    setConfirmModal(undefined);
    setHidden(true);
    setNotifyMessage('You have hidden this transaction');
  };

  const openHideCategoryConfirmation = () => {
    setConfirmModal({
      title: 'Hide this from the entire company?',
      description:
        'Only you will be able to see this transaction. Tagged members will not be able to see this.',
      confirmAction: handleHideCategory,
      confirmLabel: 'Hide',
    });
  };

  const handleUnhideCategory = () => {
    openMenu(false);
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
    openMenu(false);
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
      <Stack
        ref={containerRef}
        sx={{ p: 2, backgroundColor: isHidden ? Gray[12] : '#fff' }}
        spacing={2}
      >
        <Box sx={{ pt: 1 }}>
          <TransactionContent
            transaction={transaction}
            isHidden={isHidden}
            ellipsisRef={menuAnchorRef}
            onEllipsisClick={() => openMenu(true)}
            onClickDepartment={onClickDepartment}
            onClickCategory={onClickCategory}
            onClickVendor={onClickVendor}
          />
        </Box>
        {hasComment && (
          <Stack sx={{ pl: 6, pt: 1, pb: 1 }} spacing={0.5}>
            <List>
              <TransitionGroup>
                {hiddenCommentCount > 0 && (
                  <Collapse key="hidden-comment-count">
                    <CommentRemaining
                      sx={{ marginBottom: 0.5 }}
                      hiddenCount={hiddenCommentCount}
                      onClick={loadMoreComments}
                      loading={isLoading}
                    />
                  </Collapse>
                )}
                {comments?.map((comment) => (
                  <Collapse key={comment.id}>
                    <CommentItem
                      sx={{ marginBottom: 0.5 }}
                      style={{ backgroundColor: isHidden ? Gray[12] : LightBG }}
                      comment={comment}
                    />
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>
          </Stack>
        )}
        {!isHidden && (
          <Box sx={{ pl: 6, pt: 0.5, pb: 1 }}>
            <CommentBox onSubmit={onSubmitComment} onAttachFile={handleAttachFile} />
          </Box>
        )}
        <ConfirmModal
          open={!!confirmModal}
          icon={ExclamationCircle}
          title={confirmModal?.title || ''}
          okLabel={confirmModal?.confirmLabel}
          onCancel={() => setConfirmModal(undefined)}
          onOk={confirmModal?.confirmAction}
        >
          <Typography
            id="modal-modal-description"
            variant="h5"
            fontWeight={400}
            component="p"
            color={Gray[2]}
          >
            {confirmModal?.description}
          </Typography>
        </ConfirmModal>
        <FeedBackModal open={isOpenFeedbackModal} onClose={() => openFeedbackModal(false)} />
        <AttachmentModal
          transaction={transaction}
          open={!!attachFileComment}
          file={attachFileComment}
          uploadOptions={uploadFileOptions}
          onClose={() => setAttachFileComment(null)}
          onFileUploaded={onSubmitComment}
        />
      </Stack>

      <PopoverMenu
        open={isOpenMenu}
        onClose={() => openMenu(false)}
        anchorEl={menuAnchorRef.current}
      >
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
    </>
  );
};

export default React.memo(TransactionItem);
