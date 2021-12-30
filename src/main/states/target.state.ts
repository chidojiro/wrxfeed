import { atom, selector } from 'recoil';
import { Target } from '@main/entity';

// const initFilter = {
//   offset: 0,
//   limit: 30,
//   year: new Date().getFullYear(),
//   month: new Date().getMonth() + 1,
//   timestamp: Date.now(),
// };

export const targetState = atom<Target[]>({
  key: 'main/target',
  default: selector({
    key: 'main/target/default',
    get: () => [],
  }),
});
