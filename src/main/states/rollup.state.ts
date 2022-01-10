import { atom } from 'recoil';
import { FeedItem } from '@main/entity';

export const rollupsState = atom<FeedItem[]>({
  key: 'main/rollups',
  default: [],
});
