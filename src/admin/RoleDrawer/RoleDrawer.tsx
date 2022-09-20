import { Button, ConfirmModal, Drawer, Form } from '@/common/components';
import { withMountOnOpen } from '@/common/hocs';
import { useDisclosure } from '@/common/hooks';
import { OpenClose } from '@/common/types';
import { Department } from '@/main/entity';
import { RoleApis } from '@/role/apis';
import { VisibilityConfig } from '@/role/types';
import { useAssignableCategories } from '@/role/useAssignableCategories';
import { useAssignableDepartments } from '@/role/useAssignableDepartments';
import { useAssignableVendors } from '@/role/useAssignableVendors';
import { useRole } from '@/role/useRole';
import { groupBy } from 'lodash-es';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AccessControlTabs } from './AccessControlTabs';

export type RoleDrawerProps = OpenClose;

export const RoleDrawer = withMountOnOpen()(({ onClose, open }: RoleDrawerProps) => {
  const history = useHistory();
  const confirmSaveDisclosure = useDisclosure();
  const saveSuccessDisclosure = useDisclosure();

  const { role } = useRole(0);

  const methods = useForm();
  const {
    reset,
    formState: { isSubmitting },
  } = methods;

  const { assignableCategories } = useAssignableCategories();
  const { assignableVendors } = useAssignableVendors();
  const { assignableDepartments } = useAssignableDepartments();

  React.useEffect(() => {
    if (role && assignableCategories.length) {
      const { categories, departments, vendors } = role;

      const categoriesGroupedById = groupBy(categories, 'id');
      const departmentsGroupedById = groupBy(departments, 'id');
      const vendorsGroupedById = groupBy(vendors, 'id');

      reset({
        ...role,
        name: '',
        description: '',
        departments: assignableDepartments
          .reduce((acc, cur) => [...acc, cur, ...(cur.children ?? [])], [] as Department[])
          .map((department) => ({
            ...department,
            visible: departmentsGroupedById[department.id]?.[0].visible ?? true,
            default: true,
          })),
        categories: assignableCategories.map((category) => ({
          ...category,
          visible: categoriesGroupedById[category.id]?.[0].visible ?? true,
          default: true,
        })),
        vendors: assignableVendors.map((vendor) => ({
          ...vendor,
          visible: vendorsGroupedById[vendor.id]?.[0].visible ?? true,
          default: true,
        })),
      });
    }
  }, [assignableCategories, assignableDepartments, assignableVendors, reset, role]);

  const handleUpdateConfirm = () => {
    confirmSaveDisclosure.close();
    saveSuccessDisclosure.open();
  };

  const handleCreate = async (data: any) => {
    try {
      await RoleApis.create({
        ...data,
        departments: data.departments.map(
          ({ id, visible, default: _default }: VisibilityConfig) => ({
            id,
            visible,
            useDefault: _default === visible,
          }),
        ),
        categories: data.categories.map(({ id, visible, default: _default }: VisibilityConfig) => ({
          id,
          visible,
          useDefault: _default === visible,
        })),
        vendors: data.vendors.map(({ id, visible, default: _default }: VisibilityConfig) => ({
          id,
          visible,
          useDefault: _default === visible,
        })),
      });
      saveSuccessDisclosure.open();
    } catch (e: any) {
      toast.error(e.details.message);
      throw e;
    }
  };

  const handleSuccessConfirm = () => {
    saveSuccessDisclosure.close();
    history.push('/admin/team-members');
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <ConfirmModal
        open={confirmSaveDisclosure.isOpen}
        onClose={confirmSaveDisclosure.close}
        onCancel={confirmSaveDisclosure.close}
        onConfirm={handleUpdateConfirm}
        variant="alert"
        title="Update the settings for this role?"
        content="This will affect view access for all team members within this role."
      />
      <ConfirmModal
        open={saveSuccessDisclosure.isOpen}
        onClose={saveSuccessDisclosure.close}
        onConfirm={handleSuccessConfirm}
        variant="success"
        confirmButtonLabel="Manage"
        title="New role created!"
        content="You can also manage team members and their access from the team members tab."
      />
      <Form methods={methods} onSubmit={handleCreate} className="flex flex-col h-full">
        <div className="bg-Gray-12 p-6 border-b border-solid border-Gray-11">
          <h2 className="text-lg font-medium">Roles</h2>
          <p className="text-sm text-[#6B7280] mt-1">
            By default Base Users can see all transactions. Deselect any property to hide them from
            all team members. Changes to the Base User will affect all team members.
          </p>
        </div>
        <div className="flex flex-col flex-1 px-6 pt-4 overflow-hidden">
          <label className="font-bold text-xs">Role Name</label>
          <Form.Input name="name" placeholder="" className="mt-2" rules={{ required: true }} />
          <div className="mt-4">
            <label className="font-bold text-xs">Description</label>
            <Form.Input
              name="description"
              placeholder=""
              className="mt-2"
              rules={{ required: true }}
            />
          </div>
          <AccessControlTabs isBase={role?.id === 0} />
        </div>
        <div className="py-5 px-6 flex justify-end border-t border-solid border-Gray-28">
          <Button variant="ghost" colorScheme="gray">
            Cancel
          </Button>
          <Button variant="solid" type="submit" loading={isSubmitting}>
            Save
          </Button>
        </div>
      </Form>
    </Drawer>
  );
});
