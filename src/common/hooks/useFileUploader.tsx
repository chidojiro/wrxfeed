import { isBadRequest } from '@/error';
import { MediaApis } from '@/media/apis';
import { GetUploadFileTokenPayload } from '@/media/types';
import { toast } from 'react-toastify';
import { useHandler } from './useHandler';

interface FileUploaderCallback {
  onSuccess: (url: string) => void;
  onError?: (error: unknown) => void;
}

interface FileUploaderValues {
  isUploading: boolean;
  uploadFile: (file: File, options?: GetUploadFileTokenPayload) => void;
}

export const useFileUploader = (callback: FileUploaderCallback): FileUploaderValues => {
  const { handle: uploadFile, isLoading } = useHandler(
    async (file: File, options?: GetUploadFileTokenPayload) => {
      const uploadTokenOptions: GetUploadFileTokenPayload = {
        filename: options?.filename || file.name,
        contentType: options?.contentType || file.type || 'image/jpeg',
        uploadType: options?.uploadType || 'attachments',
      };
      const uploadToken = await MediaApis.getUploadFileToken(uploadTokenOptions);
      await MediaApis.uploadAttachment(file, uploadToken);
      callback.onSuccess(uploadToken.fileUrl);
    },
    {
      onError: (error: unknown) => {
        if (callback.onError) {
          callback.onError(error);
          return false;
        }
        if (isBadRequest(error)) {
          toast.error('Can not upload file. Please try again later.');
          return false;
        }
      },
    },
  );

  return {
    isUploading: isLoading,
    uploadFile,
  };
};
