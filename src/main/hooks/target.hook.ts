/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';

import { isApiError } from '@error/utils';
import { TargetFilter, PostTargetParams, PutTargetParams } from '@api/types';
import { Target } from '@main/entity';

import { useApi } from '@api';
import { useErrorHandler } from '@error/hooks';

interface TargetCallback {
  onSuccess: (id?: number, target?: Target) => void;
  onError?: (error: unknown) => void;
}
interface TargetHookValues {
  targets: Target[];
  hasMore: boolean;
  isGetTargets: boolean;
  postTarget: (data: PostTargetParams) => Promise<void>;
  putTarget: (id: number, data: PutTargetParams) => Promise<void>;
  deleteTarget: (id: number) => Promise<void>;
  isPostTarget: boolean;
  isPutTarget: boolean;
  isDeleteTarget: boolean;
  removeItem: (id: number) => void;
}

export interface UseTargetParams {
  filter?: TargetFilter;
  cbPost?: TargetCallback;
  cbPut?: TargetCallback;
  cbDelete?: TargetCallback;
  autoLoad?: boolean;
}

export function useTarget({
  filter,
  cbPost,
  cbPut,
  cbDelete,
  autoLoad = true,
}: UseTargetParams): TargetHookValues {
  const targetsRef = useRef<Target[]>();
  const [targets, setTargets] = useState<Target[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isGetTargets, setGetTargets] = useState<boolean>(false);
  const [isPostTarget, setPostTarget] = useState<boolean>(false);
  const [isPutTarget, setPutTarget] = useState<boolean>(false);
  const [isDeleteTarget, setDeleteTarget] = useState<boolean>(false);

  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getTargets = useCallback(async () => {
    try {
      setGetTargets(true);
      const res = await ApiClient.getTargets(filter);
      setTargets((pre) => [...pre, ...res]);
      setHasMore(res.length >= (filter?.limit || 0));
      setGetTargets(false);
    } catch (error) {
      if (isApiError(error)) {
        toast.error(error.details?.message);
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
      cbPost?.onSuccess();
    } catch (error) {
      if (cbPost && cbPost.onError) {
        cbPost.onError(error);
      }
      if (isApiError(error)) {
        toast.error(error.details?.message);
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
      const newTarget = await ApiClient.putTarget(id, data);
      cbPut?.onSuccess(id, newTarget);
    } catch (error) {
      if (cbPut?.onError) {
        cbPut?.onError(error);
      }
      if (isApiError(error)) {
        toast.error(error.details?.message);
      } else {
        await errorHandler(error);
      }
    } finally {
      setPutTarget(false);
    }
  };

  const deleteTarget = async (id: number) => {
    if (isPutTarget) return;
    try {
      setDeleteTarget(true);
      await ApiClient.deleteTarget(id);
      if (targetsRef.current) {
        const newTargets = targetsRef.current.filter((item: Target) => item?.id !== id);
        setTargets(newTargets);
      }
      cbDelete?.onSuccess(id);
    } catch (error) {
      if (cbDelete?.onError) {
        cbDelete?.onError(error);
      }
      if (isApiError(error)) {
        toast.error(error.details?.message);
      } else {
        await errorHandler(error);
      }
    } finally {
      setDeleteTarget(false);
    }
  };

  const removeItem = (id: number) => {
    if (targetsRef.current) {
      const newTargets = targetsRef.current.filter((item: Target) => item?.id !== id);
      setTargets(newTargets);
    }
  };

  useEffect(() => {
    targetsRef.current = targets;
  }, [targets]);

  // auto call in the first time with no default filter
  useEffect(() => {
    if (autoLoad) {
      getTargets().then();
    }
  }, [getTargets]);

  return {
    targets,
    hasMore,
    isGetTargets,
    postTarget,
    putTarget,
    deleteTarget,
    isPostTarget,
    isPutTarget,
    isDeleteTarget,
    removeItem,
  };
}
