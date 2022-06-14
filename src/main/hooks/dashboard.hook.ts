/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useApi } from '@api';
import { TargetSummaries } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isApiError } from '@error/utils';

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
  const [summaries, setSummaries] = useState<TargetSummaries>(TargetSummariesDefault);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getTargetSummaries = async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getTargetSummaries();
      setSummaries(res);
    } catch (error) {
      if (isApiError(error)) {
        toast.error(error.details?.message);
      } else {
        await errorHandler(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTargetSummaries().then();
  }, [getTargetSummaries]);

  return {
    isLoading,
    summaries,
  };
}
