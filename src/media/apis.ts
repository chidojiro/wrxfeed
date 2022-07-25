import { RestApis } from '@/rest/apis';
import { GetUploadFileTokenPayload, UploadToken } from './types';

const getUploadFileToken = (payload: GetUploadFileTokenPayload) =>
  RestApis.post<UploadToken>('/media/upload-tokens', payload);

const uploadAttachment = async (file: File, uploadToken: UploadToken) => {
  const payload = new Uint8Array(await file.arrayBuffer());

  return RestApis.put<string>(uploadToken.uploadUrl, payload);
};

export const MediaApis = {
  getUploadFileToken,
  uploadAttachment,
};
