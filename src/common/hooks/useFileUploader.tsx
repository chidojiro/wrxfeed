import { useState } from 'react';
import { useApi } from '@src/api';
import { GetUploadTokenBody, UploadTypes } from '@api/types';
import { isBadRequest, useErrorHandler } from '@src/error';
import { toast } from 'react-toastify';

interface FileUploaderCallback {
  onSuccess: (url: string) => void;
  onError?: (error: unknown) => void;
}

interface FileUploaderValues {
  isUploading: boolean;
  uploadFile: (file: File, options?: GetUploadTokenBody) => void;
}

export const useFileUploader = (callback: FileUploaderCallback): FileUploaderValues => {
  const { getUploadFileToken, uploadAttachment } = useApi();
  const errorHandler = useErrorHandler();
  const [isUploading, setUploading] = useState(false);

  async function uploadFile(file: File, options?: GetUploadTokenBody) {
    try {
      setUploading(true);
      const uploadTokenOptions: GetUploadTokenBody = {
        filename: options?.filename || file.name,
        contentType: options?.contentType || file.type || 'image/jpeg',
        uploadType: options?.uploadType || UploadTypes.Attachments,
      };
      const uploadToken = await getUploadFileToken(uploadTokenOptions);
      await uploadAttachment(file, uploadToken);
      callback.onSuccess(uploadToken.fileUrl);
    } catch (error: unknown) {
      if (callback.onError) {
        callback.onError(error);
      } else if (isBadRequest(error)) {
        toast.error('Can not upload file. Please try again later.');
      } else {
        errorHandler(error).then();
      }
    } finally {
      setUploading(false);
    }
  }

  return {
    isUploading,
    uploadFile,
  };
};
