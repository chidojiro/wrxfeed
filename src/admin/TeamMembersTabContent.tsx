import { useDisclosure } from '@/common/hooks';
import { RemoveRoleModal } from './RemoveRoleModal';

export const TeamMembersTabContent = () => {
  const removeRoleDisclosure = useDisclosure();

  return (
    <div className="flex flex-col">
      <RemoveRoleModal
        open={removeRoleDisclosure.isOpen}
        role={{ name: 'Admin' }}
        onClose={removeRoleDisclosure.close}
      />
      <div className="space-y-2">
        <h1 className="text-2xl leading-7 font-semibold text-primary">Team Members</h1>
        <p className="text-sm leading-4 font-normal text-Gray-6">
          Manage all team members and their account roles.
        </p>
      </div>
    </div>
  );
};
