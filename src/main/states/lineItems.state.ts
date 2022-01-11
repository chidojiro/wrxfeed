import { atom } from 'recoil';
import { TransLineItem } from '@main/entity';

export const lineItemSelectState = atom<TransLineItem | null>({
  key: 'main/lineItems',
  default: null,
});
