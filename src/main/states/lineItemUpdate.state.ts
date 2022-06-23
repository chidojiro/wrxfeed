import { EMPTY_LINE_ITEM, LineItem } from '@/main/entity';
import { atom } from 'recoil';

export const lineItemUpdateState = atom<LineItem>({
  key: 'detail-views/line-item-update',
  default: EMPTY_LINE_ITEM,
});
