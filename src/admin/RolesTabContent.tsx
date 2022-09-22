import { AddSmallSolid } from '@/assets';
import { Button, Divider, ListLoader } from '@/common/components';
import { useDisclosure } from '@/common/hooks';
import { useRoles } from '@/role/useRoles';
import React from 'react';
import { RoleCard } from './RoleCard';
import { RoleDrawer } from './RoleDrawer';

export const RolesTabContent = () => {
  const [editingRoleId, setEditingRoleId] = React.useState<number>();
  const roleDrawerDisclosure = useDisclosure();
  const { roles, isInitializingRoles } = useRoles();

  const startEditingRole = (id: number) => {
    setEditingRoleId(id);
    roleDrawerDisclosure.open();
  };

  const customRoles = roles.filter((item) => item.id !== 0 && item.name !== 'Admin');

  return (
    <ListLoader loading={isInitializingRoles}>
      <div className="flex flex-col max-w-[500px]">
        <RoleDrawer
          roleId={editingRoleId}
          open={roleDrawerDisclosure.isOpen}
          onClose={roleDrawerDisclosure.close}
        />
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
        <div className="flex flex-col space-y-4">
          {roles
            .filter((item) => item.id === 0 || item.name === 'Admin')
            .map((role) => (
              <RoleCard
                key={role.id}
                title={role.name}
                description={role.description}
                onClick={() => startEditingRole(role.id)}
              />
            ))}
        </div>
        {!!customRoles.length && (
          <>
            <Divider className="mt-8" direction="horizontal" />
            <p className="font-semibold text-sm leading-4 tracking-tight mt-3 mb-8">Custom Roles</p>
            <div className="flex flex-col space-y-6">
              {customRoles.map((role) => (
                <RoleCard
                  key={role.id}
                  title={role.name}
                  description={role.description}
                  onClick={() => startEditingRole(role.id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </ListLoader>
  );
};
