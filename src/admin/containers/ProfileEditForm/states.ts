import { atom, selector } from 'recoil';
import { getApiClient } from '../../../api';
import { Profile } from '../../types';

export const refreshProfileFlag = atom<number>({
  key: 'admin/load-profile',
  default: 0,
});

export const profileState = selector<Profile>({
  key: 'admin/profile',
  get: async ({ get }) => {
    get(refreshProfileFlag);
    const apiClient = await getApiClient();
    return apiClient.getProfile();
  },
});
