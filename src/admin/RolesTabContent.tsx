import { Divider } from '@/common/components';
import { RoleCard } from './RoleCard';
import { RolesDrawer } from './RolesDrawer';

export const RolesTabContent = () => {
  return (
    <div>
      <RolesDrawer open />
      <div className="flex flex-col space-y-4 w-full sm:min-w-[491px]">
        <RoleCard title="Base User" description="Default permissions for all team members" />
        <RoleCard title="Admin" description="Access to Admin Portal and role creation" />
      </div>
      <Divider className="mt-8" direction="horizontal" />
      <p className="font-semibold text-sm leading-4 tracking-tight mt-3 mb-8">Custom Roles</p>
    </div>
  );
};
