import { atom } from 'recoil';

const prefix = 'UploadCSVModal/';

export const showUploadCSVModalState = atom<boolean>({
  key: `${prefix}/show`,
  default: false,
});

// export type UploadCSVModalState = {
//   isShow: boolean;
// };

// export const uploadCSVModalState = selector<UploadCSVModalState>({
//   key: 'admin/profile',
//   get: async ({ get }) => {
//     get(refreshProfileFlag);
//     const apiClient = await getApiClient();
//     return apiClient.getProfile();
//   },
// });
