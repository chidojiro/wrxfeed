import { atom } from 'recoil';

const prefix = 'main/AttachmentModal/';

export interface AttachState {
  isShow: boolean;
  file: File | null;
}

export const showAttachmentModalState = atom<AttachState>({
  key: `${prefix}/show`,
  default: {
    isShow: false,
    file: null,
  },
});
