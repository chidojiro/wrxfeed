import { atom } from 'recoil';

const prefix = 'MentionPopover/';

export type MentionState = {
  element: HTMLFormElement | null;
};

export const showMentionPopover = atom<MentionState>({
  key: `${prefix}/show`,
  default: {
    element: null,
  },
});
