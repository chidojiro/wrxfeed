import { atom } from 'recoil';

const prefix = 'main/AttachmentModal/';

export const showAttachmentModalState = atom<boolean>({
  key: `${prefix}/show`,
  default: true,
});
