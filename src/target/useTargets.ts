import { TargetApis } from './apis';
import { useFetcher } from '@/common/hooks';
import { TargetFilter } from './types';

export const useTargets = (params?: TargetFilter) => {
  return useFetcher(['target', params], () => TargetApis.getList({ ...params }));
};
