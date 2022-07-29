import { User } from '@/main/entity';
import { ProfileApis } from '@/profile/apis';
import { atom, selector } from 'recoil';

export const membersState = atom<User[]>({
  key: 'main/members', // unique ID (with respect to other atoms/selectors)
  default: selector({
    key: 'main/members/default',
    get: async () => {
      try {
        return await ProfileApis.getUsers({ offset: 0, limit: 100 }); // TODO: handle load more User when scale up product
      } catch {
        return [];
      }
    },
  }),
});
