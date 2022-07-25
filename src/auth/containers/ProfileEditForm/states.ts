import { ProfileApis } from '@/profile/apis';
import { Profile } from '@/profile/types';
import { atom, selector } from 'recoil';

export const refreshProfileFlag = atom<number>({
  key: 'admin/load-profile',
  default: 0,
});

export const profileState = atom<Profile>({
  key: 'admin/profile',
  default: selector({
    key: 'main/profile/default',
    get: async () => {
      try {
        return await ProfileApis.get();
      } catch {
        return {};
      }
    },
  }),
});
