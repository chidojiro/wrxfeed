import { ListLoader } from '@/common/components';
import { useDisclosure } from '@/common/hooks';
import { AssertUtils } from '@/common/utils';
import { useUsers } from '@/profile/useUsers';
import React from 'react';
import { RemoveRoleModal } from './RemoveRoleModal';
import { SearchInput } from './RoleDrawer/SearchInput';
import { TeamMembersTable } from './TeamMembersTable';

export const TeamMembersTabContent = () => {
  const [toBeRemovedRoleId, setToBeRemovedRoleId] = React.useState<number>();
  const removeRoleDisclosure = useDisclosure();
  const { users, isValidatingUsers } = useUsers();
  const [keyword, setKeyWord] = React.useState<string>('');

  const handleSearchUsers = (value: React.SetStateAction<string>) => {
    setKeyWord(value);
  };

  return (
    <div className="flex-1">
      {!AssertUtils.isNullOrUndefined(toBeRemovedRoleId) && (
        <RemoveRoleModal
          open={removeRoleDisclosure.isOpen}
          roleId={toBeRemovedRoleId}
          onClose={removeRoleDisclosure.close}
        />
      )}
      <div className="space-y-2">
        <h1 className="text-2xl leading-7 font-semibold text-primary">Team Members</h1>
        <p className="text-sm leading-4 font-normal text-Gray-6">
          Manage all team members and their account roles.
        </p>
      </div>
      <ListLoader loading={isValidatingUsers}>
        <SearchInput
          className="w-56 lg:w-72 ml-auto mt-6 mb-4"
          placeholder="Search by team or name"
          onChange={(e) => handleSearchUsers(e.target.value)}
        />
        <TeamMembersTable
          className="w-full"
          users={users.filter(
            (user) =>
              user.fullName?.toLowerCase().includes(keyword.toLowerCase()) ||
              user.department?.name.toLowerCase().includes(keyword.toLowerCase()),
          )}
        />
      </ListLoader>
    </div>
  );
};
