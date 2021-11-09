import { Subscription } from '@main/entity';
import { atom } from 'recoil';

export const subscriptionState = atom<Subscription>({
  key: 'main/subscription',
  default: {},
});
