/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';

import { useApi } from '@api';
import { GetUsersFilter } from '@api/types';
import { useErrorHandler } from '@error/hooks';
import { User } from '@main/entity';

interface UsersHookValues {
  users: User[];
  hasMore: boolean;
  isLoading: boolean;
}

export function useGetUsers(filter: GetUsersFilter): UsersHookValues {
  const [users, setUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const ApiClient = useApi();
  const errorHandler = useErrorHandler();

  const getUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getUsers(filter);
      if (filter.pagination?.offset) {
        setUsers((prevTrans) => [...prevTrans, ...res]);
      } else {
        setUsers(res);
      }
      setHasMore(!!res.length);
    } catch (error) {
      await errorHandler(error);
    } finally {
      setLoading(false);
    }
  }, [ApiClient, errorHandler, filter]);

  useEffect(() => {
    getUsers();
  }, []);

  // useEffect(() => {
  //   getUsers().then();
  // }, [getUsers]);
  return { users, hasMore, isLoading };
}
