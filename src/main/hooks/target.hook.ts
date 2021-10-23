import { useApi } from '@api';
import { TargetFilter, PostTargetParams, PutTargetParams } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { isBadRequest } from '@error/utils';
import { Target } from '@main/entity';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface TargetHookValues {
  targets: Target[];
  hasMore: boolean;
  isGetTargets: boolean;
  postTarget: (data: PostTargetParams) => Promise<void>;
  putTarget: (id: number, data: PutTargetParams) => Promise<void>;
  isPostTarget: boolean;
  isPutTarget: boolean;
}
export function useTarget(filter: TargetFilter): TargetHookValues {
  const [targets, setTargets] = useState<Target[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isGetTargets, setGetTargets] = useState<boolean>(false);
  const [isPostTarget, setPostTarget] = useState<boolean>(false);
  const [isPutTarget, setPutTarget] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getTargets = useCallback(async () => {
    try {
      setGetTargets(true);
      const res = await ApiClient.getTargets(filter);
      setTargets((prevTrans) => [...prevTrans, ...res]);
      setHasMore(!!res.length);
      setGetTargets(false);
    } catch (error) {
      if (isBadRequest(error)) {
        toast.error('Can not get targets');
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
      const res = await ApiClient.postTarget(data);
      setPostTarget(false);
      console.log({ res });
    } catch (error) {
      setPostTarget(false);
      if (isBadRequest(error)) {
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
      const res = await ApiClient.putTarget(id, data);
      setPutTarget(false);
      console.log({ res });
    } catch (error) {
      setPutTarget(false);
      if (isBadRequest(error)) {
        toast.error('Can not update target!');
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
