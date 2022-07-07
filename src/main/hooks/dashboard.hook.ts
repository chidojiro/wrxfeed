/* eslint-disable react-hooks/exhaustive-deps */
import { useErrorHandler } from '@/error/hooks';
import { isApiError } from '@/error/utils';
import { TargetApis } from '@/target/apis';
import { TargetSummaries } from '@/target/types';
import { useEffect, useState } from 'react';
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
  const [summaries, setSummaries] = useState<TargetSummaries>(TargetSummariesDefault);
  const [isLoading, setLoading] = useState<boolean>(false);
  const errorHandler = useErrorHandler();

  const getTargetSummaries = async () => {
    try {
      setLoading(true);
      const res = await TargetApis.getSummaries();
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
  }, []);

  return {
    isLoading,
    summaries,
  };
}
