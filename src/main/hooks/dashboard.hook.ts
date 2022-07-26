import { useFetcher } from '@/common/hooks';
import { isApiError } from '@/error/utils';
import { TargetApis } from '@/target/apis';
import { TargetSummaries } from '@/target/types';
import React from 'react';
import { toast } from 'react-toastify';

export const TargetSummariesDefault: TargetSummaries = {
  total: 0,
  onTrack: 0,
  atRisk: 0,
  exceeded: 0,
};

interface DashboardHookValues {
  isLoading: boolean;
  summaries: TargetSummaries;
}

export function useDashboard(): DashboardHookValues {
  const [summaries, setSummaries] = React.useState<TargetSummaries>(TargetSummariesDefault);

  const { isInitializing: isLoading } = useFetcher(
    ['dashboard.hook'],
    async () => {
      const res = await TargetApis.getSummaries();
      setSummaries(res);
    },
    {
      onError: (error) => {
        if (isApiError(error)) {
          toast.error(error.details?.message);
          return false;
        }
      },
    },
  );

  return {
    isLoading,
    summaries,
  };
}
