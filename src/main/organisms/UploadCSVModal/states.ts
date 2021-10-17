import { atom } from 'recoil';

const prefix = 'UploadCSVModal/';

export const showUploadCSVModalState = atom<boolean>({
  key: `${prefix}/show`,
  default: false,
});
