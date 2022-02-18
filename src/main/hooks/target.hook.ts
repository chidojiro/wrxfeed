/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';

import { isApiError } from '@error/utils';
import { TargetFilter, PostTargetParams, PutTargetParams } from '@api/types';
import { Target } from '@main/entity';

import { useApi } from '@api';
import { useErrorHandler } from '@error/hooks';
import { targetState } from '@main/states/target.state';
import { stackTargetsBySpend } from '@main/utils';
import cloneDeep from 'lodash.clonedeep';

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
  deleteTarget: (id: number, data: PutTargetParams) => Promise<void>;
  isPostTarget: boolean;
  isPutTarget: boolean;
  isDeleteTarget: boolean;
}
export function useTarget(
  filter: TargetFilter,
  cbPost: TargetCallback,
  cbPut: TargetCallback,
  cbDelete: TargetCallback,
  isSaveGlobal?: boolean,
): TargetHookValues {
  const [targetsGlobal, setTargetsGlobal] = useRecoilState<Target[]>(targetState);
  const [targetsLocal, setTargetsLocal] = useState<Target[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isGetTargets, setGetTargets] = useState<boolean>(false);
  const [isPostTarget, setPostTarget] = useState<boolean>(false);
  const [isPutTarget, setPutTarget] = useState<boolean>(false);
  const [isDeleteTarget, setDeleteTarget] = useState<boolean>(false);

  const targets = isSaveGlobal ? targetsGlobal : targetsLocal;
  const setTargets = isSaveGlobal ? setTargetsGlobal : setTargetsLocal;

  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getTargets = useCallback(async () => {
    try {
      setGetTargets(true);
      const res = await ApiClient.getTargets(filter);
      const newTargets: Target[] = cloneDeep(targets);
      res.forEach((tar: Target) => {
        const isHaveIndex = newTargets.findIndex((item) => item?.id === tar.id);
        if (isHaveIndex !== -1) {
          newTargets[isHaveIndex] = tar;
        } else {
          newTargets.unshift(tar);
        }
      });
      setTargets(stackTargetsBySpend(newTargets));
      setHasMore(!!res.length);
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
      cbPost.onSuccess();
    } catch (error) {
      if (cbPost.onError) {
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
      await ApiClient.putTarget(id, data);
      cbPut.onSuccess();
    } catch (error) {
      if (cbPut.onError) {
        cbPut.onError(error);
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

  const deleteTarget = async (id: number, data: PutTargetParams) => {
    if (isPutTarget) return;
    try {
      setDeleteTarget(true);
      await ApiClient.deleteTarget(id, data);
      const newTargets = targets.filter((item: Target) => item?.id !== id);
      setTargets(newTargets);
      cbDelete.onSuccess();
    } catch (error) {
      if (cbDelete.onError) {
        cbDelete.onError(error);
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

  // auto call in the first time with no default filter
  useEffect(() => {
    getTargets().then();
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
  };
}
