import { Button, Checkbox, ConfirmModal, Drawer, Form } from '@/common/components';
import { withMountOnOpen } from '@/common/hocs';
import { useDisclosure } from '@/common/hooks';
import { OpenClose } from '@/common/types';
import { AssertUtils } from '@/common/utils';
import { Department } from '@/main/entity';
import { RoleApis } from '@/role/apis';
import { VisibilityConfig } from '@/role/types';
import { useAssignableCategories } from '@/role/useAssignableCategories';
import { useAssignableDepartments } from '@/role/useAssignableDepartments';
import { useAssignableVendors } from '@/role/useAssignableVendors';
import { useRole } from '@/role/useRole';
import { useRoles } from '@/role/useRoles';
import { isAdmin, isBaseUser } from '@/role/utils';
import { groupBy } from 'lodash-es';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AccessControlTabs, TabValue } from './AccessControlTabs';

export type RoleDrawerProps = OpenClose & {
  roleId?: number;
  isCreate?: boolean;
};

const isAllItemsChecked = (collection: any[] = []) =>
  !collection.find((item: any) => !item.visible);

const isAllItemsUnchecked = (collection: any[] = []) =>
  !collection.find((item: any) => item.visible);

const uncheckAllItems = (collection: any[] = []) =>
  collection.map((item: any) => ({ ...item, visible: false }));

const checkAllItems = (collection: any[] = []) =>
  collection.map((item: any) => ({ ...item, visible: true }));

