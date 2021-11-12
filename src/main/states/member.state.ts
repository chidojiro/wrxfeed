import { atom, selector } from 'recoil';
import { getApiClient } from '@api/utils';
import { User } from '@main/entity';
import { identityState } from '@identity/states';

export const membersState = atom<User[]>({
  key: 'main/members', // unique ID (with respect to other atoms/selectors)
  default: selector({
    key: 'main/members/default',
    get: async ({ get }) => {
      get(identityState);
      try {
        const apiClient = await getApiClient();
        return await apiClient.getUsers({ pagination: { offset: 0, limit: 100 } }); // TODO: handle load more User when scale up product
      } catch {
        return [];
      }
    },
  }),
});
