import { Pagination } from '@api/types';
import { atom } from 'recoil';
import { MentionData } from '@draft-js-plugins/mention';

export const mentionFilterState = atom<Pagination>({
  key: 'main/mentionFilter',
  default: {
    offset: 0,
    limit: 10,
  },
});

export const mentionsState = atom<MentionData[]>({
  key: 'main/mentions', // unique ID (with respect to other atoms/selectors)
  default: [],
});

export const mentionLoadingState = atom<boolean>({
  key: 'main/mentionLoading', // unique ID (with respect to other atoms/selectors)
  default: false,
});
