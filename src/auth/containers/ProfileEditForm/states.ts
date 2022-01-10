import { atom, selector } from 'recoil';
import { getApiClient } from '../../../api';
import { Profile } from '../../types';

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
        const apiClient = await getApiClient();
        return await apiClient.getProfile();
      } catch {
        return {};
      }
    },
  }),
});
