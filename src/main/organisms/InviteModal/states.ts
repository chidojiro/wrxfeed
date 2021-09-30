import { atom } from 'recoil';

const prefix = 'main/InviteModal';

export const showInviteModalState = atom<boolean>({
  key: `${prefix}/show`,
  default: true,
});
