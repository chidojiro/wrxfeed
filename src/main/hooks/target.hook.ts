/* eslint-disable react-hooks/exhaustive-deps */
import { useFetcher } from '@/common/hooks';
import { useErrorHandler } from '@/error/hooks';
import { isApiError } from '@/error/utils';
import { TargetApis } from '@/target/apis';
import { CreateTargetPayload, Target, TargetFilter, UpdateTargetPayload } from '@/target/types';
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
  postTarget: (data: CreateTargetPayload) => Promise<void>;
  putTarget: (id: number, data: UpdateTargetPayload) => Promise<void>;
  deleteTarget: (id: number) => Promise<void>;
  isPostTarget: boolean;
  isPutTarget: boolean;
  isDeleteTarget: boolean;
  removeItem: (id: number) => void;
  mutate: KeyedMutator<Target[]>;
  isValidating: boolean;
}

export interface UseTargetParams {
  filter?: TargetFilter;
  cbPost?: TargetCallback;
  cbPut?: TargetCallback;
  cbDelete?: TargetCallback;
  autoLoad?: boolean;
}

export function useTarget(params?: UseTargetParams): TargetHookValues {
  const { filter, cbPost, cbPut, cbDelete, autoLoad = true } = params ?? {};

  const targetsRef = useRef<Target[]>();
  const [targets, setTargets] = useState<Target[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isPostTarget, setPostTarget] = useState<boolean>(false);
  const [isPutTarget, setPutTarget] = useState<boolean>(false);
  const [isDeleteTarget, setDeleteTarget] = useState<boolean>(false);

  const errorHandler = useErrorHandler();

  const {
    data = [],
    isInitializing,
    mutate,
    isValidating,
  } = useFetcher(autoLoad && ['/targets', filter], () => TargetApis.getList({ ...filter }));

  React.useEffect(() => {
    if (filter?.offset !== 0) {
      setTargets((pre) => [...pre, ...data]);
    } else {
      setTargets(data);
    }
    setHasMore(data.length >= (filter?.limit || 0));
  }, [data]);

  const postTarget = async (data: CreateTargetPayload) => {
    if (isPostTarget) return;
    try {
      setPostTarget(true);
      await TargetApis.create(data);
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

  const putTarget = async (id: number, data: UpdateTargetPayload) => {
    if (isPutTarget) return;
    try {
      setPutTarget(true);
      const newTarget = await TargetApis.update(id, data);
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
      await TargetApis.delete(id);
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
    isGetTargets: isInitializing,
    postTarget,
    putTarget,
    deleteTarget,
    isPostTarget,
    isPutTarget,
    isDeleteTarget,
    removeItem,
    mutate,
    isValidating,
  };
}
