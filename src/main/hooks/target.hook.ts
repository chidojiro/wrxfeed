/* eslint-disable react-hooks/exhaustive-deps */
import { useApi } from '@api';
import { TargetFilter, PostTargetParams, PutTargetParams } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { Target } from '@main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface TargetCallback {
  onSuccess: () => void;
  onError?: (error: unknown) => void;
}
interface TargetHookValues {
  targets: Target[];
  hasMore: boolean;
  isGetTargets: boolean;
  postTarget: (data: PostTargetParams) => Promise<void>;
  putTarget: (id: number, data: PutTargetParams) => Promise<void>;
  isPostTarget: boolean;
  isPutTarget: boolean;
}
export function useTarget(
  filter: TargetFilter,
  cbPost: TargetCallback,
  cbPut: TargetCallback,
): TargetHookValues {
  const [targets, setTargets] = useState<Target[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isGetTargets, setGetTargets] = useState<boolean>(false);
  const [isPostTarget, setPostTarget] = useState<boolean>(false);
  const [isPutTarget, setPutTarget] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  // Monthly targets - stack targets by the largest monthly spend
  const stackTargetsByTheLargestMonthlySpend = (data: Target[]): Target[] => {
    console.log(`Check data = ${JSON.stringify(data)}`);
    const targetStacked = data.sort(
      (a: Target, b: Target) => parseFloat(b?.total || '0') - parseFloat(a?.total || '0'),
    );
    console.log({ data });
    console.log({ targetStacked });
    return targetStacked;
  };

  const getTargets = useCallback(async () => {
    try {
      setGetTargets(true);
      const res = await ApiClient.getTargets(filter);
      const merged = targets.concat(res);
      const targetMap = new Map();
      merged.forEach((target) => {
        targetMap.set(target.id, target);
      });
      const newTargets = [...targetMap.values()];
      setTargets(stackTargetsByTheLargestMonthlySpend(newTargets));
      setHasMore(!!res.length);
      setGetTargets(false);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get monthly targets!');
      } else {
        await errorHandler(error);
      }
    } finally {
      setGetTargets(false);
    }
  }, [ApiClient, errorHandler, filter]);

  const postTarget = async (data: PostTargetParams) => {
    if (isPostTarget) return;
    try {
      setPostTarget(true);
      await ApiClient.postTarget(data);
      setPostTarget(false);
      cbPost.onSuccess();
      // getTargets();
    } catch (error) {
      setPostTarget(false);
      if (cbPost.onError) {
        cbPost.onError(error);
      } else if (isBadRequest(error)) {
        toast.error('Can not create new target!');
      } else {
        await errorHandler(error);
      }
    }
  };

  const putTarget = async (id: number, data: PutTargetParams) => {
    if (isPutTarget) return;
    try {
      setPutTarget(true);
      await ApiClient.putTarget(id, data);
      setPutTarget(false);
      cbPut.onSuccess();
      // getTargets();
    } catch (error) {
      setPutTarget(false);
      if (cbPut.onError) {
        cbPut.onError(error);
      } else if (isBadRequest(error)) {
        toast.error('Can not update this target!');
      } else {
        await errorHandler(error);
      }
    }
  };

  // auto call in the first time with no default filter
  useEffect(() => {
    getTargets().then();
  }, [getTargets]);
  return { targets, hasMore, isGetTargets, postTarget, putTarget, isPostTarget, isPutTarget };
}
