/* eslint-disable react-hooks/exhaustive-deps */
import { useFetcher } from '@/common/hooks';
import { TargetApis } from '@/target/apis';
import { Target, TargetFilter } from '@/target/types';
import React, { useEffect, useRef, useState } from 'react';
import { KeyedMutator } from 'swr';

interface TargetCallback {
  onSuccess: (id?: number, target?: Target) => void;
  onError?: (error: unknown) => void;
}
interface TargetHookValues {
  targets: Target[];
  hasMore: boolean;
  isGetTargets: boolean;
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
  const { filter, autoLoad = true } = params ?? {};

  const targetsRef = useRef<Target[]>();
  const [targets, setTargets] = useState<Target[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);

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

  useEffect(() => {
    targetsRef.current = targets;
  }, [targets]);

  return {
    targets,
    hasMore,
    isGetTargets: isInitializing,
    mutate,
    isValidating,
  };
}
