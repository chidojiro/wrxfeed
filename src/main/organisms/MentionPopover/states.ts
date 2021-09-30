import { atom } from 'recoil';

const prefix = 'MentionPopover/';

// export type MentionState = {
//   isShow: boolean;
//   currentTarget: any;
// };

export const showMentionPopover = atom<any>({
  key: `${prefix}/show`,
  default: null,
});
