import React, { useRef } from 'react';
import LinearProgress from '@common/atoms/LinearProgress';
import CommentBox from '@main/molecules/CommentBox';
import { useFileUploader } from '@common/hooks/useFileUploader';
import { GetUploadTokenBody } from '@api/types';
import { Transaction } from '@main/entity';
import CircleAvatar from '@main/atoms/CircleAvatar';
import ImageFilePreview from '@main/atoms/ImageFilePreview';
import { CommentFormModel } from '@main/types';
import { EditorState } from 'draft-js';
import { MentionData } from '@draft-js-plugins/mention';
import Modal, { ModalProps } from '@common/atoms/Modal';

export type AttachmentModalProps = ModalProps & {
  style?: React.CSSProperties;
  transaction?: Transaction;
  file: File | null;
  mentionData: MentionData[];
  uploadOptions?: GetUploadTokenBody;
  onFileUploaded: (data: CommentFormModel) => void;
};

const CommentAttachmentModal: React.VFC<AttachmentModalProps> = ({
  transaction,
  open,
  file,
  mentionData,
  uploadOptions,
  onFileUploaded,
  onClose,
}) => {
  const commentContent = useRef<EditorState>();
  const isImage = file?.type.split('/')[0] === 'image';
  const onUploadSuccess = (url: string) => {
    onFileUploaded({
      attachment: url,
      content: commentContent.current || EditorState.createEmpty(),
    });
    onClose();
  };
  const { isUploading, uploadFile } = useFileUploader({
    onSuccess: onUploadSuccess,
  });

  const handleFileUpload = () => {
    if (file) {
      uploadFile(file, uploadOptions);
    }
  };

  const onChangeComment = (content?: EditorState) => {
    commentContent.current = content;
  };
  return (
    <Modal open={open} onClose={onClose}>
      <div className="sm:min-w-[30rem] min-w-[90vw]">
        {isImage && <ImageFilePreview className="mt-6 ml-6" file={file} width={144} height={90} />}
        <div className="px-6 mt-3.5">
          <p className="text-lg text-left font-bold text-Gray-1">
            {file?.name || '<unknown filename>'}
          </p>
          <p className="text-sm text-left text-Gray-2 mt-2">
            <div className="flex">
              Upload to
              <CircleAvatar
                size={20}
                className="mx-1"
                name={transaction?.department.name}
                initialLength={1}
              />
              <span style={{ fontWeight: 600 }}>{transaction?.category.name ?? ''}</span>
            </div>
          </p>
        </div>
        <div className="flex flex-col p-6">
          <p className="text-sm text-left text-Gray-1 font-bold mb-2">Add a comment</p>
          <CommentBox
            id={`attachment-${transaction?.id.toString()}`}
            showAttach={false}
            showSend={false}
            showEmoji={false}
            mentionData={mentionData}
            onChange={onChangeComment}
          />
        </div>
        {isUploading && <LinearProgress />}
        <hr className="divider divider-horizontal" />
        <div className="flex justify-end h-[66px] px-6 py-4">
          <button
            type="button"
            disabled={isUploading}
            className="rounded text-sm font-bold text-Gray-2 px-5"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-purple-5 rounded text-sm font-bold text-white ml-2 px-5"
            disabled={isUploading}
            onClick={handleFileUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default React.memo(CommentAttachmentModal);
