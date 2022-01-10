import { atom } from 'recoil';

export const slideOverOpenState = atom<boolean>({
  key: 'common/slideOver',
  default: false,
});
