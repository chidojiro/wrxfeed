import { Pagination } from '@api/types';
import { getApiClient } from '@api/utils';
import { User } from '@main/entity';
import { atom, selector } from 'recoil';

export const mentionFilterState = atom<Pagination>({
  key: 'main/mentionFilter',
  default: {
    offset: 0,
    limit: 10,
  },
});

export const mentionSelector = selector<User[]>({
  key: 'main/mentions', // unique ID (with respect to other atoms/selectors)
  get: async ({ get }) => {
    const apiClient = await getApiClient();
    const filter = get(mentionFilterState);
    return apiClient?.getMentions(filter);
  },
});
