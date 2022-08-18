export type GetUploadFileTokenPayload = {
  filename: string;
  contentType: string;
  uploadType: 'attachments';
};

export type UploadToken = {
  uploadUrl: string;
  fileUrl: string;
};
