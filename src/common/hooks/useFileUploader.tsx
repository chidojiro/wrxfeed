import { isBadRequest, useErrorHandler } from '@/error';
import { MediaApis } from '@/media/apis';
import { GetUploadFileTokenPayload } from '@/media/types';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface FileUploaderCallback {
  onSuccess: (url: string) => void;
  onError?: (error: unknown) => void;
}

interface FileUploaderValues {
  isUploading: boolean;
  uploadFile: (file: File, options?: GetUploadFileTokenPayload) => void;
}

export const useFileUploader = (callback: FileUploaderCallback): FileUploaderValues => {
  const errorHandler = useErrorHandler();
  const [isUploading, setUploading] = useState(false);

  async function uploadFile(file: File, options?: GetUploadFileTokenPayload) {
    try {
      setUploading(true);
      const uploadTokenOptions: GetUploadFileTokenPayload = {
        filename: options?.filename || file.name,
        contentType: options?.contentType || file.type || 'image/jpeg',
        uploadType: options?.uploadType || 'attachments',
      };
      const uploadToken = await MediaApis.getUploadFileToken(uploadTokenOptions);
      await MediaApis.uploadAttachment(file, uploadToken);
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
