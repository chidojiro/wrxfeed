import { Target, TargetStatusType } from './types';

export const fallbackTarget: Target = {
  id: 0,
  name: '',
  creator: {},
  updatedBy: {},
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
