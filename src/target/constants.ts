import { Target, TargetStatusType, TargetPeriod, TargetProps } from './types';

export const targetFallback: Target = {
  id: 0,
  name: '',
  creator: {},
  updatedBy: {},
  trackingStatus: TargetStatusType.OnTrack,
  props: [] as TargetProps[],
  periods: [] as TargetPeriod[],
};
