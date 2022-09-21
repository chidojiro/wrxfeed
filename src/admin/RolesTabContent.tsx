import { AddSmallSolid } from '@/assets';
import { Button, Divider, OverlayLoader } from '@/common/components';
import { useDisclosure } from '@/common/hooks';
import { RoleCard } from './RoleCard';
import { RoleDrawer } from './RoleDrawer';
import { useRoles } from './useRoles';

export const RolesTabContent = () => {
  const roleDrawerDisclosure = useDisclosure();
  const { roles, isInitializingRoles } = useRoles();

  return (
    <div className="flex flex-col">
      <RoleDrawer open={roleDrawerDisclosure.isOpen} onClose={roleDrawerDisclosure.close} />
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
          onClick={roleDrawerDisclosure.open}
        >
          Add role
        </Button>
      </div>
      <OverlayLoader loading={isInitializingRoles}>
        <>
          <div className="flex flex-col space-y-4">
            {roles
              .filter((i) => i.id === 0 || i.id === 5)
              .map((role) => (
                <RoleCard
                  key={role.id}
                  title={role.name}
                  description={role.description}
                  onClick={roleDrawerDisclosure.open}
                />
              ))}
          </div>
          <Divider className="mt-8" direction="horizontal" />
          <p className="font-semibold text-sm leading-4 tracking-tight mt-3 mb-8">Custom Roles</p>
          <div className="flex flex-col space-y-6">
            {roles
              .filter((i) => i.id !== 0 && i.id !== 5)
              .map((role) => (
                <RoleCard
                  key={role.id}
                  title={role.name}
                  description={role.description}
                  onClick={roleDrawerDisclosure.open}
                />
              ))}
          </div>
        </>
      </OverlayLoader>
    </div>
  );
};
