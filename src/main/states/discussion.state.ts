import { Pagination } from '@api/types';
import { getApiClient } from '@api/utils';
import { Discussion } from '@main/entity';
import { atom, selector } from 'recoil';

export const discussionFilterState = atom<Pagination>({
  key: 'main/discussionFilter',
  default: {
    offset: 0,
    limit: 10,
  },
});

export const discussionSelector = selector<Discussion[]>({
  key: 'main/discussions', // unique ID (with respect to other atoms/selectors)
  get: async ({ get }) => {
    const apiClient = await getApiClient();
    const filter = get(discussionFilterState);
    return apiClient.getDiscussions(filter);
  },
});
