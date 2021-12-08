import { atom } from 'recoil';

const prefix = 'newNotifyCount';
export const newNotifyCountState = atom<number>({
  key: `${prefix}/show`,
  default: 0,
});

export interface NotifyCount {
  [key: string]: number;
}
