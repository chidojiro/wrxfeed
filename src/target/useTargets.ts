import { TargetApis } from './apis';
import { useFetcher } from '@/common/hooks';
import { useParams } from 'react-router-dom';
import { TargetFilter } from './types';

export const useTargets = (params?: TargetFilter) => {
  const { targetId: targetIdParam } = useParams() as Record<string, string>;

  return useFetcher(['target', targetIdParam, params], () => TargetApis.getList({ ...params }));
};
