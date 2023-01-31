import { Target, TargetStatusType } from './types';

export const fallbackTarget: Target = {
  id: 0,
  name: '',
  creator: {},
  updater: {},
  trackingStatus: TargetStatusType.OnTrack,
  props: [],
  periods: [],
  spendings: [],
  department: {
    id: 0,
    name: '',
  },
  isPrimary: false,
};
