import { AddSmallSolid } from '@/assets';
import { Button, Divider } from '@/common/components';
import { RoleCard } from './RoleCard';
import { RolesDrawer } from './RolesDrawer';

export const RolesTabContent = () => {
  return (
    <div className="flex flex-col">
      <RolesDrawer open />
      <div className="flex justify-between items-center">
        <div className="space-y-2 mb-8">
          <h1 className="text-2xl leading-7 font-semibold text-primary">Roles</h1>
          <p className="text-sm leading-4 font-normal text-Gray-6">
            Manage account roles and view access.
          </p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          colorScheme="gray"
          className="text-xs font-semibold"
          iconLeft={<AddSmallSolid className="h-3.5 w-3.5" />}
        >
          Add row
        </Button>
      </div>
      <div className="flex flex-col space-y-4 w-full sm:min-w-[491px]">
        <RoleCard title="Base User" description="Default permissions for all team members" />
        <RoleCard title="Admin" description="Access to Admin Portal and role creation" />
      </div>
      <Divider className="mt-8" direction="horizontal" />
      <p className="font-semibold text-sm leading-4 tracking-tight mt-3 mb-8">Custom Roles</p>
      <div className="flex flex-col space-y-6">
        <RoleCard title="Legal" description="View access for Legal" />
        <RoleCard title="Intern" description="View access for Intern" />
      </div>
    </div>
  );
};
