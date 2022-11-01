import { EMPTY_ARRAY } from '@/common/constants';
import { useUsers } from '@/profile/useUsers';
import { useDepartments } from '@/team/useDepartments';
import React from 'react';

export const useMentions = () => {
  const { users = EMPTY_ARRAY, isValidatingUsers } = useUsers();
  const { departments, isValidatingDepartments } = useDepartments({ includeSub: true });

  const mentions = React.useMemo(
    () =>
      [
        users.map(({ id, fullName, email, avatar }) => ({
          id,
          name: fullName ?? email ?? 'unknown',
          avatar,
          type: 'USER',
        })),
        departments.map(({ id, name }) => ({
          id,
          name,
          type: 'DEPARTMENT',
        })),
      ].flat(),
    [departments, users],
  );

  return React.useMemo(
    () => ({ mentions, isLoading: isValidatingDepartments || isValidatingUsers }),
    [isValidatingDepartments, isValidatingUsers, mentions],
  );
};
