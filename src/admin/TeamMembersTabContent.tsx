import { useDisclosure } from '@/common/hooks';
import { AssertUtils } from '@/common/utils';
import React from 'react';
import { RemoveRoleModal } from './RemoveRoleModal';
import { TeamMembersTable } from './TeamMembersTable';

export const TeamMembersTabContent = () => {
  const [toBeRemovedRoleId, setToBeRemovedRoleId] = React.useState<number>();
  const removeRoleDisclosure = useDisclosure();

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
      <TeamMembersTable className="w-full" />
    </div>
  );
};
