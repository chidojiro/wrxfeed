import { atom, selector } from 'recoil';
import { Target } from '@main/entity';

export const targetState = atom<Target[]>({
  key: 'main/target',
  default: selector({
    key: 'main/target/default',
    get: () => [],
  }),
});