export const RoleDrawer = withMountOnOpen()(
  ({ onClose, open, roleId, isCreate }: RoleDrawerProps) => {
    const [tab, setTab] = React.useState<TabValue>('teams');

    const history = useHistory();
    const confirmUpdateDisclosure = useDisclosure();
    const saveSuccessDisclosure = useDisclosure();

    const isUpdate = !AssertUtils.isNullOrUndefined(roleId);

    const { role, isInitializingRole } = useRole(roleId ?? 0);

    const { mutateRoles } = useRoles();

    const methods = useForm();
    const {
      reset,
      setValue,
      getValues,
      watch,
      formState: { isSubmitting },
    } = methods;

    const formValue = watch();

    const getAllDepartments = React.useCallback(() => getValues('departments'), [getValues]);
    const getAllCategories = React.useCallback(() => getValues().categories, [getValues]);
    const getAllVendors = React.useCallback(() => getValues().vendors, [getValues]);

    const isAllChecked = React.useMemo(() => {
      if (tab === 'teams') return isAllItemsChecked(formValue.departments);

      if (tab === 'categories') return isAllItemsChecked(formValue.categories);

      if (tab === 'vendors') return isAllItemsChecked(formValue.vendors);

      return false;
    }, [formValue.categories, formValue.departments, formValue.vendors, tab]);

    const isAllUnChecked = React.useMemo(() => {
      if (tab === 'teams') return isAllItemsUnchecked(formValue.departments);

      if (tab === 'categories') return isAllItemsUnchecked(formValue.categories);

      if (tab === 'vendors') return isAllItemsUnchecked(formValue.vendors);

      return false;
    }, [formValue.categories, formValue.departments, formValue.vendors, tab]);

    const checkAll = () => {
      switch (tab) {
        case 'teams': {
          setValue('departments', checkAllItems(getAllDepartments()));
          break;
        }

        case 'categories': {
          setValue('categories', checkAllItems(getAllCategories()));
          break;
        }

        case 'vendors': {
          setValue('vendors', checkAllItems(getAllVendors()));
          break;
        }

        default:
          break;
      }
    };

    const uncheckAll = () => {
      switch (tab) {
        case 'teams': {
          setValue('departments', uncheckAllItems(getAllDepartments()));
          break;
        }

        case 'categories': {
          setValue('categories', uncheckAllItems(getAllCategories()));
          break;
        }

        case 'vendors': {
          setValue('vendors', uncheckAllItems(getAllVendors()));
          break;
        }

        default:
          break;
      }
    };

    const { assignableCategories } = useAssignableCategories();
    const { assignableVendors } = useAssignableVendors();
    const { assignableDepartments } = useAssignableDepartments();

    React.useEffect(() => {
      if (role) {
        const { categories, departments, vendors } = role;

        const categoriesGroupedById = groupBy(categories, 'id');
        const departmentsGroupedById = groupBy(departments, 'id');
        const vendorsGroupedById = groupBy(vendors, 'id');

        reset({
          ...role,
          name: isUpdate ? role.name : '',
          description: isUpdate ? role.description : '',
          departments: assignableDepartments
            .reduce((acc, cur) => [...acc, cur, ...(cur.children ?? [])], [] as Department[])
            .map((department) => ({
              ...department,
              ...departmentsGroupedById[department.id]?.[0],
              default: departmentsGroupedById[department.id]?.[0].default ?? true,
              visible: departmentsGroupedById[department.id]?.[0].visible ?? true,
            })),
          categories: assignableCategories.map((category) => ({
            ...category,
            ...categoriesGroupedById[category.id]?.[0],
            default: categoriesGroupedById[category.id]?.[0].default ?? true,
            visible: categoriesGroupedById[category.id]?.[0].visible ?? true,
          })),
          vendors: assignableVendors.map((vendor) => ({
            ...vendor,
            ...vendorsGroupedById[vendor.id]?.[0],
            default: vendorsGroupedById[vendor.id]?.[0].default ?? true,
            visible: vendorsGroupedById[vendor.id]?.[0].visible ?? true,
          })),
        });
      }
    }, [
      assignableCategories,
      assignableDepartments,
      assignableVendors,
      isCreate,
      isUpdate,
      reset,
      role,
    ]);

    const transformFormDataToRequestPayload = (data: any) => ({
      ...data,
      departments: data.departments.map(({ id, visible, default: _default }: VisibilityConfig) => ({
        id,
        visible,
        useDefault: _default === visible,
      })),
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

    const handleUpdateConfirm = async () => {
      const data = getValues() as any;

      try {
        await RoleApis.update(role!.id, transformFormDataToRequestPayload(data));
        mutateRoles();
        closeConfirmUpdateModal();
      } catch (e: any) {
        toast.error(e.details.message);
        throw e;
      }
    };

    const handleCreate = async (data: any) => {
      try {
        await RoleApis.create(transformFormDataToRequestPayload(data));
        mutateRoles();
        saveSuccessDisclosure.open();
      } catch (e: any) {
        toast.error(e.details.message);
        throw e;
      }
    };

    const closeConfirmUpdateModal = () => {
      saveSuccessDisclosure.close();
      onClose?.();
    };

    const closeConfirmSuccessModal = () => {
      saveSuccessDisclosure.close();
      onClose?.();
    };

    const handleSuccessConfirm = () => {
      saveSuccessDisclosure.close();
      history.push('/admin/team-members');
    };

    return (
      <Drawer open={open} onClose={onClose}>
        <ConfirmModal
          open={confirmUpdateDisclosure.isOpen}
          onClose={closeConfirmUpdateModal}
          onCancel={closeConfirmUpdateModal}
          onConfirm={handleUpdateConfirm}
          variant="alert"
          title="Update the settings for this role?"
          content="This will affect view access for all team members within this role."
        />
        <ConfirmModal
          open={saveSuccessDisclosure.isOpen}
          onClose={closeConfirmSuccessModal}
          onConfirm={handleSuccessConfirm}
          variant="success"
          confirmButtonLabel="Manage"
          title="New role created!"
          content="You can also manage team members and their access from the team members tab."
        />
        <Form
          methods={methods}
          onSubmit={isUpdate ? confirmUpdateDisclosure.open : handleCreate}
          className="flex flex-col h-full"
        >
          <div className="bg-Gray-12 p-6 border-b border-solid border-Gray-11">
            <h2 className="text-lg font-medium">Roles</h2>
            <p className="text-sm text-[#6B7280] mt-1">
              All roles initially inherit the default Base User properties. Deselect any property to
              hide them from team members within this role. Changed properties will stay{' '}
              <span className="text-Accent-2">highlighted.</span>
            </p>
          </div>
          <div className="flex flex-col flex-1 px-6 pt-4 overflow-hidden">
            <label className="font-bold text-xs">Role Name</label>
            <Form.Input
              name="name"
              placeholder=""
              className="mt-2"
              rules={{ required: true }}
              disabled={
                isInitializingRole ||
                (role && isAdmin(role)) ||
                (!AssertUtils.isNullOrUndefined(roleId) && role && isBaseUser(role))
              }
            />
            <div className="mt-4">
              <label className="font-bold text-xs">Description</label>
              <Form.Input
                name="description"
                placeholder=""
                className="mt-2"
                rules={{ required: true }}
                disabled={
                  isInitializingRole ||
                  (!AssertUtils.isNullOrUndefined(roleId) && role && isBaseUser(role))
                }
              />
            </div>
            <AccessControlTabs
              tab={tab}
              onTabChange={setTab}
              isBase={role?.id === 0}
              isCreate={isCreate}
              isUpdate={isUpdate}
            />
          </div>
          <div className="py-5 px-6 flex justify-between gap-2 border-t border-solid border-Gray-28">
            <div>
              {tab !== 'members' && (
                <>
                  <Button
                    variant="text"
                    className="underline"
                    onClick={checkAll}
                    disabled={isAllChecked}
                  >
                    Check All
                  </Button>
                  <Button
                    variant="text"
                    className="underline"
                    onClick={uncheckAll}
                    disabled={isAllUnChecked}
                  >
                    Uncheck All
                  </Button>
                </>
              )}
            </div>
            <div>
              <Button variant="ghost" colorScheme="gray" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="solid" type="submit" loading={isSubmitting}>
                Save
              </Button>
            </div>
          </div>
        </Form>
      </Drawer>
    );
  },
);
