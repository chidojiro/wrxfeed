import { Pagination } from '@api/types';
import { getApiClient } from '@api/utils';
import { Comment } from '@main/entity';
import { atom, selector } from 'recoil';

interface CommentFilter extends Pagination {
  transactionId: number;
}

export const commentFilterState = atom<CommentFilter>({
  key: 'main/commentFilter',
  default: {
    transactionId: -1,
    offset: 0,
    limit: 10,
  },
});

export const commentSelector = selector<Comment[]>({
  key: 'main/comments', // unique ID (with respect to other atoms/selectors)
  get: async ({ get }) => {
    const apiClient = await getApiClient();
    const filter = get(commentFilterState);
    return apiClient.getComments(filter.transactionId, filter);
  },
});
