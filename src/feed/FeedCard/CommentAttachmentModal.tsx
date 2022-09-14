import LinearProgress from '@/common/atoms/LinearProgress';
import Modal, { ModalProps } from '@/common/atoms/Modal';
import { Button } from '@/common/components';
import { useFileUploader } from '@/common/hooks/useFileUploader';
import CircleAvatar from '@/main/atoms/CircleAvatar';
import ImageFilePreview from '@/main/atoms/ImageFilePreview';
import { CommentFormModel } from '@/main/types';
import { GetUploadFileTokenPayload } from '@/media/types';
import { MentionData } from '@draft-js-plugins/mention';
import { EditorState } from 'draft-js';
import React, { useRef } from 'react';
import { CommentBox } from './CommentBox';

export type AttachmentModalProps = ModalProps & {
  style?: React.CSSProperties;
  depName?: string;
  catName?: string;
  file: File | null;
  mentionData: MentionData[];
  uploadOptions?: GetUploadFileTokenPayload;
  onFileUploaded: (data: CommentFormModel) => void;
};

export const CommentAttachmentModal = ({
  depName,
  catName,
  open,
  file,
  mentionData,
  uploadOptions,
  onFileUploaded,
  onClose,
}: AttachmentModalProps) => {
  const cancelButtonRef = useRef(null);
  const commentContent = useRef<EditorState>();
  const isImage = file?.type.split('/')[0] === 'image';
  const onUploadSuccess = (url: string) => {
    onFileUploaded({
      attachment: url,
      content: commentContent.current || EditorState.createEmpty(),
    });
    onClose?.();
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
    <Modal initialFocus={cancelButtonRef} open={open} onClose={onClose}>
      <div className="sm:min-w-[30rem] lg:max-w-[60vw] min-w-[90vw] max-w-full">
        {isImage && <ImageFilePreview className="mt-6 ml-6" file={file} width={144} height={90} />}
        <div className="px-6 mt-3.5">
          <p className="text-lg text-left font-bold text-Gray-1">
            {file?.name || '<unknown filename>'}
          </p>
          <div className="text-sm text-left text-Gray-2 mt-2">
            <div className="flex">
              Upload to
              <CircleAvatar size={20} className="mx-1" name={depName} initialLength={1} />
              <span style={{ fontWeight: 600 }}>{catName ?? ''}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-6">
          <p className="text-sm text-left text-Gray-1 font-bold mb-2">Add a comment</p>
          <CommentBox
            id={`attachment-${depName}`}
            showAttach={false}
            showSend={false}
            showEmoji={false}
            mentionData={mentionData}
            onChange={onChangeComment}
          />
        </div>
        {isUploading && <LinearProgress />}
        <hr className="divider divider-horizontal" />
        <div className="flex justify-end h-[66px] px-6 py-4 gap-3">
          <Button
            colorScheme="gray"
            variant="ghost"
            ref={cancelButtonRef}
            disabled={isUploading}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            colorScheme="purple"
            variant="solid"
            disabled={isUploading}
            onClick={handleFileUpload}
          >
            Upload
          </Button>
        </div>
      </div>
    </Modal>
  );
};
