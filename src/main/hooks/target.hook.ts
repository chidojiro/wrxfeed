/* eslint-disable react-hooks/exhaustive-deps */
import { useApi } from '@/api';
import { PostTargetParams, PutTargetParams, TargetFilter } from '@/api/types';
import { useFetcher } from '@/common/hooks';
import { useErrorHandler } from '@/error/hooks';
import { isApiError } from '@/error/utils';
import { Target } from '@/main/entity';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { KeyedMutator } from 'swr';

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
  mutate: KeyedMutator<Target[]>;
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
  const [isPostTarget, setPostTarget] = useState<boolean>(false);
  const [isPutTarget, setPutTarget] = useState<boolean>(false);
  const [isDeleteTarget, setDeleteTarget] = useState<boolean>(false);

  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const {
    data = [],
    isLoading,
    mutate,
  } = useFetcher(autoLoad && ['/targets', JSON.stringify(filter)], () =>
    ApiClient.getTargets(filter),
  );

  React.useEffect(() => {
    setTargets((pre) => [...pre, ...data]);
    setHasMore(data.length >= (filter?.limit || 0));
  }, [data]);

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

  return {
    targets,
    hasMore,
    isGetTargets: isLoading,
    postTarget,
    putTarget,
    deleteTarget,
    isPostTarget,
    isPutTarget,
    isDeleteTarget,
    removeItem,
    mutate,
  };
}
