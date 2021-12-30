/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import { useApi } from '@api';
import { targetState } from '@main/states/target.state';
import { TargetFilter, PostTargetParams, PutTargetParams } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { Target } from '@main/entity';

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
  const [targets, setTargets] = useRecoilState<Target[]>(targetState);
  // const [targets, setTargets] = useState<Target[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isGetTargets, setGetTargets] = useState<boolean>(false);
  const [isPostTarget, setPostTarget] = useState<boolean>(false);
  const [isPutTarget, setPutTarget] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const stackTargetsByTheLargestMonthlySpend = (data: Target[]): Target[] => {
    let targetStacked = data.sort((a: Target, b: Target) => (b?.total ?? 0) - (a?.total ?? 0));
    targetStacked = data.sort(
      (a: Target, b: Target) => (b?.id !== null ? 1 : 0) - (a?.id !== null ? 1 : 0),
    );
    return targetStacked;
  };

  const getTargets = useCallback(async () => {
    try {
      setGetTargets(true);
      const res = await ApiClient.getTargets(filter);
      const merged = targets.concat(res);
      const targetMap = new Map();
      merged.forEach((target) => {
        targetMap.set(target?.depId, target);
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
      cbPost.onSuccess();
      // getTargets();
    } catch (error) {
      if (cbPost.onError) {
        cbPost.onError(error);
      } else if (isBadRequest(error)) {
        toast.error('Can not create new target!');
      } else {
        await errorHandler(error);
      }
    } finally {
      setPostTarget(false);
    }
  };

  const putTarget = async (id: number, data: PutTargetParams) => {
    if (isPutTarget) return;
    try {
      setPutTarget(true);
      await ApiClient.putTarget(id, data);
      cbPut.onSuccess();
      // getTargets();
    } catch (error) {
      if (cbPut.onError) {
        cbPut.onError(error);
      } else if (isBadRequest(error)) {
        toast.error('Can not update this target!');
      } else {
        await errorHandler(error);
      }
    } finally {
      setPutTarget(false);
    }
  };

  // auto call in the first time with no default filter
  useEffect(() => {
    getTargets().then();
  }, [getTargets]);

  return { targets, hasMore, isGetTargets, postTarget, putTarget, isPostTarget, isPutTarget };
}
